import App from "../../firebase/firebaseConfig";


//action types
const SET_PRODUCTS="SET_PRODUCTS";
const EDIT_PRODUCT="EDIT_PRODUCT";
const DELETE_PRODUCT="DELETE_PRODUCT";
const ADD_PRODUCT="ADD_PRODUCT";
const ADD_TO_FAVORITE="ADD_TO_FAVORITE";
const REMOVE_FROM_FAVORITE="REMOVE_FROM_FAVORITE";
const SET_SORT_TYPE="SET_SORT_TYPE"

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
//selectors
export const MODULE_NAME="products";


//reducer
const initialState={
    products:[],
    favorites:[],
    sortType:""
};

export function reducer(state=initialState, {type, payload}){
    switch(type){
        case SET_PRODUCTS:
            console.log("productsL ",payload);
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
                    let productsCopy=state.products;
                    let productsSorted=productsCopy.sort((a,b)=>a.price-b.price)
                    return {
                        ...state,
                        products:productsSorted,
                        sortType:payload
                    }  
                case "desc":
                    let productsCopyDesc=state.products;
                    let productsSortedDesc=productsCopyDesc.sort((a,b)=>b.price-a.price)
                    return {
                        ...state,
                        products:productsSortedDesc,
                        sortType:payload
                    }
                default:
                    return state;
            }
            
        default :
            return state
    }
}

//middlewares

//set products
export const setProducts=()=>async(dispatch)=>{
    try {
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
        return newState
        });
    } catch (error) {
        console.log("error: ",error);
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
