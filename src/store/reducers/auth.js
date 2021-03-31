import App from "../../firebase/firebaseConfig";

const LOG_IN="LOG_IN";

const initialState={
    email:"",
    uid:""
};

const logInAction=(payload)=>({
    type:LOG_IN,
    payload
})

export const MODULE_NAME="auth";

export const reducer=(state=initialState, {type, payload})=>{
    switch (type) {
        case LOG_IN:
            return {
                ...state,
                ...payload
            }
    
        default:
            return state;
    }
}

export const logIn=(email, password)=>async (dispatch)=>{
    App.auth.signInWithEmailAndPassword(email, password)
    .then((userCredential)=>{
        dispatch(logInAction({
            email,
            uid:userCredential.user.uid
        }))
    })
    .catch((err)=>console.log("error: ",err.message))
}