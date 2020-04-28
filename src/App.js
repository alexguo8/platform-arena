import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import jwt_decode from "jwt-decode";
import setAuthToken from "./client/utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./client/actions/authActions"; 

import { Provider } from "react-redux";
import store from "./client/store";

import Navbar from "./client/components/layouts/Navbar";
import Register from "./client/components/accounts/RegisterForm";
import Login from "./client/components/accounts/LoginForm";
import UserProfile from "./client/components/accounts/UserProfile";
import GameCanvas from "./client/components/layouts/GameCanvas";
import RoomSelection from "./client/components/layouts/RoomSelection";
import PrivateRoute from "./client/components/private-route/PrivateRoute";

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
                <Route exact path="/" component={RoomSelection} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Switch>
                    <PrivateRoute exact path="/game" component={GameCanvas} />
                </Switch>
                <Switch>
                    <PrivateRoute exact path="/profile" component={UserProfile} />
                </Switch>
            </div>
        </Router> 
    </Provider>  
  );
}

export default App;
