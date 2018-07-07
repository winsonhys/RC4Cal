import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import devTools from "remote-redux-devtools";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import CalendarReducer from "./events/redux";
import UserReducer from "./frontPage/redux";

const rootReducer = combineReducers({
  user: UserReducer,
  events: CalendarReducer
});

const persistConfig = {
  key: "root",
  storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const configureStore = () => {
  const store = createStore(
    persistedReducer,
    {},
    compose(
      applyMiddleware(thunk),
      devTools()
    )
  );
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
