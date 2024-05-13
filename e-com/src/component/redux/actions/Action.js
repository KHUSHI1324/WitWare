// import axios from 'axios';
// const URL = 'http://localhost:8000';
// using proxy declare url on package.json
export const getProducts =()=>async(dispatch)=>{
try {
    const data = await fetch('http://localhost:8000/getproducts',{
        method:'GET',
        headers:{
            'Content-Type':"appliction/json"
        }
    });
    const res =await data.json();
    console.log(res);
dispatch({type:'SUCCESS_GET_PRODUCTS',payload:res})
} catch (error) {
    dispatch({type:'FAIL_GET_PRODUCTS',payload:error.res})
}
}

export const getProducts2 =()=>async(dispatch)=>{
    try {
        const data2 = await fetch('http://localhost:8000/getproducts2',{
            method:'GET',
            headers:{
                'Content-Type':"appliction/json"
            }
        });
        const res2 =await data2.json();
        console.log(res2);
    dispatch({type:'SUCCESS_GET_PRODUCTS',payload:res2})
    } catch (error) {
        dispatch({type:'FAIL_GET_PRODUCTS',payload:error.res2})
    }
}