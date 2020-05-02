import React, { useEffect } from 'react';
import { Router, Route, Switch } from "react-router-dom";
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
import Lobby from "./client/components/layouts/Lobby";
import GameCanvas from "./client/components/layouts/GameCanvas";
import Tutorial from "./client/components/layouts/Tutorial";
import RoomSelection from "./client/components/layouts/RoomSelection";
import PrivateRoute from "./client/components/private-route/PrivateRoute";

import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

const trackingId = "UA-165365144-1"; 
ReactGA.initialize(trackingId);

const history = createBrowserHistory();

history.listen(location => {
    ReactGA.set({ page: location.pathname }); 
    ReactGA.pageview(location.pathname); 
});


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
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, [])

  return (
    <Provider store={store}>
        <Router history={history}>
            <div className="App">
                <Switch>
                    <Route exact path="/lobby" component={Lobby} />
                    <Route exact path="/game" component={GameCanvas} />
                    <Route component={DefaultContainer} />
                </Switch>
            </div>
        </Router> 
    </Provider>  
  );
}
  
const DefaultContainer = () => (
    <div>
        <Navbar />
        <Route exact path="/" component={RoomSelection} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/how-to-play" component={Tutorial} />
        <Switch>
            <PrivateRoute exact path="/profile" component={UserProfile} />
        </Switch>
    </div>
)

export default App;
