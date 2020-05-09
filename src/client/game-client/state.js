// The "current" state will always be RENDER_DELAY ms behind server time.
// This makes gameplay smoother and lag less noticeable.
const RENDER_DELAY = 50;
const PLAYER_DELAY = 30;

const gameUpdates = [];
const playerUpdates = [];
let lobbyUpdate = {};
let lobbyStart = false;
let gameStart = 0;
let firstServerTimestamp = 0;

let lastPlayerUpdate = {};

export function initState() {
    gameStart = 0;
    firstServerTimestamp = 0;
}

export function resetGameState() {
    gameUpdates.length = 0;
    playerUpdates.length = 0;
    gameStart = 0;
    firstServerTimestamp = 0;
    lastPlayerUpdate = {};
}

export function processLobbyUpdate(update) {
    lobbyUpdate = update;
}

export function getLobbyState() {
    return lobbyUpdate;
}

export function processLobbyStart(update) {
    lobbyStart = update;
}

export function getLobbyStart() {
    return lobbyStart;
}

export function resetLobbyStart() {
    lobbyStart = false;
    lobbyUpdate = {};
}

export function processGameUpdate(update) {
    if (!firstServerTimestamp) {
        firstServerTimestamp = update.t;
        gameStart = Date.now();
    }
    gameUpdates.push(update);
    lastPlayerUpdate = update.me;
    playerUpdates.push({
        me: update.me,
        t: update.t,
    });

    // Keep only one game update before the current server time
    const base = getBaseUpdate();
    if (base > 0) {
        gameUpdates.splice(0, base);
    }

    // Keep only one game update before the current server time
    const playerBase = getPlayerBaseUpdate();
    if (playerBase > 0) {
        playerUpdates.splice(0, playerBase);
    }
}

function currentServerTime() {
    return firstServerTimestamp + (Date.now() - gameStart) - RENDER_DELAY;
}

function currentPlayerServerTime() {
    return firstServerTimestamp + (Date.now() - gameStart) - PLAYER_DELAY;
}

// Returns the index of the base update, the first game update before
// current server time, or -1 if N/A.
function getBaseUpdate() {
    const serverTime = currentServerTime();
    for (let i = gameUpdates.length - 1; i >= 0; i--) {
        if (gameUpdates[i].t <= serverTime) {
            return i;
        }
    }
    return -1;
}

// Returns the index of the base update, the first player update before
// current server time, or -1 if N/A.
function getPlayerBaseUpdate() {
    const serverTime = currentPlayerServerTime();
    for (let i = playerUpdates.length - 1; i >= 0; i--) {
        if (playerUpdates[i].t <= serverTime) {
            return i;
        }
    }
    return -1;
}

// Returns { me, others, bullets }
export function getCurrentState() {
    if (!firstServerTimestamp) {
        return {};
    }

    const base = getBaseUpdate();
    const serverTime = currentServerTime();

    // If base is the most recent update we have, use its state.
    // Otherwise, interpolate between its state and the state of (base + 1).
    if (base < 0 || base === gameUpdates.length - 1) {
        return gameUpdates[gameUpdates.length - 1];
    } else {
        const baseUpdate = gameUpdates[base];
        const next = gameUpdates[base + 1];
        const ratio = (serverTime - baseUpdate.t) / (next.t - baseUpdate.t);
        return {
            //me: interpolateObject(baseUpdate.me, next.me, ratio),
            others: interpolateObjectArray(baseUpdate.others, next.others, ratio),
            platforms: baseUpdate.platforms,
            weapons: interpolateObjectArray(baseUpdate.weapons, next.weapons, ratio),
            powerups: baseUpdate.powerups,
        };
    }
}

export function getCurrentPlayerState() {
    return lastPlayerUpdate;
    if (!firstServerTimestamp) {
        return {};
    }

    const base = getPlayerBaseUpdate();
    const serverTime = currentPlayerServerTime();

    // If base is the most recent update we have, use its state.
    // Otherwise, interpolate between its state and the state of (base + 1).
    if (base < 0 || base === playerUpdates.length - 1) {
        return playerUpdates[playerUpdates.length - 1];
    } else {
        const baseUpdate = playerUpdates[base];
        const next = playerUpdates[base + 1];
        const ratio = (serverTime - baseUpdate.t) / (next.t - baseUpdate.t);
        return {
            me: interpolateObject(baseUpdate.me, next.me, ratio),
        };
    }
}

function interpolateObject(object1, object2, ratio) {
    if (!object2) {
        return object1;
    }

    const interpolated = {};
    Object.keys(object1).forEach(key => {
        if (key === 'direction') {
            interpolated[key] = interpolateDirection(object1[key], object2[key], ratio);
        } else if (key === "specialAmmo" || key === "username" || key === "shielded" || key === "character") {
            interpolated[key] = object1[key];
        } else {
            interpolated[key] = object1[key] + (object2[key] - object1[key]) * ratio;
        }
    });
    
    return interpolated;
}

function interpolateObjectArray(objects1, objects2, ratio) {
    return objects1.map(o => interpolateObject(o, objects2.find(o2 => o.id === o2.id), ratio));
}

// Determines the best way to rotate (cw or ccw) when interpolating a direction.
// For example, when rotating from -3 radians to +3 radians, we should really rotate from
// -3 radians to +3 - 2pi radians.
function interpolateDirection(d1, d2, ratio) {
    const absD = Math.abs(d2 - d1);
    if (absD >= Math.PI) {
        // The angle between the directions is large - we should rotate the other way
        if (d1 > d2) {
            return d1 + (d2 + 2 * Math.PI - d1) * ratio;
        } else {
            return d1 - (d2 - 2 * Math.PI - d1) * ratio;
        }
    } else {
        // Normal interp
        return d1 + (d2 - d1) * ratio;
    }
}
