import axios from "axios"
import {API_URL} from "./constants";

export function fetch2(endpoint) {
    const token = JSON.parse(localStorage.getItem("token"));
    return axios.get(API_URL+endpoint,{ headers: { 'authorization': token } });
}

export function getUrlParam( name, url ) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}

export function updateUser( data, setUserDetail ) {
    const lsToken = localStorage.getItem("token");
    axios.post( `${API_URL}/api/user/update`, data, {headers: { 'authorization': 'Bearer '+lsToken }} )
        .then(({data}) => {
            setUserDetail(data);
        }).catch(({response})=>{
        const { status, data:{message,last_bid} } = response;
        // if(status===401) window.location.href=`/login`;
    });
}
