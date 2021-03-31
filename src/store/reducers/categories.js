import App from "../../firebase/firebaseConfig";

const SET_CATEGORIES='SET_CATEGORIES';

const setCategories=(payload)=>({
    type:SET_CATEGORIES,
    payload
})

const initialState=[]

export const MODULE_NAME='categories';

export const reducer=(state=initialState, {type, payload})=>{
    switch (type) {
        case SET_CATEGORIES:
            return payload
    
        default:
            return state
    }
}

export const setCategoriesAction=()=>async(dispatch)=>{
    const ref=App.db.ref("categories");
    let categArr=[]
    ref.once('value',(snapshot)=>{
        Object.keys(snapshot.val()).forEach(key=>{
            categArr.push(snapshot.val()[key])
        })
        console.log("vategories: ",categArr);
        dispatch(setCategories(categArr))
    })

}

