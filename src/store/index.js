import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import {MODULE_NAME as productsModuleName, reducer as productsReducer} from "./reducers/products"

const rootReducer=combineReducers({
    [productsModuleName]:productsReducer
});

const store=createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store
