// Game Settings
export const MIN_WIDTH = 9;
export const MAX_WIDTH = 20;
export const MIN_HEIGHT = 9;
export const MAX_HEIGHT = 20;
export const MIN_MINES = 10;

// Design Settings
export const CELL_SIZE = 42;
export const CELL_MARGIN = 2;

// Game States
export const GAME = {
    READY: "ready",
    RUN: "run",
    WIN: "win",
    LOSE: "lose",
};

// Cell States
export const CODES = {
    CELL_STATUS: {
        OPENED: 1,
        CLOSED: 0,
        FLAG: 2,
        QUESTION: 3,
        MINE_FLAG: 4,
        MINE_QUESTION: 5,
    },
    CELL_VALUE: {
        MINE: 9,
        NOTHING: 0,
    },
};

export const SET_GAME = "Controller/SET_GAME";
export const RESTART_GAME = "Controller/RESTART_GAME";
export const OPEN_CELL = "Controller/OPEN_CELL";
export const ROTATE_CELL_STATE = "Controller/ROTATE_CELL_STATE";
export const UPDATE_ELAPSED_TIME = "Controller/UPDATE_ELAPSED_TIME";
export const SHOW_SETTINGS = "Controller/SHOW_SETTINGS";
export const HIDE_SETTINGS = "Controller/HIDE_SETTINGS";
