import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import roomReducer from "./roomReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    room: roomReducer,
});