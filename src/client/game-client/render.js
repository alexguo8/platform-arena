import { debounce } from "throttle-debounce";
import { getAsset } from "./assets";
import { getCurrentState } from "./state";
import Handler from "./handler";
import Player from "./player";
import KeyInput from "./keyInput";


const Type = require("../../shared/objectTypes");
const Constants = require("../../shared/constants");

const { PLAYER_WIDTH, PLAYER_HEIGHT, BULLET_WIDTH, BULLET_HEIGHT, 
    DRILL_WIDTH, DRILL_HEIGHT, EXPLOSION_WIDTH, EXPLOSION_HEIGHT, 
    BOMB_WIDTH, BOMB_HEIGHT, MINE_WIDTH, MINE_HEIGHT,
    POWERUP_WIDTH, POWERUP_HEIGHT, PLAYER_POWERUP_WIDTH, PLAYER_POWERUP_HEIGHT,
    } = Constants;

export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.render = this.render.bind(this);
        this.request = null;
        setCanvasDimensions(canvas);
        window.addEventListener("resize", debounce(40, setCanvasDimensions));
        //this.renderInterval = setInterval(() => render(this.context), 1000 / 60);
        this.handler = new Handler();
        this.handler.initializePlatforms();
        this.playerAdded = false;
        this.keyInput = null;
        this.inputs = [];
        this.lastUpdateTime = Date.now();
    }

    render() {
        this.request = window.requestAnimationFrame(this.render);
        const now = Date.now();
        const dt = (now - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = now;

        const { me, others, platforms, weapons, powerups } = getCurrentState();
        if (!me) {
            return;
        }
        if (!this.playerAdded) {
            const player = new Player(me.id, me.x, me.y, 
                Constants.PLAYER_WIDTH, Constants.PLAYER_HEIGHT, this.handler);
            this.handler.addPlayer(player);
            this.keyInput = new KeyInput(player);
            this.playerAdded = true;
        }

        if (Object.keys(me).length !== 0) {
            this.handler.player.x = me.x;
            this.handler.player.y = me.y;
            this.handler.player.velX = me.velX;
            this.handler.player.velY = me.velY;
        }

        //Client Side Prediction
        this.inputs = this.inputs.filter(i => i.sequence > me.sequence);
        this.inputs.forEach(i => {
            if (i.type === 0) {
                this.keyInput.handleKeyPress(i.key);
            } else {
                this.keyInput.handleKeyUp(i.key);
            }
        })
        this.handler.update(dt);
        //console.log([this.handler.player.x - me.x, this.handler.player.y - me.y])
    
        // Draw background
        renderBackground(this.context);
    
        platforms.forEach(p => {
            for (let i = 0; i < this.handler.platforms.length; i++) {
                const pl = this.handler.platforms[i];
                if (pl.respawnTimer === 0 &&
                    p.x === pl.x && p.y === pl.y) {
                    pl.disappear();
                    break;
                }
            }
        })

        // Draw all platforms
        this.handler.platforms.forEach(p => {
            renderPlatform(this.context, p);
        })
    
        // Draw all bullets
        weapons.forEach(w => {
            switch(w.type) {
                case Type.BULLET:
                    renderBullet(this.context, w);
                    break;
                case Type.DRILL:
                    renderDrill(this.context, w);
                    break;
                case Type.BOMB:
                    renderBomb(this.context, w);
                    break;
                case Type.MINE:
                    renderMine(this.context, w);
                    break;
                case Type.TELEPORT_BULLET:
                    renderTeleportBullet(this.context, w);
                    break;
                case Type.FIRE_CLOUD:
                    renderFireCloud(this.context, w);
                    break;
                default:
                    break;
            }
        })
    
        // Draw all powerups
        powerups.forEach(p => {
            renderPowerup(this.context, p);
        })
    
        // Draw all players
        if (Object.keys(me).length !== 0) {
            renderPlayer(this.context, me, this.handler.player);
            renderHealthBar(this.context, me, this.handler.player);
            renderPlayerPowerup(this.context, me, this.handler.player);
            if (others.length === 0) {
                renderCrown(this.context, me, this.handler.player);
            }
        } else {
            if (others.length === 1) {
                renderCrown(this.context, others[0]);
            }
        }
        others.forEach(p => {
            renderPlayer(this.context, p, p);
            renderHealthBar(this.context, p, p);
            renderPlayerPowerup(this.context, p, p);
        });
    
        //Draw some weapons last
        weapons.forEach(w => {
            if (w.type === Type.EXPLOSION) {
                renderExplosion(this.context, w);
            } else if (w.type === Type.LASER) {
                renderLaser(this.context, w);
            } else if (w.type === Type.BAMBOO) {
                renderBamboo(this.context, w);
            }
        })
    }

    // Replaces main menu rendering with game rendering.
    startRendering() {
        //clearInterval(this.renderInterval);
        //this.renderInterval = setInterval(() => render(this.context), 1000 / 60);
        //requestAnimationFrame(this.renderAnimation);
        this.request = window.requestAnimationFrame(this.render);
        console.log("Starting rendering");
    }

    // Replaces game rendering with main menu rendering.
    stopRendering() {
        //clearInterval(this.renderInterval);
        //this.renderInterval = setInterval(() => render(this.canvas, this.context), 1000 / 60);
        window.cancelAnimationFrame(this.request);
        this.request = null;
        console.log("Stopping rendering")
        //renderInterval = setInterval(renderMainMenu, 1000 / 60);
    }
}

function setCanvasDimensions(canvas) {
  // On small screens (e.g. phones), we want to "zoom out" so players can still see at least
  // 800 in-game units of width.
//   const scaleRatio = Math.max(1, 800 / window.innerWidth);
//   canvas.width = scaleRatio * window.innerWidth;
//   canvas.height = scaleRatio * window.innerHeight;
    canvas.width = Constants.WIDTH;
    canvas.height = Constants.HEIGHT;
}

function renderBackground(context) {
    // const backgroundX = canvas.width / 2;
    // const backgroundY = canvas.height / 2;
    // const backgroundGradient = context.createRadialGradient(
    //     backgroundX,
    //     backgroundY,
    //     WIDTH / 10,
    //     backgroundX,
    //     backgroundY,
    //     HEIGHT / 2,
    // );
    // backgroundGradient.addColorStop(0, "#c0c0ff");
    // backgroundGradient.addColorStop(1, "#b0b0f5");
    context.fillStyle = "#b0b0f5";
    context.fillRect(0, 0, Constants.WIDTH, Constants.HEIGHT);
}

function renderPlayer(context, player, pos) {
    let image = getAsset("pandaRight.png");
    if (player.character === Type.PANDA) {
        if (player.faceRight) {
            image = getAsset("pandaRight.png")
        } else {
            image = getAsset("pandaLeft.png")
        }
    } else if (player.character === Type.SEAL) {
        if (player.faceRight) {
            image = getAsset("sealRight.png")
        } else {
            image = getAsset("sealLeft.png")
        }
    } else if (player.character === Type.DINO) {
        if (player.faceRight) {
            image = getAsset("dinoRight.png")
        } else {
            image = getAsset("dinoLeft.png")
        }
    } else if (player.character === Type.EAGLE) {
        if (player.faceRight) {
            image = getAsset("eagleRight.png")
        } else {
            image = getAsset("eagleLeft.png")
        }
    } 
    context.drawImage(
        image, pos.x, pos.y,
        PLAYER_WIDTH, PLAYER_HEIGHT,
    );
    if (player.shielded) {
        context.globalAlpha = 0.5;
        context.drawImage(getAsset("shield.png"), pos.x - 10, pos.y - 10,
            PLAYER_WIDTH + 20, PLAYER_HEIGHT + 20,
        );
        context.globalAlpha = 1;
    }
}

function renderHealthBar(context, player, pos) {
    let colour = `rgb(${20 + (135 * (100 - player.health)) / 50}, 155, 20)`;
    if (player.health <= 50) {
        colour = `rgb(155, ${155 - (135 * (50 - player.health)) / 50}, 20)`;
    }
    if (player.abilityMeter >= 100) {
        context.fillStyle = "white";
        context.fillRect(
            pos.x - 2, 
            pos.y - Constants.HEALTHBAR_HEIGHT - 7, 
            (Constants.HEALTHBAR_WIDTH * player.health) / 100 + 4, 
            Constants.HEALTHBAR_HEIGHT + 4,
        );
    }
    context.fillStyle = colour;
    context.fillRect(
        pos.x, 
        pos.y - Constants.HEALTHBAR_HEIGHT - 5, 
        (Constants.HEALTHBAR_WIDTH * player.health) / 100, 
        Constants.HEALTHBAR_HEIGHT,
    );
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText(player.username, pos.x + (Constants.PLAYER_WIDTH / 2), 
        pos.y - Constants.HEALTHBAR_HEIGHT - 10);
}

function renderPlayerPowerup(context, player, pos) {
    switch(player.powerup) {
        case Type.DRILL_POWERUP:
            context.drawImage(getAsset("drillPowerup.png"), pos.x + 5, pos.y + PLAYER_HEIGHT + 5,
                PLAYER_POWERUP_WIDTH, PLAYER_POWERUP_HEIGHT,
            );
            break;
        case Type.MINE_POWERUP:
            context.drawImage(getAsset("minePowerup.png"), pos.x + 5, pos.y + PLAYER_HEIGHT + 5,
                PLAYER_POWERUP_WIDTH, PLAYER_POWERUP_HEIGHT,
            );
            break;
        case Type.BOMB_POWERUP:
            context.drawImage(getAsset("bombPowerup.png"), pos.x + 5, pos.y + PLAYER_HEIGHT + 5,
                PLAYER_POWERUP_WIDTH, PLAYER_POWERUP_HEIGHT,
            );
            break;
        case Type.REFLECT_POWERUP:
            context.drawImage(getAsset("reflectPowerup.png"), pos.x + 5, pos.y + PLAYER_HEIGHT + 5,
                PLAYER_POWERUP_WIDTH, PLAYER_POWERUP_HEIGHT,
            );
            break;
        default:
            break;
    }
    if (player.powerup !== Type.NO_POWERUP) {
        context.font = "12px Arial";
        context.fillStyle = "black";
        context.fillText(player.specialAmmo, pos.x + 20, pos.y + PLAYER_HEIGHT + 15);
    }
}

function renderCrown(context, player, pos) {
    context.drawImage(
        getAsset("crown.png"), pos.x, pos.y - Constants.HEALTHBAR_HEIGHT - 40, 
        Constants.PLAYER_WIDTH, 18
    );
}

function renderBullet(context, bullet) {
    if (bullet.character === Type.SEAL) {
        context.drawImage(getAsset("blueBullet.png"), bullet.x, bullet.y,
            BULLET_WIDTH, BULLET_HEIGHT,
        );
        return;
    }
    let image = getAsset("greenBullet.png");
    if (bullet.character === Type.PANDA) {
        image = getAsset("greenBullet.png");
    } else if (bullet.character === Type.DINO) {
        image = getAsset("yellowBullet.png");
    } else if (bullet.character === Type.EAGLE) {
        image = getAsset("redBullet.png");
    }
    context.save();
    context.translate(bullet.x + (BULLET_WIDTH / 2), bullet.y + (BULLET_HEIGHT / 2));
    context.rotate(Math.PI / 2 - bullet.dir);
    context.drawImage(image, -BULLET_WIDTH / 2, -BULLET_HEIGHT / 2,
        BULLET_WIDTH, BULLET_HEIGHT,
    );
    context.restore();
}

function renderDrill(context, drill) {
    context.save();
    context.translate(drill.x + (DRILL_WIDTH / 2), drill.y + (DRILL_HEIGHT / 2));
    context.rotate(Math.PI / 2 - drill.dir);
    context.drawImage(getAsset("drillRight.png"), -DRILL_WIDTH / 2, -DRILL_HEIGHT / 2,
        DRILL_WIDTH, DRILL_HEIGHT,
    );
    context.restore();
}

function renderExplosion(context, explosion) {
    context.drawImage(getAsset("explosion.png"), explosion.x, explosion.y,
        EXPLOSION_WIDTH, EXPLOSION_HEIGHT,
    );
}

function renderBomb(context, bomb) {
    context.drawImage(getAsset("bomb.png"), bomb.x, bomb.y,
        BOMB_WIDTH, BOMB_HEIGHT,
    );
}

function renderMine(context, mine) {
    context.drawImage(getAsset("mine.png"), mine.x, mine.y,
        MINE_WIDTH, MINE_HEIGHT,
    );
}

function renderBamboo(context, bamboo) {
    if (Math.abs(Math.sin(bamboo.dir)) > 0.5) {
        context.drawImage(getAsset("bamboo.png"), bamboo.x, bamboo.y,
            Constants.BAMBOO_WIDTH, Constants.BAMBOO_HEIGHT
        );
    } else {
        context.save();
        context.translate(bamboo.x + (Constants.BAMBOO_HEIGHT / 2), bamboo.y + (Constants.BAMBOO_WIDTH / 2));
        context.rotate(Math.PI / 2);
        context.drawImage(getAsset("bamboo.png"), -Constants.BAMBOO_WIDTH / 2, -Constants.BAMBOO_HEIGHT / 2,
            Constants.BAMBOO_WIDTH, Constants.BAMBOO_HEIGHT
        );
        context.restore();
    }
}

function renderLaser(context, laser) {
    if (laser.cooldown !== 0) {
        context.globalAlpha = 0.5;
    }
    if (laser.dir > 0) {
        context.drawImage(getAsset("laser.png"), laser.x, laser.y, 
            laser.width, Constants.LASER_HEIGHT
        );
    } else {
        context.drawImage(getAsset("laser.png"), laser.x - laser.width, laser.y, 
            laser.width, Constants.LASER_HEIGHT
        );
    }
    context.globalAlpha = 1;
}

function renderFireCloud(context, cloud) {
    if (cloud.cooldown <= 5) {
        context.globalAlpha = 0.75;
    } else {
        context.globalAlpha = 0.3;
    }
    context.drawImage(getAsset("fireCloud.png"), cloud.x, cloud.y,
        cloud.width, cloud.height,
    );
    context.globalAlpha = 1;
}

function renderTeleportBullet(context, tBullet) {
    let image = getAsset("teleportBulletRight.png");
    if (tBullet.dir > Math.PI) {
        image = getAsset("teleportBulletLeft.png");
    }
    context.drawImage(image, tBullet.x, tBullet.y,
        Constants.TELEPORT_BULLET_WIDTH, Constants.TELEPORT_BULLET_HEIGHT,
    );
}

function renderPlatform(context, platform) {
    context.drawImage(getAsset("platform.png"), platform.x, platform.y,
        platform.width, platform.height);
}

function renderPowerup(context, powerup) {
    switch(powerup.type) {
        case Type.DRILL_POWERUP:
            context.drawImage(getAsset("drillPowerup.png"), powerup.x, powerup.y,
                POWERUP_WIDTH, POWERUP_HEIGHT,
            );
            break;
        case Type.MINE_POWERUP:
            context.drawImage(getAsset("minePowerup.png"), powerup.x, powerup.y,
                POWERUP_WIDTH, POWERUP_HEIGHT,
            );
            break;
        case Type.BOMB_POWERUP:
            context.drawImage(getAsset("bombPowerup.png"), powerup.x, powerup.y,
                POWERUP_WIDTH, POWERUP_HEIGHT,
            );
            break;
        case Type.REFLECT_POWERUP:
            context.drawImage(getAsset("reflectPowerup.png"), powerup.x, powerup.y,
                POWERUP_WIDTH, POWERUP_HEIGHT,
            );
            break;
        case Type.SHIELD_POWERUP:
            context.drawImage(getAsset("shield.png"), powerup.x, powerup.y,
                POWERUP_WIDTH, POWERUP_HEIGHT,
            );
            break;
        default:
            break;
    }
}
