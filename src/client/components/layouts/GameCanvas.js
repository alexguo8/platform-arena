import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Renderer } from "../../game-client/render";
import { InputHandler } from "../../game-client/input";
import { downloadAssets } from "../../game-client/assets";
import { initState, resetLobbyStart } from "../../game-client/state";
import { resetRoom } from "../../actions/playerActions";

const GameCanvas = (props) => {
    const canvasRef = useRef(null);
    const renderer = useRef();
    const inputHandler = useRef();

    useEffect(() => {
        if (props.player.room === "") {
            props.history.push("/");
            return;
        }
        downloadAssets()
            .then(() => {
                initState();
                if (canvasRef.current) {
                    renderer.current = new Renderer(canvasRef.current);
                    renderer.current.startRendering();
                    inputHandler.current = new InputHandler(props.player.room, props.network.handler, renderer.current, canvasRef.current);
                    inputHandler.current.startCapturingInput();
                }
            }).catch(console.error);
        props.resetRoom();
        resetLobbyStart();
        return () => {
            if (inputHandler.current instanceof InputHandler) {
                inputHandler.current.stopCapturingInput();
            }
            if (renderer.current instanceof Renderer) {
                renderer.current.stopRendering();
            }
        }
    }, []);

    return (
        <canvas ref={canvasRef}></canvas>
    );
};

GameCanvas.propTypes = {
    resetRoom: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    network: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    player: state.player,
    network: state.network,
});

export default connect(
    mapStateToProps,
    { resetRoom }
)(GameCanvas);