import { createStore } from "redux"
import { rootReducer } from "./reducers/rootReducer"
// import thunk from 'redux-thunk'

export const appStore = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())