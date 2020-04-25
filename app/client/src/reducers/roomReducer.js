import  { GET_USER_ROOM } from "../actions/types";

const initialState = {
    user: "",
    room: "",
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_ROOM:
            return {
                user: action.payload.user,
                room: action.payload.room,
            };
        default:
            return state;
    }
};
