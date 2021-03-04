import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import {MODULE_NAME as productsModuleName, reducer as productsReducer} from "./reducers/products"
import {MODULE_NAME as ordersModuleName, reducer as ordersReducer} from "./reducers/orders"
import {MODULE_NAME as authModuleName, reducer as authReducer} from "./reducers/auth"

const rootReducer=combineReducers({
    [productsModuleName]:productsReducer,
    [ordersModuleName]:ordersReducer,
    [authModuleName]:authReducer
});

const store=createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store
