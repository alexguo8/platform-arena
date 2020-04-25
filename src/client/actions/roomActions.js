import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, GET_USER_ROOM } from "./types";

export const joinRoom = (user, history) => dispatch => {
    axios.post("http://localhost:5000/game/join", user)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
            dispatch({
                type: GET_USER_ROOM,
                payload: {
                    user: user.username,
                    room: user.room,
                }
            })
            history.push("/game");
        })
        .catch(err => {
            console.log(err.response.data);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

export const refreshErrors = () => dispatch => {
    dispatch({
        type: GET_ERRORS,
        payload: {}
    })
}


export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const loginUser = user => dispatch => {
    axios.post("/users/login", user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};