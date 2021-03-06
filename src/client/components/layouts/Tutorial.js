import React from "react";
import { Link } from "react-router-dom";

const Tutorial = () => {
    return (
        <div style={{ height: "75vh" }} className="container">
            <div style={{ marginTop: "4rem" }} className="row">
                <div className="col s12 center-align">
                    <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left">
                            keyboard_backspace
                        </i>
                        Back
                    </Link>
                    <div className="col s12">
                        <h4>
                            <span style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>How To Play</span>
                        </h4>
                        <br />
                    </div>

                    <div className="col s12">
                        <div className="card-panel">
                            <p>
                                Platform Arena is a platformer fighting game. Eliminate all your enemies to win! <br />
                                These are the controls: <br />
                                W - Jump <br />
                                A - Left <br />
                                D - Right <br />
                                S - Shoot directly in front or use powerup <br />
                                Left Mouse Click - Aim and shoot or use powerup <br />
                                Q - Ability (when your healthbar is glowing, you can use your ability!)<br />
                            </p>
                        </div>
                    </div>
                    <div className="col s12">
                        <div className="card-panel">
                            <p>
                                There are 4 playable characters, each with unique bullets and abilities.
                            </p>
                            <p>
                                <img src={process.env.PUBLIC_URL + "/assets/pandaRight.png"} alt="Panda" />   
                                &ensp;- Panda shoots a fast bullet with a high fire rate.
                                Their special ability is to launch a bamboo storm.
                            </p>
                            <p>
                                <img src={process.env.PUBLIC_URL + "/assets/sealRight.png"} alt="Seal" /> 
                                &ensp;- Seal shoots a very slow water bullet with a slow fire rate. 
                                Their special ability is a laser.
                            </p>
                            <p>
                                <img src={process.env.PUBLIC_URL + "/assets/dinoRight.png"} alt="Dino" /> 
                                &ensp;- Dino shoots a slow explosive bullet with a normal fire rate.
                                Their special ability is a fire cloud. 
                            </p>
                            <p>
                                <img src={process.env.PUBLIC_URL + "/assets/eagleRight.png"} alt="Eagle" /> 
                                &ensp;- Eagle shoots two fast weaker bullets with a slow fire rate.
                                Their special ability is a teleporting bullet.
                            </p>
                        </div>
                    </div>
                    <div className="col s12">
                        <div className="card-panel">
                            <p>
                                Collect powerups to gain special weapons. 
                            </p>
                            <p>
                                <img src={process.env.PUBLIC_URL + "/assets/drillPowerup.png"} alt="Drill" />   
                                &ensp;- Drill breaks through platforms and explodes.  
                            </p>
                            <p>
                                <img src={process.env.PUBLIC_URL + "/assets/minePowerup.png"} alt="Mine" /> 
                                &ensp;- Mine stays on the ground and explodes when stepped on.
                            </p>
                            <p>
                                <img src={process.env.PUBLIC_URL + "/assets/bombPowerup.png"} alt="Bomb" /> 
                                &ensp;- Bomb bounces around like a projectile and explodes. 
                            </p>
                            <p>
                                <img src={process.env.PUBLIC_URL + "/assets/reflectPowerup.png"} alt="Reflect" /> 
                                &ensp;- Reflecting bullets bounce around before disappearing. 
                            </p>
                            <p>
                                <img src={process.env.PUBLIC_URL + "/assets/shield.png"} alt="Shield" /> 
                                &ensp;- Shield blocks one attack.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tutorial;