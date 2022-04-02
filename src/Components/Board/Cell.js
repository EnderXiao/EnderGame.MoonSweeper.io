import React, { Component, useCallback } from "react";
import { connect } from "react-redux";
import { openCell, rotateCellState } from "../../redux/actions/rootController";
import { CODES, GAME } from "../../redux/constant";

class Cell extends Component {
    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            cell: props.boardMap[props.x][props.y],
            renderValue: "",
            className: "",
        };
    }
    componentDidMount() {
        this.setMine();
        this.count = 0;
    }
    componentDidUpdate(prevProps) {
        if (prevProps.cell !== this.props.cell) this.setMine();
        if (prevProps.gameState !== this.props.gameState) {
            this.setMine();
        }
    }
    handleLeftClick = (e) => {
        const { cell, x, y, gameState } = this.props;
        this.count += 1;
        let double = false;
        setTimeout(() => {
            if (this.count === 1 && cell.cover === CODES.CELL_STATUS.CLOSED) {
                console.log("单击");
                if (gameState === GAME.READY || gameState === GAME.RUN) {
                    this.props.openCell(x, y, double);
                }
                this.setMine();
            } else if (
                this.count === 2 &&
                cell.cover === CODES.CELL_STATUS.OPENED &&
                cell.value !== CODES.CELL_VALUE.NOTHING
            ) {
                console.log("双击");
                double = true;
                if (gameState === GAME.READY || gameState === GAME.RUN) {
                    this.props.openCell(x, y, double);
                }
                this.setMine();
            }
            this.count = 0;
        }, 300);
    };
    handleRightClick = (e) => {
        e.preventDefault();
        const { x, y, gameState } = this.props;
        if (gameState === GAME.READY || gameState === GAME.RUN) {
            this.props.rotateCellState(x, y);
        }
        this.setMine();
    };
    setMine = () => {
        let { className, renderValue } = this.state;
        let { gameState, cell } = this.props;
        className = "Map_item";
        switch (cell.cover) {
            case CODES.CELL_STATUS.CLOSED:
                if (cell.value === CODES.CELL_VALUE.MINE) {
                    if (gameState === GAME.LOSE) {
                        renderValue = "🌑";
                    } else if (gameState === GAME.WIN) {
                        renderValue = "🌝";
                    } else {
                        renderValue = "";
                    }
                } else {
                    renderValue = "";
                }
                break;
            case CODES.CELL_STATUS.FLAG:
                if (gameState === GAME.WIN) renderValue = "🌝";
                else if (gameState === GAME.LOSE) renderValue = "🌑";
                else renderValue = "🌚";
                break;
            case CODES.CELL_STATUS.QUESTION:
                renderValue = "🌓";
                break;
            default:
                className = "Map_item_open";
                switch (cell.value) {
                    case CODES.CELL_VALUE.MINE:
                        switch (gameState) {
                            case GAME.WIN:
                                renderValue = "🌝";
                                break;
                            case GAME.LOSE:
                                console.log(cell.value);
                                renderValue = "🌑";
                                break;
                            default:
                                return "";
                        }
                        break;
                    case CODES.CELL_VALUE.NOTHING:
                        renderValue = "";
                        break;
                    default:
                        renderValue = cell.value;
                        break;
                }
                break;
        }
        this.setState({ className, renderValue });
    };
    render() {
        return (
            <div
                onClick={(e) => this.handleLeftClick(e)}
                onContextMenu={(e) => this.handleRightClick(e)}
                className={this.state.className}
            >
                {this.state.renderValue}
            </div>
        );
    }
}

const CellContainer = connect(
    (state) => ({
        gameState: state.Controller.gameState,
        boardMap: state.Controller.boardMap,
    }),
    {
        openCell,
        rotateCellState,
    }
)(Cell);

export default CellContainer;
