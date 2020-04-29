import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import playerReducer from "./playerReducer";
import networkReducer from "./networkReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    player: playerReducer,
    network: networkReducer,
});