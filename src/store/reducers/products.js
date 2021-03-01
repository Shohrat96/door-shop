import App from "../../firebase/firebaseConfig";


//action types
const SET_PRODUCTS="SET_PRODUCTS";

//actions
const setProductsAction=(producsArr)=>({
    type:SET_PRODUCTS,
    payload:producsArr
})


//selectors
export const MODULE_NAME="products";


//reducer
const initialState=[];

export function reducer(state=initialState, {type, payload}){
    switch(type){
        case SET_PRODUCTS:
            return payload
        default :
            return state
    }
}

//middlewares

//set products
export const setProducts=()=>async(dispatch)=>{
    try {
        const itemsRef = App.db.ref('products');
        itemsRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let newState = [];
        for (let item in items) {
        newState.push({
            id: item,
            ...items[item]
        });
        }
        dispatch(setProductsAction(newState))
        });
    } catch (error) {
        console.log("error: ",error);
    }
}

//edit product. Since we attach listener to firebase db in setProduts, state is
//automatically updated when edit occurs for any product. So, dispatch isn't used for now.
export const editProduct=(product)=>{
    const ref=App.db.ref(`products/${product.id}`);
    ref.update(product, (err)=>{
      if (err){
        console.log('error happened');
      }else {
        console.log('update successful')
      }
    })
}

//add new product

export const addNewProduct=(product)=>{
    const dbRef=App.db.ref("products");
    dbRef.push(product);
}

//delete product

export const deleteProduct=(id)=>{
    const prodRef=App.db.ref("products").child(id);
    prodRef.remove()
}
