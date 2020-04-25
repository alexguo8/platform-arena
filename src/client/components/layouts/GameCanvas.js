import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { connectToServer, play } from '../../game-client/networking';
import { Renderer } from '../../game-client/render';
import { startCapturingInput, stopCapturingInput } from '../../game-client/input';
import { downloadAssets } from '../../game-client/assets';
import { initState } from '../../game-client/state';

const GameCanvas = (props) => {
    const canvasRef = useRef(null);
    const [renderer, setRenderer] = useState({});

    useEffect(() => {
        if (props.room.room === "") {
            props.history.push("/join");
        }
        Promise.all([
            connectToServer(onGameOver),
            downloadAssets(),
            ])
            .then(() => {
                play(props.room.user, props.room.room);
                initState();
                if (canvasRef.current) {
                    setRenderer(new Renderer(canvasRef.current));
                    startCapturingInput(props.room.room);
                    if (renderer) {
                        renderer.startRendering();
                    }
                }
            }).catch(console.error);
    }, [props.room]);

    function onGameOver() {
        stopCapturingInput();
        renderer.stopRendering();
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
  {},
)(GameCanvas);