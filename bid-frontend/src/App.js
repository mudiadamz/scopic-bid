import * as React from 'react';
import Home from "./Home";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import SignInSide from "./SignInSide";
import Item from "./Item";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "./constants";

const lsToken = localStorage.getItem("token");
export const AuthContext = React.createContext({});
export const FilterContext = React.createContext({});

function GlobalContext(props){
    const[token,setTokenState] = useState(lsToken);
    const[filter,setFilterState] = useState({});
    const[userDetail,setUserDetailState] = useState({});
    function setToken(value){
        setTokenState(value);
    }
    function setFilter(value){
        setFilterState(value);
    }
    function setUserDetail(value){
        setUserDetailState(value);
    }

    useEffect(()=>{
        axios.get( `${API_URL}/api/me`, {headers: { 'authorization': 'Bearer '+lsToken }} )
            .then(({data}) => {
                setUserDetail(data);
            }).catch(({response})=>{
            const { status, data:{message,last_bid} } = response;
        });
    },[]);

    return<>
        <AuthContext.Provider value={{ token, setToken, userDetail, setUserDetail }}>
            <FilterContext.Provider value={{ filter, setFilter }}>
                {props.children}
            </FilterContext.Provider>
        </AuthContext.Provider>
    </>
}

export default function App() {
    return (
        <GlobalContext>
            <Router>
                <Switch>
                    <Route path="/login">
                        <SignInSide />
                    </Route>
                    <Route path="/item/:id">
                        <Item />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </GlobalContext>
    );
}
