module.exports = Object.freeze({
    PLAYER_WIDTH: 32,
    PLAYER_HEIGHT: 32,
    PLAYER_MAX_HP: 100,
    PLAYER_SPEED: 300,
    PLAYER_JUMP: 1000,
    PLAYER_GRAVITY: 3600,
    PLAYER_FIRE_COOLDOWN: 0.5,

    BULLET_WIDTH: 24,
    BULLET_HEIGHT: 8,
    BULLET_SPEED: 600,
    BULLET_DAMAGE: 10,

    REFLECT_BULLET_BOUNCES: 5,
    REFLECT_BULLET_COOLDOWN: 10,

    DRILL_WIDTH: 32,
    DRILL_HEIGHT: 24,
    DRILL_SPEED: 400,

    BOMB_WIDTH: 32,
    BOMB_HEIGHT: 32,
    BOMB_SPEED: 600,
    BOMB_GRAVITY: 10,
    BOMB_COOLDOWN: 10,
    BOMB_LIFETIME: 100,

    MINE_WIDTH: 32,
    MINE_HEIGHT: 8,
    MINE_SPEED: 100,
    MINE_COOLDOWN: 50,

    EXPLOSION_WIDTH: 64,
    EXPLOSION_HEIGHT: 64,
    EXPLOSION_DAMAGE: 10,

    BAMBOO_STORM_COOLDOWN: 25,
    BAMBOO_STORM_TIMES: 16,
    BAMBOO_WIDTH: 256,
    BAMBOO_HEIGHT: 64,
    BAMBOO_SPEED: 600,
    BAMBOO_COOLDOWN: 40,
    BAMBOO_DAMAGE: 20,

    LASER_HEIGHT: 32,
    LASER_COOLDOWN: 20,
    LASER_LIFETIME: 60,
    LASER_DAMAGE: 30,

    FIRE_CLOUD_WIDTH: 32,
    FIRE_CLOUD_HEIGHT: 32,
    FIRE_CLOUD_MAX_WIDTH: 700,
    FIRE_CLOUD_MAX_HEIGHT: 700,
    FIRE_CLOUD_COOLDOWN: 50,
    FIRE_CLOUD_LIFETIME: 500,
    FIRE_CLOUD_SPEED: 450,
    FIRE_CLOUD_DAMAGE: 15,

    TELEPORT_BULLET_WIDTH: 32,
    TELEPORT_BULLET_HEIGHT: 10,
    TELEPORT_BULLET_SPEED: 1200,
    TELEPORT_BULLET_DAMAGE: 15,

    PLATFORM_WIDTH: 32,
    PLATFORM_HEIGHT: 32,
    PLATFORM_RESPAWN: 500,

    POWERUP_WIDTH: 20,
    POWERUP_HEIGHT: 20,
    PLAYER_POWERUP_WIDTH: 10,
    PLAYER_POWERUP_HEIGHT: 10,


    HEALTHBAR_WIDTH: 32,
    HEALTHBAR_HEIGHT: 8,

    SCORE_BULLET_HIT: 20,
    SCORE_PER_SECOND: 1,

    WIDTH: 1024, 
    HEIGHT: 1024/12 * 9 - 32,
    MAP_SIZE: 3000,
    MSG_TYPES: {
        JOIN_LOBBY: "join_lobby",
        START_GAME: "start_game",
        LOBBY_UPDATE: "lobby_update",
        GAME_UPDATE: "update",
        KEYPRESS: "keypress",
        KEYUP: "keyup",
        KEYDOWN: "keydown",
        CLICK: "click",
        GAME_OVER: "dead",
    },
});
