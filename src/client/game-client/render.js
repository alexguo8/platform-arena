import { debounce } from 'throttle-debounce';
import { getAsset } from './assets';
import { getCurrentState } from './state';

const Type = require('../../shared/objectTypes');
const Constants = require('../../shared/constants');

const { PLAYER_WIDTH, PLAYER_HEIGHT, BULLET_WIDTH, BULLET_HEIGHT, 
    DRILL_WIDTH, DRILL_HEIGHT, EXPLOSION_WIDTH, EXPLOSION_HEIGHT, 
    BOMB_WIDTH, BOMB_HEIGHT, MINE_WIDTH, MINE_HEIGHT,
    POWERUP_WIDTH, POWERUP_HEIGHT, PLAYER_POWERUP_WIDTH, PLAYER_POWERUP_HEIGHT,
    WIDTH, HEIGHT } = Constants;

export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        setCanvasDimensions(canvas);
        window.addEventListener('resize', debounce(40, setCanvasDimensions));
        this.renderInterval = setInterval(() => render(this.canvas, this.context), 1000 / 60);
    }

    // Replaces main menu rendering with game rendering.
    startRendering() {
        clearInterval(this.renderInterval);
        this.renderInterval = setInterval(() => render(this.canvas, this.context), 1000 / 60);
        console.log("Starting rendering");
    }

    // Replaces game rendering with main menu rendering.
    stopRendering() {
        clearInterval(this.renderInterval);
        //this.renderInterval = setInterval(() => render(this.canvas, this.context), 1000 / 60);
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


function render(canvas, context) {
    const { me, others, platforms, weapons, powerups } = getCurrentState();
    if (!me) {
        return;
    }

    // Draw background
    renderBackground(context);

    // Draw all platforms
    platforms.forEach(p => {
        renderPlatform(context, p);
    })

    // Draw all bullets
    weapons.forEach(w => {
        switch(w.type) {
            case Type.BULLET:
                renderBullet(context, w);
                break;
            case Type.DRILL:
                renderDrill(context, w);
                break;
            case Type.BOMB:
                renderBomb(context, w);
                break;
            case Type.MINE:
                renderMine(context, w);
                break;
            case Type.TELEPORT_BULLET:
                renderTeleportBullet(context, w);
                break;
            case Type.FIRE_CLOUD:
                renderFireCloud(context, w);
                break;
            default:
                break;
        }
    })

    // Draw all powerups
    powerups.forEach(p => {
        renderPowerup(context, p);
    })

    // Draw all players
    if (Object.keys(me).length !== 0) {
        renderPlayer(context, me);
        renderHealthBar(context, me);
        renderPlayerPowerup(context, me);
        if (others.length === 0) {
            renderCrown(context, me);
        }
    }
    others.forEach(p => {
        renderPlayer(context, p);
        renderHealthBar(context, p);
        renderPlayerPowerup(context, p);
    });

    //Draw some weapons last
    weapons.forEach(w => {
        if (w.type === Type.EXPLOSION) {
            renderExplosion(context, w);
        } else if (w.type === Type.LASER) {
            renderLaser(context, w);
        }
    })
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

function renderPlayer(context, player) {
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
        image, player.x, player.y,
        PLAYER_WIDTH, PLAYER_HEIGHT,
    );
}

function renderHealthBar(context, player) {
    let colour = `rgb(${20 + (135 * (100 - player.health)) / 50}, 155, 20)`;
    if (player.health <= 50) {
        colour = `rgb(155, ${155 - (135 * (50 - player.health)) / 50}, 20)`;
    }
    if (player.abilityMeter === 100) {
        context.fillStyle = "white";
        context.fillRect(
            player.x - 2, 
            player.y - Constants.HEALTHBAR_HEIGHT - 7, 
            (Constants.HEALTHBAR_WIDTH * player.health) / 100 + 4, 
            Constants.HEALTHBAR_HEIGHT + 4,
        );
    }
    context.fillStyle = colour;
    context.fillRect(
        player.x, 
        player.y - Constants.HEALTHBAR_HEIGHT - 5, 
        (Constants.HEALTHBAR_WIDTH * player.health) / 100, 
        Constants.HEALTHBAR_HEIGHT,
    );
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText(player.username, player.x + (Constants.PLAYER_WIDTH / 2), 
        player.y - Constants.HEALTHBAR_HEIGHT - 10);
}

function renderPlayerPowerup(context, player) {
    switch(player.powerup) {
        case Type.DRILL_POWERUP:
            context.drawImage(getAsset('drillPowerup.png'), player.x + 5, player.y + PLAYER_HEIGHT + 5,
                PLAYER_POWERUP_WIDTH, PLAYER_POWERUP_HEIGHT,
            );
            break;
        case Type.MINE_POWERUP:
            context.drawImage(getAsset('minePowerup.png'), player.x + 5, player.y + PLAYER_HEIGHT + 5,
                PLAYER_POWERUP_WIDTH, PLAYER_POWERUP_HEIGHT,
            );
            break;
        case Type.BOMB_POWERUP:
            context.drawImage(getAsset('bombPowerup.png'), player.x + 5, player.y + PLAYER_HEIGHT + 5,
                PLAYER_POWERUP_WIDTH, PLAYER_POWERUP_HEIGHT,
            );
            break;
        case Type.REFLECT_POWERUP:
            context.drawImage(getAsset('reflectPowerup.png'), player.x + 5, player.y + PLAYER_HEIGHT + 5,
                PLAYER_POWERUP_WIDTH, PLAYER_POWERUP_HEIGHT,
            );
            break;
        default:
            break;
    }
    if (player.powerup !== Type.NO_POWERUP) {
        context.font = "12px Arial";
        context.fillStyle = 'black';
        context.fillText(player.specialAmmo, player.x + 20, player.y + PLAYER_HEIGHT + 15);
    }
}

function renderCrown(context, player) {
    context.fillStyle = "yellow";
    context.drawImage(
        getAsset("crown.png"), player.x, player.y - Constants.HEALTHBAR_HEIGHT - 40, 
        Constants.PLAYER_WIDTH, 18
    );
}

function renderBullet(context, bullet) {
    context.save();
    context.translate(bullet.x + (BULLET_WIDTH / 2), bullet.y + (BULLET_HEIGHT / 2));
    context.rotate(Math.PI / 2 - bullet.dir);
    context.drawImage(getAsset('greenBullet.png'), -BULLET_WIDTH / 2, -BULLET_HEIGHT / 2,
        BULLET_WIDTH, BULLET_HEIGHT,
    );
    context.restore();
}

function renderDrill(context, drill) {
    context.save();
    context.translate(drill.x + (DRILL_WIDTH / 2), drill.y + (DRILL_HEIGHT / 2));
    context.rotate(Math.PI / 2 - drill.dir);
    context.drawImage(getAsset('drillRight.png'), -DRILL_WIDTH / 2, -DRILL_HEIGHT / 2,
        DRILL_WIDTH, DRILL_HEIGHT,
    );
    context.restore();
}

function renderExplosion(context, explosion) {
    context.drawImage(getAsset('explosion.png'), explosion.x, explosion.y,
        EXPLOSION_WIDTH, EXPLOSION_HEIGHT,
    );
}

function renderBomb(context, bomb) {
    context.drawImage(getAsset('bomb.png'), bomb.x, bomb.y,
        BOMB_WIDTH, BOMB_HEIGHT,
    );
}

function renderMine(context, mine) {
    context.drawImage(getAsset('mine.png'), mine.x, mine.y,
        MINE_WIDTH, MINE_HEIGHT,
    );
}

function renderLaser(context, laser) {
    if (laser.cooldown !== 0) {
        context.globalAlpha = 0.5;
    }
    if (laser.dir > 0) {
        context.drawImage(getAsset("laser.png"), laser.x, laser.y, 
        laser.width, Constants.LASER_HEIGHT);
    } else {
        context.drawImage(getAsset("laser.png"), laser.x - laser.width, laser.y, 
        laser.width, Constants.LASER_HEIGHT);
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
    const platformGradient = context.createLinearGradient(
        platform.x,
        platform.y + platform.height,
        platform.x + platform.width,
        platform.y
    );
    platformGradient.addColorStop(0, "#1d5e8c");
    platformGradient.addColorStop(1, "#57a4da");
    context.fillStyle = platformGradient;
    context.fillRect(platform.x, platform.y, platform.width, platform.height);
}

function renderPowerup(context, powerup) {
    switch(powerup.type) {
        case Type.DRILL_POWERUP:
            context.drawImage(getAsset('drillPowerup.png'), powerup.x, powerup.y,
                POWERUP_WIDTH, POWERUP_HEIGHT,
            );
            break;
        case Type.MINE_POWERUP:
            context.drawImage(getAsset('minePowerup.png'), powerup.x, powerup.y,
                POWERUP_WIDTH, POWERUP_HEIGHT,
            );
            break;
        case Type.BOMB_POWERUP:
            context.drawImage(getAsset('bombPowerup.png'), powerup.x, powerup.y,
                POWERUP_WIDTH, POWERUP_HEIGHT,
            );
            break;
        case Type.REFLECT_POWERUP:
            context.drawImage(getAsset('reflectPowerup.png'), powerup.x, powerup.y,
                POWERUP_WIDTH, POWERUP_HEIGHT,
            );
            break;
        default:
            break;
    }
}
