import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { connectToServer, play} from '../../game-client/networking';
import { Renderer } from '../../game-client/render';
import { InputHandler } from '../../game-client/input';
import { downloadAssets } from '../../game-client/assets';
import { initState } from '../../game-client/state';

const GameCanvas = (props) => {
    const canvasRef = useRef(null);
    const renderer = useRef();
    //const networkHandler = useRef();
    const inputHandler = useRef();

    useEffect(() => {
        if (props.room.room === "") {
            props.history.push("/");
            return;
        }
        if (!props.auth.isAuthenticated) {
            props.history.push("/login");
            return;
        }
        //networkHandler.current = new NetworkHandler();
        Promise.all([
            connectToServer(onGameOver),
            downloadAssets(),
            ])
            .then(() => {
                play(props.room.user, props.room.room);
                initState();
                if (canvasRef.current) {
                    renderer.current = new Renderer(canvasRef.current);
                    renderer.current.startRendering();
                }
            }).catch(console.error);
        inputHandler.current = new InputHandler(props.room.room);
        inputHandler.current.startCapturingInput();
        return () => {
            // if (networkHandler.current instanceof NetworkHandler) {
            //     networkHandler.current.disconnect();
            // }
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
        <canvas ref={canvasRef} tabIndex={0}></canvas>
    );
};

GameCanvas.propTypes = {
    room: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    room: state.room
});

export default connect(
    mapStateToProps,
    {},
)(GameCanvas);