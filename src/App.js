import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home/Home'
import About from './pages/about/About'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Overview from './pages/overview/Overview'
import { AuthProvider } from './components/firebase/auth';
import PrivateRoute from './components/firebase/PrivateRoute';

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<div>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <PrivateRoute exact path="/overview" component={Overview} />
				</div>
			</Router>
		</AuthProvider>
	);
};

export default App;
