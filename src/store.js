import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import devTools from "remote-redux-devtools"
import { persistStore, persistReducer } from "redux-persist"
import storageSession from "redux-persist/lib/storage/session"

import CalendarReducer from "./events/redux"
import UserReducer from "./frontPage/redux"

const rootReducer = combineReducers({
  user: UserReducer,
  events: CalendarReducer,
})

const persistConfig = {
  key: "root",
  storage: storageSession,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const configureStore = () => {
  const store = createStore(
    persistedReducer,
    {},
    compose(
      applyMiddleware(thunk),
      devTools()
    )
  )
  const persistor = persistStore(store)
  return { store, persistor }
}

export default configureStore
