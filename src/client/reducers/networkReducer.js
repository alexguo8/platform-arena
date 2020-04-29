import  { GET_NETWORK_HANDLER } from "../actions/types";

const initialState = {
    handler: {}
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_NETWORK_HANDLER:
            return {
                handler: action.payload
            }
        default:
            return state;
    }
};
