import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Interview from "./components/Interview";
import Home from "./components/Home";
import HRQuestions from "./components/HRQuestions";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/hrquestions" element={<HRQuestions />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
