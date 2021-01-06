import {Switch, Route} from 'react-router-dom'
import React from 'react'

import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import Home from "./components/home/Home";
import PostFull from "./components/post-full/PostFull";

export default ()=>{

    return (
        <Switch>
            <Route path={`/article/:linkToFullPost`} component={PostFull}/>
            <Route path={'/login'} component={SignIn}/>
            <Route path={'/register'} component={SignUp}/>
            <Route path={'/'} component={Home}/>
        </Switch>
    )
}