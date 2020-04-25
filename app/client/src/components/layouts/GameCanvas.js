import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { connectToServer, play } from '../../game-client/networking';
import { startRendering, stopRendering } from '../../game-client/render';
import { startCapturingInput, stopCapturingInput } from '../../game-client/input';
import { downloadAssets } from '../../game-client/assets';
import { initState } from '../../game-client/state';

const GameCanvas = (props) => {

    useEffect(() => {
        Promise.all([
            connectToServer(onGameOver),
            downloadAssets(),
          ]).then(() => {
              play(props.room.user, props.room.room);
              initState();
              startCapturingInput(props.room.room);
              startRendering();
          }).catch(console.error);
    }, []);

    function onGameOver() {
        stopCapturingInput();
        stopRendering();
    }

    return (
        <canvas id="game-canvas"></canvas>
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