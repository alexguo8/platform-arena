import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const GameCanvas = (props) => {
    return (
        <canvas id="game-canvas"></canvas>
    );
};

GameCanvas.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { }
)(GameCanvas);