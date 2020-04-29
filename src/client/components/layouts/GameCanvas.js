import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Renderer } from '../../game-client/render';
import { InputHandler } from '../../game-client/input';
import { downloadAssets } from '../../game-client/assets';
import { initState } from '../../game-client/state';

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
                }
            }).catch(console.error);
        inputHandler.current = new InputHandler(props.player.room, props.network.handler, canvasRef.current);
        inputHandler.current.startCapturingInput();
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
    player: PropTypes.object.isRequired,
    network: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    player: state.player,
    network: state.network,
});

export default connect(
    mapStateToProps,
)(GameCanvas);