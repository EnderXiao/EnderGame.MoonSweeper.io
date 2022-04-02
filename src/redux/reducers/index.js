import { combineReducers } from "redux";
import { default as Controller } from "./Controller";

// console.log(Controller);
export const rootReducer = combineReducers({
    Controller: Controller,
});
