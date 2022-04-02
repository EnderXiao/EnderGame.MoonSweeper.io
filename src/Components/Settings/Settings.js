import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles.css";
import {
    restartGame,
    setGame,
    updateElapsedTime,
    showSettings,
    hideSettings,
} from "../../redux/actions/rootController";
import {
    GAME,
    MIN_HEIGHT,
    MAX_HEIGHT,
    MIN_WIDTH,
    MAX_WIDTH,
    MIN_MINES,
} from "../../redux/constant";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Emoji: "😄",
            elapsedTime: props.elapsedTime,
            maxMineCount: (MIN_HEIGHT - 1) * (MIN_WIDTH - 1),
            mineCount: MIN_MINES,
            width: MIN_WIDTH,
            height: MIN_HEIGHT,
        };
    }
    onChangeWidth = (e) => {
        this.setState({ width: parseInt(e.target.value) });
    };
    onChangeHeight = (e) => {
        this.setState({ height: parseInt(e.target.value) });
    };
    onChangeMine = (e) => {
        this.setState({ mineCount: parseInt(e.target.value) });
    };
    onClickSet = (e) => {
        this.props.setGame(
            this.state.width,
            this.state.height,
            this.state.mineCount
        );
        this.props.restartGame();
        this.props.hideSettings();
    };
    render() {
        return (
            <div className="settingFormat">
                <div className="settingBarSpace">
                    <span>
                        Width:
                        {this.state.width}
                    </span>
                    <input
                        type={"range"}
                        className="settingBar"
                        min={MIN_WIDTH}
                        max={MAX_WIDTH}
                        value={this.state.width}
                        onChange={this.onChangeWidth}
                    ></input>
                </div>
                <div className="settingBarSpace">
                    <span>
                        Height:
                        {this.state.height}
                    </span>
                    <input
                        type={"range"}
                        className="settingBar"
                        min={MIN_HEIGHT}
                        max={MAX_HEIGHT}
                        value={this.state.height}
                        onChange={this.onChangeHeight}
                    ></input>
                </div>
                <div className="settingBarSpace">
                    <span>
                        Mines:
                        {this.state.mineCount}
                    </span>
                    <input
                        type={"range"}
                        className="settingBar"
                        min={MIN_MINES}
                        max={(this.state.width - 1) * (this.state.height - 1)}
                        value={this.state.mineCount}
                        onChange={this.onChangeMine}
                    ></input>
                </div>
                <button className="myButton" onClick={this.onClickSet}>
                    Set
                </button>
            </div>
        );
    }
}

const SettingsContainer = connect(
    (state) => ({
        mineCount: state.Controller.mineCount,
        flagCount: state.Controller.flagCount,
        enableTimer: state.Controller.enableTimer,
        elapsedTime: state.Controller.elapsedTime,
        mineNum: state.Controller.mineCount,
        gameState: state.Controller.gameState,
        width: state.Controller.width,
        height: state.Controller.height,
    }),
    {
        restartGame,
        setGame,
        updateElapsedTime,
        hideSettings,
    }
)(Settings);

export default SettingsContainer;
