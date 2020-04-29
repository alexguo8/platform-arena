import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { NetworkHandler } from '../../game-client/networking';
import { Renderer } from '../../game-client/render';
import { InputHandler } from '../../game-client/input';
import { downloadAssets } from '../../game-client/assets';
import { initState } from '../../game-client/state';

const GameCanvas = (props) => {
    const canvasRef = useRef(null);
    const renderer = useRef();
    const networkHandler = useRef();
    const inputHandler = useRef();

    useEffect(() => {
        if (props.room.room === "") {
            props.history.push("/");
            return;
        }
        networkHandler.current = new NetworkHandler();
        Promise.all([
            networkHandler.current.connectToServer(onGameOver),
            downloadAssets(),
            ])
            .then(() => {
                networkHandler.current.play(props.room.user, props.room.room);
                initState();
                if (canvasRef.current) {
                    renderer.current = new Renderer(canvasRef.current);
                    renderer.current.startRendering();
                }
            }).catch(console.error);
        inputHandler.current = new InputHandler(props.room.room, networkHandler.current, canvasRef.current);
        inputHandler.current.startCapturingInput();
        return () => {
            if (networkHandler.current instanceof NetworkHandler) {
                networkHandler.current.disconnect();
            }
            if (inputHandler.current instanceof InputHandler) {
                inputHandler.current.stopCapturingInput();
            }
            if (renderer.current instanceof Renderer) {
                renderer.current.stopRendering();
            }
        }
    }, []);

    function onGameOver() {
        inputHandler.current.stopCapturingInput();
        renderer.current.stopRendering();
    }

    return (
        <canvas ref={canvasRef}></canvas>
    );
};

GameCanvas.propTypes = {
    room: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    room: state.room
});

export default connect(
    mapStateToProps,
)(GameCanvas);