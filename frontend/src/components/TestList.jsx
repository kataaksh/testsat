import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TestList = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/test/all")
      .then(res => res.json())
      .then(data => setTests(data));
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Available Tests</h2>
      <ul>
        {tests.map(test => (
          <li key={test._id} className="mb-3 flex justify-between items-center">
            <span className="font-medium">{test.testname}</span>
            <button
              className="px-4 py-1 bg-blue-600 text-white rounded"
              onClick={() => navigate(`/test-viewer/${test._id}`)}
            >
              Take Test
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestList;