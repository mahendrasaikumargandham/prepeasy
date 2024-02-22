import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Interview from "./components/Interview";
import Home from "./components/Home";
import HRQuestions from "./components/HRQuestions";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import Summary from "./components/Summary";
import { AuthContextProvider } from "./authContext";
import SavedAnswers from "./components/SavedAnswers";
import Account from "./components/Account";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/hrquestions" element={<HRQuestions />} />
          <Route path="/summary" element={<Summary/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path='/savedanswers' element={<SavedAnswers/>}/>
          <Route path='/account' element={<Account/>}/>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
