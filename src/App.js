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

const App = () => {
	return (
		<AuthProvider>
			<HashRouter basename ="/">
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
					<PrivateRoute exact path="/personalize" component={Personalize} />
					<PrivateRoute exact path="/leaderboard" component={Leaderboard} />
				</div>
			</HashRouter>
		</AuthProvider>
	);
};

export default App;
