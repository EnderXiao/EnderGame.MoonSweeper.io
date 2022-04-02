/**
 * store
 * 暴露一个store对象
 */
import { createStore, applyMiddleware } from "redux";

// 引入汇总reducer
import { rootReducer } from "./reducers";

// 引入redux-thunk，用于支持异步action
import thunk from "redux-thunk";

// 引入开发者工具
import { composeWithDevTools } from "redux-devtools-extension";

export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
