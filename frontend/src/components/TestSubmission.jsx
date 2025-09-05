import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TestSubmission = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes default
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [startTime] = useState(Date.now());
  const [showDesmos, setShowDesmos] = useState(false);
  const [showScientific, setShowScientific] = useState(false);
  const desmosRef = useRef(null);
  const scientificRef = useRef(null);
  const desmosCalculator = useRef(null);
  const scientificCalculator = useRef(null);

  useEffect(() => {
    checkTestAccess();
    loadDesmosAPI();
  }, [id]);

  const loadDesmosAPI = () => {
    // Check if Desmos API is already loaded
    if (window.Desmos) {
      return;
    }

    const script = document.createElement('script');
    const apiKey = import.meta.env.VITE_DESMOS_API_KEY || 'dcb31709b452b1cf9dc26972add0fda6'; // Default demo key
    script.src = `https://www.desmos.com/api/v1.11/calculator.js?apiKey=${apiKey}`;
    script.async = true;
    document.head.appendChild(script);
  };

  const initializeDesmosCalculator = () => {
    if (desmosRef.current && window.Desmos && !desmosCalculator.current) {
      desmosCalculator.current = window.Desmos.GraphingCalculator(desmosRef.current, {
        expressions: true,
        settingsMenu: true,
        zoomButtons: true,
        expressionsTopbar: false,
        pointsOfInterest: false,
        trace: false,
        border: false,
        lockViewport: false,
        expressionsCollapsed: true,
      });
    }
  };

  const initializeScientificCalculator = () => {
    if (scientificRef.current && window.Desmos && !scientificCalculator.current) {
      scientificCalculator.current = window.Desmos.ScientificCalculator(scientificRef.current, {
        expressions: false,
        settingsMenu: false,
        border: false
      });
    }
  };

  useEffect(() => {
    if (showDesmos) {
      const timer = setTimeout(() => {
        initializeDesmosCalculator();
      }, 100);
      return () => clearTimeout(timer);
    } else if (desmosCalculator.current) {
      desmosCalculator.current.destroy();
      desmosCalculator.current = null;
    }
  }, [showDesmos]);

  useEffect(() => {
    if (showScientific) {
      const timer = setTimeout(() => {
        initializeScientificCalculator();
      }, 100);
      return () => clearTimeout(timer);
    } else if (scientificCalculator.current) {
      scientificCalculator.current.destroy();
      scientificCalculator.current = null;
    }
  }, [showScientific]);

  const checkTestAccess = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/v1/test/${id}/access`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      if (response.ok && data.canTake) {
        fetchTest();
      } else {
        alert(data.message || "You cannot take this test");
        navigate("/test-list");
      }
    } catch (error) {
      console.error("Error checking test access:", error);
      alert("Error checking test access");
      navigate("/test-list");
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleSubmit(); // Auto-submit when time runs out
    }
  }, [timeLeft]);

  const fetchTest = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/v1/test/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTest(data);
        setAnswers(new Array(data.questions.length).fill(""));
      } else {
        alert("Failed to load test");
        navigate("/test-list");
      }
    } catch (error) {
      console.error("Error fetching test:", error);
      alert("Error loading test");
      navigate("/test-list");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex, answer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (submitting) return;
    
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/v1/submission/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          testId: id,
          answers: answers,
          timeTaken: timeTaken,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        navigate(`/test-results/${result.submissionId}`);
      } else {
        alert(result.message || "Failed to submit test");
      }
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("Error submitting test");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgress = () => {
    const answered = answers.filter(answer => answer !== "").length;
    return Math.round((answered / test.questions.length) * 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold text-red-600">Test not found</h2>
      </div>
    );
  }

  const handleSaveAndExit = () => {
    handleSubmit();
    navigate("/test-list");
  };

  return (
    <div className="max-w-6xl mx-auto mt-6 p-6">
      {/* Navbar with Calculator Buttons */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              setShowDesmos(!showDesmos);
              setShowScientific(false);
            }}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              showDesmos
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Desmos Calculator
          </button>
          <button
            onClick={() => {
              setShowScientific(!showScientific);
              setShowDesmos(false);
            }}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              showScientific
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🧮 Scientific Calculator
          </button>
          <button className="px-6 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200" onClick={handleSaveAndExit}>Leave</button>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">{test.testname}</h1>
          <div className={`text-lg font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-black'}`}>
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>
        
        {/* Progress Bar */}
        {/* <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress: {getProgress()}%</span>
            <span>{answers.filter(a => a !== "").length}/{test.questions.length} answered</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-black h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
        </div> */}

        {/* Question Navigation */}
        {/* <div className="flex flex-wrap gap-2 mb-4">
          {test.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-10 h-10 rounded-full text-sm font-medium ${
                currentQuestion === index
                  ? "bg-black text-white"
                  : answers[index] !== ""
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div> */}
      </div>

      {/* Question and Calculator Layout */}
      <div className="flex gap-6 mb-6">
        {/* Current Question */}
        <div className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 ${
          showDesmos || showScientific ? "w-1/2" : "w-full"
        }`}>
          <div className="mb-4">
            <span className="text-sm text-gray-500">Question {currentQuestion + 1} of {test.questions.length}</span>
            <h2 className="text-xl font-semibold text-gray-800 mt-2">
              {test.questions[currentQuestion].question}
            </h2>
          </div>

          <div className="space-y-3">
            {test.questions[currentQuestion].options.map((option, optionIndex) => (
              <label
                key={optionIndex}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  answers[currentQuestion] === option
                    ? "border-black bg-black-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={option}
                  checked={answers[currentQuestion] === option}
                  onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
                  className="mr-3"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Calculator Area */}
        {(showDesmos || showScientific) && (
          <div className="w-1/2 bg-white rounded-lg shadow-md p-4">
            {showDesmos && (
              <div className="h-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Desmos Calculator</h3>
                  <button
                    onClick={() => setShowDesmos(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ×
                  </button>
                </div>
                <div
                  ref={desmosRef}
                  className="w-full h-96 border border-gray-200 rounded-lg"
                  style={{ minHeight: '384px' }}
                ></div>
              </div>
            )}
            
            {showScientific && (
              <div className="h-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Scientific Calculator</h3>
                  <button
                    onClick={() => setShowScientific(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ×
                  </button>
                </div>
                <div
                  ref={scientificRef}
                  className="w-full h-96 border border-gray-200 rounded-lg"
                  style={{ minHeight: '384px' }}
                ></div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-2 bg-gray-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
          >
            ← Previous
          </button>

          <div className="flex space-x-4">
            {currentQuestion < test.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="px-6 py-2 bg-black text-white rounded hover:bg-black"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-8 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Test"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Warning for unanswered questions */}
      {/* {answers.some(answer => answer === "") && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">
            ⚠️ You have {answers.filter(a => a === "").length} unanswered questions. 
            You can submit anyway, but unanswered questions will be marked as incorrect.
          </p>
        </div>
      )} */}
    </div>
  );
};

export default TestSubmission;
