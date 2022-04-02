import React, { Component } from "react";
import { connect } from "react-redux";
import Board from "../Board/Board";
import { restartGame } from "../../redux/actions/rootController";
import "./styles.css";
import { GAME, CODE } from "../../redux/constant";
import Status from "../Status/Status";
import Settings from "../Settings/Settings";

class Format extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GameOver: props.gameState === GAME.LOSE,
            enableSettings: props.enableSettings,
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.gameState !== this.props.gameState) {
            this.setState({ GameOver: this.props.gameState === GAME.LOSE });
        }
        if (prevProps.enableSettings !== this.props.enableSettings) {
            this.setState({ enableSettings: this.props.enableSettings });
        }
    }
    handleNewGame = () => {
        this.props.restartGame();
    };
    render() {
        return (
            <div>
                <div className="container">
                    <div className="title">
                        <div>Moon Sweeper !</div>
                    </div>
                    <div className="great">
                        Try your best to find the Moons!
                    </div>
                    <div className="map">
                        {this.state.enableSettings && <Settings />}
                        {!this.state.enableSettings && (
                            <>
                                <Status />
                                <Board />
                            </>
                        )}
                        <div
                            className="end"
                            id="end"
                            style={
                                this.state.GameOver
                                    ? { opacity: 1, zIndex: 1 }
                                    : { opacity: 0, zIndex: -1 }
                            }
                        >
                            菜<div className="monkey"></div>
                            <button
                                onClick={() => {
                                    this.props.restartGame();
                                }}
                                className="btn"
                                id="tryAgain"
                            >
                                再试一次
                            </button>
                        </div>
                    </div>
                </div>
                <div className="footer">Developed by Ender</div>
            </div>
        );
    }
}

const FormatContainer = connect(
    (state) => ({
        gameState: state.Controller.gameState,
        boardMap: state.Controller.boardMap,
        enableSettings: state.Controller.enableSettings,
    }),
    {
        restartGame,
    }
)(Format);

export default FormatContainer;
