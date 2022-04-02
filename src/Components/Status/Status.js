import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles.css";
import {
    restartGame,
    updateElapsedTime,
    showSettings,
    hideSettings,
} from "../../redux/actions/rootController";
import { GAME } from "../../redux/constant";

class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Emoji: "😄",
            elapsedTime: props.elapsedTime,
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.gameState !== this.props.gameState) {
            this.setEmoji();
        }
        if (prevProps.enableTimer !== this.props.enableTimer) {
            if (this.props.enableTimer) {
                this.gameTimer = setInterval(() => {
                    this.props.updateElapsedTime();
                }, 1000);
            } else {
                clearInterval(this.gameTimer);
            }
        }
        if (prevProps.elapsedTime !== this.props.elapsedTime) {
            this.setState({ elapsedTime: this.props.elapsedTime });
        }
        if (prevProps.enableSettings !== this.props.enableSettings) {
            this.setState({ enableSettings: this.props.enableSettings });
        }
    }
    setEmoji() {
        if (this.props.gameState === GAME.LOSE) {
            this.setState({ Emoji: "😢" });
        } else if (this.props.gameState === GAME.WIN) {
            this.setState({ Emoji: "😎" });
        } else {
            this.setState({ Emoji: "😄" });
        }
    }
    handleSetting = () => {
        this.props.showSettings();
    };
    render() {
        return (
            <div className="scores">
                <div className="mineCount">
                    🌕
                    {`${this.props.mineCount - this.props.flagCount} / ${
                        this.props.mineCount
                    }`}
                </div>
                <div className="emojiSpace">
                    <span className="emoji" onClick={this.props.restartGame}>
                        {this.state.Emoji}
                    </span>
                    {this.props.gameState !== GAME.RUN && (
                        <span className="emoji" onClick={this.handleSetting}>
                            ⚙️
                        </span>
                    )}
                </div>
                <div className="timeCount">🕙{this.state.elapsedTime}</div>
            </div>
        );
    }
}

const StatusContainer = connect(
    (state) => ({
        mineCount: state.Controller.mineCount,
        flagCount: state.Controller.flagCount,
        enableTimer: state.Controller.enableTimer,
        elapsedTime: state.Controller.elapsedTime,
        mineNum: state.Controller.mineCount,
        gameState: state.Controller.gameState,
    }),
    {
        restartGame,
        updateElapsedTime,
        showSettings,
        hideSettings,
    }
)(Status);

export default StatusContainer;
