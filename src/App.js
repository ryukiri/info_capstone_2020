import React from 'react';
import { BrowserRouter as Router, Route, HashRouter } from 'react-router-dom';
import Home from './pages/home/Home'
import About from './pages/about/About'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Overview from './pages/overview/Overview'
import DataDiary from './pages/dataDiary/DataDiary'
import Summary from './pages/summary/Summary'
import Category from './pages/quiz/Category'
import Quiz from './pages/quiz/Quiz'
import Leaderboard from './pages/leaderboard/Leaderboard'
import Personalize from './pages/signup/Personalize'
import { AuthProvider } from './components/firebase/auth';
import PrivateRoute from './components/firebase/PrivateRoute';
import QuizComplete from './pages/quiz/QuizComplete';
import MusicQuiz from './pages/quiz/Music';
import MusicComplete from './pages/quiz/MusicComplete';
import LeaderboardSketch from './pages/sketch/leaderboardsketch';
import SignUpSketch from './pages/sketch/signupSketch';
import InterestsSketch from './pages/sketch/interestsSketch';



const App = () => {
	return (
		<AuthProvider>
			<Router basename ="/">
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
					<Route exact path="/leaderboardsketch" component={LeaderboardSketch} />
					<Route exact path="/signUpSketch" component={SignUpSketch} />
					<Route exact path="/interestsSketch" component={InterestsSketch} />

					
				</div>
			</Router>
		</AuthProvider>
	);
};

export default App;
