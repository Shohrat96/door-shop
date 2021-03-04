import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const mapStateToProps=(state)=>({
    uid:state.auth.uid
})

const ProtectedRoute=connect(mapStateToProps)(({component: Component, uid, ...rest})=>{
    console.log("uid in protexted: ",uid)
    return (
        <Route {...rest} render={(props)=>{
            if (uid){
                console.log("yes uid")
                return <Component {...props}/>
            }else {
                console.log("no uid")

                return <Redirect to="/login"/>
            }
            // return auth.uid?<Component {...props}/>:<Redirect to="/login"/> 
        }}/>
    )
})

export default ProtectedRoute