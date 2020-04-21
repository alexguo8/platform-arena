import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const UserProfile = (props) => {
    const onLogoutClick = e => {
        e.preventDefault();
        props.logoutUser();
    };

    return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
            <div className="col s12 center-align">
                <h4>
                <b>Hey there,</b> 
                <p className="flow-text grey-text text-darken-1">
                    Your Profile
                </p>
                </h4>
                <button
                style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                }}
                onClick={onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                Logout
                </button>
            </div>
            </div>
        </div>
    );
};

UserProfile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(UserProfile);