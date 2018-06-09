import { createStore, combineReducers, applyMiddleWare } from "redux";
import thunk from "thunk";
import LogInPageReducer from "./logInPage/redux";

const reducer = combineReducers({
  LogInPage: LogInPageReducer
});

const configureStore = () => {
  const store = createStore(reducer, applyMiddleWare(thunk));
};

export default store;
