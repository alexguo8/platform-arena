import { debounce } from 'throttle-debounce';
import { getAsset } from './assets';
import { getCurrentState } from './state';

const Type = require('../../../shared/objectTypes');
const Constants = require('../../../shared/constants');

const { PLAYER_WIDTH, PLAYER_HEIGHT, BULLET_WIDTH, BULLET_HEIGHT, 
    DRILL_WIDTH, DRILL_HEIGHT, EXPLOSION_WIDTH, EXPLOSION_HEIGHT, 
    BOMB_WIDTH, BOMB_HEIGHT, MINE_WIDTH, MINE_HEIGHT,
    POWERUP_WIDTH, POWERUP_HEIGHT, PLAYER_POWERUP_WIDTH, PLAYER_POWERUP_HEIGHT,
    WIDTH, HEIGHT } = Constants;

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
setCanvasDimensions();

function setCanvasDimensions() {
  // On small screens (e.g. phones), we want to "zoom out" so players can still see at least
  // 800 in-game units of width.
  const scaleRatio = Math.max(1, 800 / window.innerWidth);
  canvas.width = scaleRatio * window.innerWidth;
  canvas.height = scaleRatio * window.innerHeight;
}

window.addEventListener('resize', debounce(40, setCanvasDimensions));

function render() {
    const { me, others, platforms, weapons, powerups } = getCurrentState();
    if (!me) {
        return;
    }

    // Draw background
    renderBackground();

    // Draw boundaries
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.strokeRect(0, 0, WIDTH, HEIGHT);

    // Draw all platforms
    platforms.forEach(p => {
        renderPlatform(p);
    })

    // Draw all bullets
    weapons.forEach(w => {
        switch(w.type) {
            case Type.BULLET:
                renderBullet(w);
                break;
            case Type.DRILL:
                renderDrill(w);
                break;
            case Type.BOMB:
                renderBomb(w);
                break;
            case Type.MINE:
                renderMine(w);
                break;
            default:
                break;
        }
    })

    // Draw all powerups
    powerups.forEach(p => {
        renderPowerup(p);
    })

    // Draw all players
    renderPlayer(me);
    renderHealthBar(me);
    renderPlayerPowerup(me);
    others.forEach(p => {
        renderPlayer(p);
        renderHealthBar(p);
        renderPlayerPowerup(p);
    });

    //Draw explosions last
    weapons.forEach(w => {
        if (w.type === Type.EXPLOSION) {
            renderExplosion(w);
        }
    })
}

function renderBackground() {
    const backgroundX = canvas.width / 2;
    const backgroundY = canvas.height / 2;
    const backgroundGradient = context.createRadialGradient(
        backgroundX,
        backgroundY,
        WIDTH / 10,
        backgroundX,
        backgroundY,
        HEIGHT / 2,
    );
    backgroundGradient.addColorStop(0, "#c0c0ff");
    backgroundGradient.addColorStop(1, "#b0b0f5");
    context.fillStyle = backgroundGradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function renderPlayer(player) {
    if (player.faceRight) {
        context.drawImage(
            getAsset('pandaRight.png'), player.x, player.y,
            PLAYER_WIDTH, PLAYER_HEIGHT,
        );
    } else {
        context.drawImage(
            getAsset('pandaLeft.png'), player.x, player.y,
            PLAYER_WIDTH, PLAYER_HEIGHT,
        );
    }
}

function renderHealthBar(player) {
    let colour = `rgb(${20 + (135 * (100 - player.health)) / 50}, 155, 20)`;
    if (player.health <= 50) {
        colour = `rgb(155, ${155 - (135 * (50 - player.health)) / 50}, 20)`;
    }
    context.fillStyle = colour;
    context.fillRect(
        player.x, 
        player.y - Constants.HEALTHBAR_HEIGHT - 5, 
        (Constants.HEALTHBAR_WIDTH * player.health) / 100, 
        Constants.HEALTHBAR_HEIGHT,
    );
}

function renderPlayerPowerup(player) {
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

function renderBullet(bullet) {
    context.drawImage(
        getAsset('greenBullet.png'), bullet.x, bullet.y,
        BULLET_WIDTH, BULLET_HEIGHT,
    );
}

function renderDrill(drill) {
    context.drawImage(getAsset('drillRight.png'), drill.x, drill.y,
        DRILL_WIDTH, DRILL_HEIGHT,
    );
}

function renderExplosion(explosion) {
    context.drawImage(getAsset('explosion.png'), explosion.x, explosion.y,
        EXPLOSION_WIDTH, EXPLOSION_HEIGHT,
    );
}

function renderBomb(bomb) {
    context.drawImage(getAsset('bomb.png'), bomb.x, bomb.y,
        BOMB_WIDTH, BOMB_HEIGHT,
    );
}

function renderMine(mine) {
    context.drawImage(getAsset('mine.png'), mine.x, mine.y,
        MINE_WIDTH, MINE_HEIGHT,
    );
}

function renderPlatform(platform) {
    const platformGradient = context.createLinearGradient(
        platform.x,
        platform.y + platform.height,
        platform.x + platform.width,
        platform.y
    );
    platformGradient.addColorStop(0, "#1d5e8c");
    platformGradient.addColorStop(1, "57a4da");
    context.fillStyle = platformGradient;
    context.fillRect(platform.x, platform.y, platform.width, platform.height);
}

function renderPowerup(powerup) {
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

function renderMainMenu() {
    const t = Date.now() / 7500;
    const x = WIDTH / 2 + 800 * Math.cos(t);
    const y = HEIGHT / 2 + 800 * Math.sin(t);
    renderBackground(x, y);
}

let renderInterval = setInterval(renderMainMenu, 1000 / 60);

// Replaces main menu rendering with game rendering.
export function startRendering() {
    clearInterval(renderInterval);
    renderInterval = setInterval(render, 1000 / 60);
}

// Replaces game rendering with main menu rendering.
export function stopRendering() {
    clearInterval(renderInterval);
    renderInterval = setInterval(renderMainMenu, 1000 / 60);
}
