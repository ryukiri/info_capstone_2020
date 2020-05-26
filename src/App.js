import { HashRouter, Route, BrowserRouter as Router } from "react-router-dom";

import About from "./pages/about/About";
import { AuthProvider } from "./components/firebase/auth";
import Category from "./pages/quiz/Category";
import DataDiary from "./pages/dataDiary/DataDiary";
import Friends from "./pages/friends/Friends";
import Home from "./pages/home/Home";
import Interests from "./pages/interests/Interests";
import InterestsSketch from "./pages/sketch/interestsSketch";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import LeaderboardSketch from "./pages/sketch/leaderboardsketch";
import Login from "./pages/login/Login";
import MusicComplete from "./pages/quiz/MusicComplete";
import MusicQuiz from "./pages/quiz/Music";
import Overview from "./pages/overview/Overview";
import Personalize from "./pages/signup/Personalize";
import PrivateRoute from "./components/firebase/PrivateRoute";
import Quiz from "./pages/quiz/Quiz";
import QuizComplete from "./pages/quiz/QuizComplete";
import React from "react";
import SignUpSketch from "./pages/sketch/signupSketch";
import Signup from "./pages/signup/Signup";
import Summary from "./pages/summary/Summary";

const App = () => {
  return (
    <AuthProvider>
      <Router basename="/">
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/overview" component={Overview} />
          <PrivateRoute exact path="/dataDiary" component={DataDiary} />
          <PrivateRoute exact path="/summary" component={Summary} />
          <PrivateRoute exact path="/quizCategory" component={Category} />
          <PrivateRoute exact path="/quiz" component={Quiz} />
          <PrivateRoute exact path="/quizComplete" component={QuizComplete} />
          <PrivateRoute exact path="/personalize" component={Personalize} />
          <PrivateRoute exact path="/leaderboard" component={Leaderboard} />
          <PrivateRoute exact path="/musicQuiz" component={MusicQuiz} />
          <PrivateRoute exact path="/musicComplete" component={MusicComplete} />
          <PrivateRoute exact path="/friends" component={Friends} />
          <Route
            exact
            path="/leaderboardsketch"
            component={LeaderboardSketch}
          />
          <Route exact path="/signUpSketch" component={SignUpSketch} />
          <Route exact path="/interestsSketch" component={InterestsSketch} />
          <PrivateRoute exact path="/interests" component={Interests} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
