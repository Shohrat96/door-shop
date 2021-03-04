import App from "../../firebase/firebaseConfig";

const SET_ORDERS='SET_ORDERS';

const setOrders=(orders)=>({
    type:SET_ORDERS,
    payload: orders
})
export const MODULE_NAME="orders";

const initialState={
    data:[]
};

export const reducer=(state=initialState, {type, payload})=>{
    switch (type) {
        case SET_ORDERS:
            return {
                ...state,
                data:payload
            }    
        default:
            return state;
    }
}

//middlewares

export const setOrdersAction=()=>async (dispatch)=>{
    try {
        const ref=App.db.ref("orders");
        ref.on("value", snapshot=>{
            const orders=snapshot.val();
            console.log("data: ",orders)
            let newState = [];
            for (let order in orders) {
            newState.push({
                id: order,
                ...orders[order]
            });
            }
            dispatch(setOrders(newState))
        })
    } catch (error) {
        console.log("error: ",error)
    }
}