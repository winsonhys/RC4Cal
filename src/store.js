import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import devTools from "remote-redux-devtools";
import LogInPageReducer from "./logInPage/redux";

const reducer = combineReducers({
  LogInPage: LogInPageReducer
});

const configureStore = () => {
  const store = createStore(
    reducer,
    {},
    compose(applyMiddleware(thunk), devTools())
  );
  return store;
};

export default configureStore;
