import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions"; 

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layouts/Navbar";
import Landing from "./components/layouts/Landing";
import Register from "./components/accounts/RegisterForm";
import Login from "./components/accounts/LoginForm";
import Dashboard from "./components/accounts/UserProfile";
import PrivateRoute from "./components/private-route/PrivateRoute";

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = "./login";
    }
}

function App() {
  return (
    <Provider store={store}>
        <Router>
            <div className="App">
                <Navbar />
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Switch>
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
            </div>
        </Router> 
    </Provider>  
  );
}

export default App;
