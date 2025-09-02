import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTest from "./components/AddTest";
import TestViewer from "./components/TestViewer";
import TestList from "./components/TestList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/add-test" element={<AddTest />} />
        <Route path="/test-viewer/:id" element={<TestViewer />} />
        <Route path="/test-list" element={<TestList />} />
        <Route path="/" element={
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">SATest Platform</h1>
            <a href="/admin/add-test" className="mb-2 px-4 py-2 bg-blue-600 text-white rounded">Admin: Add Test</a>
            <a href="/test-list" className="px-4 py-2 bg-green-600 text-white rounded">View Tests</a>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;