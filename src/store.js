import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import devTools from "remote-redux-devtools";

const reducer = combineReducers({

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
