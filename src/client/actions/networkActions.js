import { GET_NETWORK_HANDLER } from "./types";

export const setNetworkHandler = networkHandler => dispatch => {
    dispatch({
        type: GET_NETWORK_HANDLER,
        payload: networkHandler
    })
};

export const resetNetworkHandler = () => dispatch => {
    dispatch({
        type: GET_NETWORK_HANDLER,
        payload: {}
    });
}
