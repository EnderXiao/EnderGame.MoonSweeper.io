import React, { Component } from "react";
import { connect } from "react-redux";
import Cell from "./Cell";
import "./styles.css";
import { setGame, restartGame } from "../../redux/actions/rootController";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        // this.props.setGame();
        this.props.restartGame();
    }
    onRightClick = (e) => {
        e.preventDefault();
    };

    renderMap = () => {
        const { boardMap } = this.props;
        return boardMap.map((item_row, index_row) => {
            return (
                <div
                    className="Map_row"
                    key={`row-${index_row}`}
                    onClick={(e) => {
                        this.onRightClick(e);
                    }}
                >
                    {item_row.map((item_col, index_col) => {
                        return (
                            <Cell
                                x={index_row}
                                y={index_col}
                                cell={item_col}
                                key={`row-${index_row}-col-${index_col}`}
                            />
                        );
                    })}
                </div>
            );
        });
    };
    render() {
        return <div className="Map">{this.renderMap()}</div>;
    }
}

const BoardContainer = connect(
    (state) => ({
        boardMap: state.Controller.boardMap,
        boardSizeRow: state.Controller.width,
        boardSizeCol: state.Controller.height,
        mineNum: state.Controller.mineCount,
    }),
    {
        setGame,
        restartGame,
    }
)(Board);

export default BoardContainer;
