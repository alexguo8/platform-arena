import  { GET_USER_ROOM, RESET_ROOM } from "../actions/types";

const initialState = {
    user: "",
    room: "",
    character: "",
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_ROOM:
            return {
                user: action.payload.user,
                room: action.payload.room,
            };
        case RESET_ROOM:
            return {
                ...state,
                room: ""
            };
        default:
            return state;
    }
};
