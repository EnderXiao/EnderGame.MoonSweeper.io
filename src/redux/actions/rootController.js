import {
    SET_GAME,
    RESTART_GAME,
    OPEN_CELL,
    ROTATE_CELL_STATE,
    UPDATE_ELAPSED_TIME,
    SHOW_SETTINGS,
    HIDE_SETTINGS,
} from "../constant";

export const setGame = (width, height, mineCount) => ({
    type: SET_GAME,
    width,
    height,
    mineCount,
});

export const restartGame = () => ({ type: RESTART_GAME });

export const openCell = (x, y, double) => ({ type: OPEN_CELL, x, y, double });

export const rotateCellState = (x, y) => ({
    type: ROTATE_CELL_STATE,
    x,
    y,
});

export const updateElapsedTime = () => ({ type: UPDATE_ELAPSED_TIME });
export const showSettings = () => ({ type: SHOW_SETTINGS });
export const hideSettings = () => ({ type: HIDE_SETTINGS });
