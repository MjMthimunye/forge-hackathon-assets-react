import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import {withRouter} from 'react-router'
import AuthPage from './Auth';
import Home from './Home';
import './App.css';
import 'font-awesome/css/font-awesome.css';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="container">			
					
					<Switch>

						<Route path="/viewer" component={Home} />					
						<Route path="/" component={AuthPage}/>  
							
					</Switch>
				
				</div>
			</Router>
		);
	}
}

export default withRouter(App);
