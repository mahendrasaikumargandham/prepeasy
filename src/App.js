import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import HRQuestions from "./components/HRQuestions";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import { AuthContextProvider } from "./authContext";
import SavedAnswers from "./components/SavedAnswers";
import Account from "./components/Account";
import FileUpload from "./summary/FileUpload";
import SummaryPage from "./summary/SummaryPage";
import QuizPage from "./summary/QuizPage";
import ScorePage from "./summary/ScorePage";
import ResumeUpload from "./Interview/ResumeUpload";
import InterDetails from "./Interview/InterDetails";
import ConductInterview from "./Interview/ConductInterview";
import FeedBack from "./Interview/Feedback";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interview" element={<ResumeUpload/>} />
          <Route path='/get_details' element={<InterDetails/>}/>
          <Route path='/conduct_interview' element={<ConductInterview/>}/>
          <Route path = '/feedback' element={<FeedBack/>}/>
          <Route path="/hrquestions" element={<HRQuestions />} />
          {/* <Route path="/process" element={<Summary/>} /> */}
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path='/savedanswers' element={<SavedAnswers/>}/>
          <Route path='/account' element={<Account/>}/>
          <Route path='/upload' element={<FileUpload/>}/>
          <Route path="/summary" element={<SummaryPage/>}/>
          <Route path='/quiz' element={<QuizPage/>}/>
          <Route path='/score/:score' element={<ScorePage/>}/>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
