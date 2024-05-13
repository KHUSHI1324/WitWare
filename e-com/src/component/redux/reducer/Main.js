import { getProductsReducer,getProductsReducer2 } from "./ProductsReducers";
// for more than 1 reducer
import { combineReducers } from "redux";


const rootReducers = combineReducers({
    getproductsdata:getProductsReducer,
    getproductsdata2:getProductsReducer2
    // multiple reducer...
});


export default rootReducers;
// export  rootReducers(declare multiple reducer in rootReducers)
// to store.js 