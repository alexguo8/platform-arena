import { getAsset } from "./assets";
import { getCurrentState } from "./state";

const Type = require("../../shared/objectTypes");
const Constants = require("../../shared/constants");

const { PLAYER_WIDTH, PLAYER_HEIGHT, BULLET_WIDTH, BULLET_HEIGHT, 
    DRILL_WIDTH, DRILL_HEIGHT, EXPLOSION_WIDTH, EXPLOSION_HEIGHT, 
    BOMB_WIDTH, BOMB_HEIGHT, MINE_WIDTH, MINE_HEIGHT,
    POWERUP_WIDTH, POWERUP_HEIGHT, PLAYER_POWERUP_WIDTH, PLAYER_POWERUP_HEIGHT,
    } = Constants;


export function setCanvasDimensions(canvas) {
    canvas.width = Constants.WIDTH;
    canvas.height = Constants.HEIGHT;
}

export function render(context, me, client) {
    const { others, platforms, weapons, powerups } = getCurrentState();
    if (!me) {
        return;
    }

    // Draw background
    renderBackground(context);

    //Draw all platforms
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
        renderPlayer(context, me, client);
        renderHealthBar(context, me, client);
        renderPlayerPowerup(context, me, client);
        if (others.length === 0) {
            renderCrown(context, me, client);
        }
    } else {
        if (others.length === 1) {
            renderCrown(context, others[0], others[0]);
        }
    }
    others.forEach(p => {
        renderPlayer(context, p, p);
        renderHealthBar(context, p, p);
        renderPlayerPowerup(context, p, p);
    });

    //Draw some weapons last
    weapons.forEach(w => {
        if (w.type === Type.EXPLOSION) {
            renderExplosion(context, w);
        } else if (w.type === Type.LASER) {
            renderLaser(context, w);
        } else if (w.type === Type.BAMBOO) {
            renderBamboo(context, w);
        }
    })
}

function renderBackground(context) {
    context.fillStyle = "#b0b0f5";
    context.fillRect(0, 0, Constants.WIDTH, Constants.HEIGHT);
}

function renderPlayer(context, player, pos) {
    let image = getAsset("pandaRight.png");
    if (player.character === Type.PANDA) {
        if (pos.faceRight) {
            image = getAsset("pandaRight.png")
        } else {
            image = getAsset("pandaLeft.png")
        }
    } else if (player.character === Type.SEAL) {
        if (pos.faceRight) {
            image = getAsset("sealRight.png")
        } else {
            image = getAsset("sealLeft.png")
        }
    } else if (player.character === Type.DINO) {
        if (pos.faceRight) {
            image = getAsset("dinoRight.png")
        } else {
            image = getAsset("dinoLeft.png")
        }
    } else if (player.character === Type.EAGLE) {
        if (pos.faceRight) {
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
    // context.strokeStyle = "black"
    // context.strokeRect(player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT)
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
