import axios from "axios";

import { GET_ERRORS, GET_USER_ROOM } from "./types";

export const joinRoom = (user_room, history) => dispatch => {
    axios.post("http://localhost:5000/game/join", user_room)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
            dispatch({
                type: GET_USER_ROOM,
                payload: {
                    user: user_room.username,
                    room: user_room.room,
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
