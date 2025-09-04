import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TestList = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTestsWithStatus();
  }, []);

  const fetchTestsWithStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/v1/test/with-status", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTests(data);
      } else {
        console.error("Failed to fetch tests");
      }
    } catch (error) {
      console.error("Error fetching tests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTakeTest = (testId, isCompleted) => {
    if (isCompleted) {
      alert("You have already completed this test!");
      return;
    }
    navigate(`/test-submission/${testId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Available Tests</h2>
      
      {tests.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No tests available at the moment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tests.map(test => (
            <div 
              key={test._id} 
              className={`p-4 border rounded-lg ${
                test.isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-lg">{test.testname}</span>
                  {test.isCompleted && (
                    <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">
                      ✅ Completed
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  {test.isCompleted ? (
                    <button
                      className="px-4 py-2 bg-gray-500 text-white rounded cursor-not-allowed"
                      disabled
                    >
                      Already Taken
                    </button>
                  ) : (
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={() => handleTakeTest(test._id, test.isCompleted)}
                    >
                      Take Test
                    </button>
                  )}
                </div>
              </div>
              
              {test.isCompleted && (
                <div className="mt-2 text-sm text-gray-600">
                  You have already completed this test. Check your submission history for results.
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestList;