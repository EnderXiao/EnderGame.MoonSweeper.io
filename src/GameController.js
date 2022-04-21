import { CODES } from "./redux/constant";

function GenerateUniqueRandomArray(num) {
    let ary = [];
    for (let i = 0; i < num; i++) {
        ary[i] = i;
    }
    ary.sort(function () {
        return 0.5 - Math.random();
    });
    return ary;
}
function getMinePosition(width, height, mineCount) {
    // 将0 ~ 总格子个数的数组进行随机排序，取前mineCount个以实现快速的随机产生地雷
    let randomArray = GenerateUniqueRandomArray(width * height);
    return randomArray.slice(0, mineCount);
}

function updateEight(map, rowNum, colNum, width, height) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i != 0 || j != 0) {
                if (rowNum + i >= 0 && rowNum + i < width)
                    if (colNum + j >= 0 && colNum + j < height)
                        if (map[rowNum + i][colNum + j].value != 9)
                            map[rowNum + i][colNum + j].value += 1;
            }
        }
    }
    return map;
}
export const initialMap = (width, height, minCount) => {
    let boardMap = [];
    for (let i = 0; i < width; i++) {
        let rowArray = [];
        for (let j = 0; j < height; j++) {
            rowArray.push({ cover: 0, value: 0 });
        }
        boardMap.push(rowArray);
    }
    let minePosition = getMinePosition(width, height, minCount);
    console.log(minePosition);
    for (let i = 0; i < minePosition.length; i++) {
        let rowNum = Math.floor(minePosition[i] / height);
        let colNum = minePosition[i] - rowNum * height;
        boardMap[rowNum][colNum] = { cover: 0, value: 9 };
        boardMap = updateEight(boardMap, rowNum, colNum, width, height);
    }
    console.log(boardMap);
    return boardMap;
};

export const getNextCellCode = (cover) => {
    switch (cover) {
        case CODES.CELL_STATUS.CLOSED:
            return CODES.CELL_STATUS.FLAG;
        case CODES.CELL_STATUS.FLAG:
            return CODES.CELL_STATUS.QUESTION;
        case CODES.CELL_STATUS.QUESTION:
            return CODES.CELL_STATUS.CLOSED;
        default:
            return cover;
    }
};

export const getFlagChange = (cover) => {
    switch (cover) {
        case CODES.CELL_STATUS.CLOSED:
            return 1;
        case CODES.CELL_STATUS.FLAG:
            return -1;
        default:
            return 0;
    }
};

function expendJudge(boardMap, x, y) {
    let flagCount = 0;
    let wrongCount = 0;
    let wrongList = [];
    let move = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];
    for (let i = 0; i < move.length; i++) {
        const step = move[i];
        let x_new = x + step[0];
        let y_new = y + step[1];
        if (x_new >= 0 && x_new < boardMap.length) {
            if (y_new >= 0 && y_new < boardMap[0].length) {
                let cell_now = boardMap[x_new][y_new];
                if (
                    cell_now.cover === CODES.CELL_STATUS.FLAG &&
                    cell_now.value === CODES.CELL_VALUE.MINE
                )
                    flagCount++;
                if (
                    cell_now.cover === CODES.CELL_STATUS.FLAG &&
                    cell_now.value !== CODES.CELL_VALUE.MINE
                ) {
                    wrongCount++;
                    wrongList.push({ x: x_new, y: y_new });
                }
            }
        }
    }
    return { judgement: flagCount === boardMap[x][y].value, wrongList };
}

export const expendOpenCell = (boardMap, x, y, double) => {
    let openedCellCount = 0;
    let move = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];
    let start_x = x;
    let start_y = y;
    const dfs = (x, y) => {
        boardMap[x][y].cover = CODES.CELL_STATUS.OPENED;
        if (double) {
            if (x != start_x || y != start_y) openedCellCount++;
        } else {
            openedCellCount++;
        }
        console.log(double);
        if (boardMap[x][y].value !== CODES.CELL_VALUE.NOTHING) {
            if (!double) {
                return;
            } else {
                if (x != start_x || y != start_y) {
                    return;
                }
            }
        }
        for (let i = 0; i < move.length; i++) {
            const step = move[i];
            let x_new = x + step[0];
            let y_new = y + step[1];
            if (x_new >= 0 && x_new < boardMap.length) {
                if (y_new >= 0 && y_new < boardMap[0].length) {
                    if (
                        boardMap[x_new][y_new].cover ===
                        CODES.CELL_STATUS.CLOSED
                    )
                        dfs(x_new, y_new);
                }
            }
        }
    };
    let wrongList = [];
    if (double) {
        let judgeRes = expendJudge(boardMap, x, y);
        wrongList = judgeRes.wrongList;

        if (judgeRes.judgement) dfs(x, y);
        for (let i = 0; i < judgeRes.wrongList.length; i++) {
            const element = judgeRes.wrongList[i];
            boardMap[element.x][element.y].cover = CODES.CELL_STATUS.OPENED;
            boardMap[element.x][element.y].value = CODES.CELL_VALUE.BAD_GUESS;
        }
    } else dfs(x, y);
    return { boardMap, openedCellCount, wrongList };
};
