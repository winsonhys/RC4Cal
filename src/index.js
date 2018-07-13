import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import "./index.css"
import getStore from "./store"
import registerServiceWorker from "./registerServiceWorker"
import Main from "./routes"

const { store, persistor } = getStore()
console.log(process.env)
console.log(process.env.REACT_APP_HELLO)
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Main />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
)
registerServiceWorker()
