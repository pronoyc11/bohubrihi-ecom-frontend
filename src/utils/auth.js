import jwt_decode from "jwt-decode";
import { googleLogout } from '@react-oauth/google';
export const authenticate = (token,cb) =>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(token));
        cb();
    }
}
export const isAuthenticated = ()=>{
    if(typeof window === "undefined") return false ;
    if(localStorage.getItem("jwt")){
        const {exp}  = jwt_decode(JSON.parse(localStorage.getItem("jwt")));

        if((new Date()).getTime() <= exp * 1000){
           return true ;
        }else{
            localStorage.removeItem("jwt");
            return false ;
        };
    }else{
        return false ;

    }
}
export const userInfo = () =>{
    const jwt = JSON.parse(localStorage.getItem("jwt")) ;
   
    const decoded = jwt? jwt_decode(JSON.parse(localStorage.getItem("jwt"))) : {cool:"null"};

    return {...decoded,token:jwt};
}
export const signout = cb =>{
    if(typeof window !== "undefined"){
        googleLogout();
        localStorage.removeItem("jwt");
        cb();
    } 
}