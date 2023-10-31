import axios from "axios"
import { API } from "../utils/config"


export const createCategory = (token,data) =>{
    return axios.post(`${API}/category`,data,{
        headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const createProduct = (token,data) =>{
    console.log(data);
    return axios.post(`${API}/product`,data,{
        headers:{
            "Content-type":"form-data",
            "Authorization":`Bearer ${token}`
        }
    })
}

export const getCategories = () =>{
    return axios.get(`${API}/category`)
}