import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import devTools from "remote-redux-devtools";

import CalendarReducer from "./events/redux";
import UserReducer from "./frontPage/redux";

const reducer = combineReducers({
  user: UserReducer,
  events: CalendarReducer
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
