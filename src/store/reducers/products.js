import App from "../../firebase/firebaseConfig";


//action types
const SET_PRODUCTS="SET_PRODUCTS";
const EDIT_PRODUCT="EDIT_PRODUCT";
const DELETE_PRODUCT="DELETE_PRODUCT";
const ADD_PRODUCT="ADD_PRODUCT";
const ADD_TO_FAVORITE="ADD_TO_FAVORITE";
const REMOVE_FROM_FAVORITE="REMOVE_FROM_FAVORITE";
const SET_SORT_TYPE="SET_SORT_TYPE"
const SET_LOADING_TRUE="SET_LOADING_TRUE"
const SET_LOADING_FALSE="SET_LOADING_FALSE"
const FILTER_PRODUCTS="FILTER_PRODUCTS";


//actions
const setProductsAction=(producsArr)=>({
    type:SET_PRODUCTS,
    payload:producsArr
});
const editProductAction=(product)=>({
    type:EDIT_PRODUCT,
    payload:product
});
const deleteProductAction=(id)=>({
    type:DELETE_PRODUCT,
    payload:id
})
const addProductAction=(product)=>({
    type:ADD_PRODUCT,
    payload:product
});


export const setLoadingTrue=()=>({
    type:SET_LOADING_TRUE
})

export const setLoadingFalse=()=>({
    type:SET_LOADING_FALSE
})

export const setSortType=(sortType)=>({
    type:SET_SORT_TYPE,
    payload:sortType
})

export const addToFavAction=(product)=>{
    console.log("inside action: ",product)
    return{
        type:ADD_TO_FAVORITE,
        payload:product
    }
} 
export const removeFromFavAction=(id)=>({
    type:REMOVE_FROM_FAVORITE,
    payload:id
})

export const filterProducts=(id)=>({
    type:FILTER_PRODUCTS,
    payload:id
})
//selectors
export const MODULE_NAME="products";


//reducer
const initialState={
    loading:false,
    products:[],
    productsToShow:[],
    favorites:[],
    sortType:"",
    filterCat:"all"
};

export function reducer(state=initialState, {type, payload}){
    switch(type){
        case SET_PRODUCTS:
            let stateCopy=state.products
            if (state.sortType==="asc"){
                stateCopy.sort((a,b)=>a.price-b.price)
                return {
                    ...state,
                    products:stateCopy
                }
            }else if (state.sortType==="desc"){
                stateCopy.sort((a,b)=>b.price-a.price)
                return {
                    ...state,
                    products:stateCopy
                }
            }
            return {
                ...state,
                products:payload
            }
        case EDIT_PRODUCT:
            return {
                ...state,
                products:state.products.map(item=>{
                    if (item.id===payload.id){
                        return {
                            ...item,
                            ...payload
                        }
                    }else {
                        return item
                    }
                })
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                products:state.products.filter(item=>item.id!==payload)
            }
        case ADD_PRODUCT:
            console.log("inn add reducer : ",{
                ...state,
                products:[payload, ...state.products]
            })
            return {
                ...state,
                products:[payload, ...state.products]
            }
        case ADD_TO_FAVORITE:
            console.log("inside add to fav reducer", {
                ...state,
                favorites:[payload, ...state.favorites]
            })
            return {
                ...state,
                favorites:[payload, ...state.favorites]
            }
        case REMOVE_FROM_FAVORITE:
            return {
                ...state,
                favorites:state.favorites.filter(item=>item.id!==payload)
            }

        case SET_SORT_TYPE:
            switch (payload) {
                case "asc":
                    let productsCopyAsc=state.productsToShow.length?state.productsToShow:state.products;
                    let productsSorted=productsCopyAsc.sort((a,b)=>a.price-b.price)
                    return {
                        ...state,
                        productsToShow:productsSorted,
                        sortType:payload
                    }  
                case "desc":
                    let productsCopyDesc=state.productsToShow.length?state.productsToShow:state.products;
                    let productsSortedDesc=productsCopyDesc.sort((a,b)=>b.price-a.price)
                    return {
                        ...state,
                        productsToShow:productsSortedDesc,
                        sortType:payload
                    }
                default:
                    return state;
            }
        case SET_LOADING_TRUE:
            return {
                ...state,
                loading:true
            }
        case SET_LOADING_FALSE:
            return {
                ...state,
                loading:false
            }
        case FILTER_PRODUCTS:
            if (payload==="all"){
                return {
                    ...state,
                    filterCat:"all",
                    productsToShow:state.products
                }
            }
            return {
                ...state,
                productsToShow:state.products.filter(item=>item.category==payload),
                filterCat:payload
            }
        default :
            return state
    }
}

//middlewares

//set products
export const setProducts=()=>async(dispatch)=>{
    try {
        dispatch(setLoadingTrue())
        const itemsRef = App.db.ref('products');
        itemsRef.once('value', (snapshot) => {
        let items = snapshot.val();
        let newState = [];
        for (let item in items) {
        newState.push({
            id: item,
            ...items[item]
        });
        }
        dispatch(setProductsAction(newState))
        dispatch(setLoadingFalse())
        return newState
        });
    } catch (error) {
        console.log("error: ",error);
        dispatch(setLoadingFalse())
    }
}

export const editProduct=(product)=>async (dispatch)=>{
    try {
        const ref=App.db.ref(`products/${product.id}`);
        ref.update(product, (err)=>{
          if (err){
            console.log('error happened');
          }else {
            dispatch(editProductAction(product))
          }
        })
    } catch (error) {
        console.log("error: ",error)
    }
}

//add new product

export const addNewProduct=(product)=>async (dispatch)=>{
    try {
        const dbRef=App.db.ref("products");
        const key= (await dbRef.push(product)).key;
        if (key){
            dbRef.child(key).update({id:key});
            dispatch(addProductAction({...product, id:key}));
        }
    } catch (error) {
        
    }

}

//delete product

export const deleteProduct=(id)=>(dispatch)=>{
    try {
        const prodRef=App.db.ref("products").child(id);
        prodRef.set(null, (err)=>{
            if (err){
              console.log('error happened');
            }else {
                console.log("dispatching delete action")
              dispatch(deleteProductAction(id))
            }
          })
    } catch (error) {
        console.log("error: ",error)
    }

}
