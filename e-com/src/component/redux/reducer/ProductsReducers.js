const products =[]
const products2=[]
export const getProductsReducer = (state={products},action)=>{
   switch(action.type){
    case "SUCCESS_GET_PRODUCTS":
        return {products: action.payload}
    case "FAIL_GET_PRODUCTS":
        return {products: action.payload}
        default : return state
   }
}
export const getProductsReducer2 = (state={products2},action)=>{
    switch(action.type){
     case "SUCCESS_GET_PRODUCTS":
         return {products2: action.payload}
     case "FAIL_GET_PRODUCTS":
         return {products2: action.payload}
         default : return state
    }
 }