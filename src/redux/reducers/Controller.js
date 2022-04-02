import {
    CODES,
    MIN_HEIGHT,
    MIN_WIDTH,
    MIN_MINES,
    GAME,
    SET_GAME,
    RESTART_GAME,
    OPEN_CELL,
    ROTATE_CELL_STATE,
    UPDATE_ELAPSED_TIME,
    SHOW_SETTINGS,
    HIDE_SETTINGS,
} from "../constant";
import {
    expendOpenCell,
    getFlagChange,
    getNextCellCode,
    initialMap,
} from "../../GameController";
import produce from "immer";

const initialState = {
    width: MIN_WIDTH,
    height: MIN_HEIGHT,
    boardMap: initialMap(MIN_WIDTH, MIN_HEIGHT, MIN_MINES),
    mineCount: MIN_MINES,
    gameState: GAME.READY,
    flagCount: 0,
    openedCellCount: 0,
    enableSettings: false,
    enableTimer: false,
    elapsedTime: 0,
};

export default function (preState = initialState, action) {
    // console.log(preState, action);

    switch (action.type) {
        case SHOW_SETTINGS:
            return produce(preState, (draft) => {
                draft.enableSettings = true;
            });
        case HIDE_SETTINGS:
            return produce(preState, (draft) => {
                draft.enableSettings = false;
            });
        case SET_GAME:
            return produce(preState, (draft) => {
                draft.width = action.width;
                draft.height = action.height;
                draft.mineCount = action.mineCount;
            });
        case RESTART_GAME:
            return produce(preState, (draft) => {
                draft.boardMap = initialMap(
                    preState.width,
                    preState.height,
                    preState.mineCount
                );
                draft.gameState = GAME.READY;
                draft.openedCellCount = 0;
                draft.flagCount = 0;
                draft.enableTimer = false;
                draft.elapsedTime = 0;
            });
        case UPDATE_ELAPSED_TIME:
            return produce(preState, (draft) => {
                draft.elapsedTime++;
            });
        case OPEN_CELL:
            return produce(preState, (draft) => {
                const cell_now = preState.boardMap[action.x][action.y];
                draft.gameState = GAME.RUN;

                //失败判断
                if (!preState.enableTimer) {
                    draft.enableTimer = true;
                }
                if (cell_now.value === CODES.CELL_VALUE.MINE) {
                    draft.boardMap[action.x][action.y].cover =
                        CODES.CELL_STATUS.OPENED;
                    draft.gameState = GAME.LOSE;
                    draft.enableTimer = false;
                } else if (
                    cell_now.cover === CODES.CELL_STATUS.CLOSED ||
                    cell_now.cover === CODES.CELL_STATUS.OPENED
                ) {
                    const expendResult = expendOpenCell(
                        draft.boardMap,
                        action.x,
                        action.y,
                        action.double
                    );
                    draft.boardMap = expendResult.boardMap;
                    draft.openedCellCount += expendResult.openedCellCount;
                    console.log(draft.openedCellCount);
                    //获胜判断
                    if (
                        preState.width * preState.height -
                            preState.mineCount ===
                        draft.openedCellCount
                    ) {
                        draft.gameState = GAME.WIN;
                        draft.elapsedTime = false;
                    }
                }
            });
        case ROTATE_CELL_STATE:
            return produce(preState, (draft) => {
                const cell_now = preState.boardMap[action.x][action.y];

                if (cell_now.cover !== CODES.CELL_STATUS.OPENED) {
                    draft.boardMap[action.x][action.y].cover = getNextCellCode(
                        cell_now.cover
                    );
                    draft.flagCount += getFlagChange(cell_now.cover);
                }
            });

        default: {
            return initialState;
        }
    }
}
