import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser, refreshErrors } from "../../actions/authActions";
import classnames from "classnames";

const LoginForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { refreshErrors } = props;

    useEffect(() => {
        refreshErrors();
    }, [refreshErrors]);

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            props.history.push("/join");
        }

        if (props.errors) {
            setErrors(props.errors);
        }
    }, [props.errors, props.auth.isAuthenticated, props.history]);

    const onSubmit = e => {
        e.preventDefault();

        const user = {
            email: email,
            password: password,
        }
        props.loginUser(user);
    }

    return (
        <div className="container">
            <div style={{ marginTop: "4rem" }} className="row">
                <div className="col s8 offset-s2">
                    <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Back to
                        home
                    </Link>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                            Login below
                        </h4>
                        <p className="grey-text text-darken-1">
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                    </div>
                    <form noValidate onSubmit={onSubmit}>
                        <div className="input-field col s12">
                            <input
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                error={errors.email}
                                id="email"
                                type="email"
                                className={classnames("", { invalid: errors.email || errors.emailNotFound })}
                            />
                            <label htmlFor="email">Email</label>
                            <span className="red-text">{errors.email}{errors.emailNotFound}</span>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                error={errors.password}
                                id="password"
                                type="password"
                                className={classnames("", { invalid: errors.password || errors.passwordIncorrect })}
                            />
                            <label htmlFor="password">Password</label>
                            <span className="red-text">{errors.password}{errors.passwordIncorrect}</span>
                        </div>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

LoginForm.propTypes = {
    loginUser: PropTypes.func.isRequired,
    refreshErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser, refreshErrors }
)(LoginForm);