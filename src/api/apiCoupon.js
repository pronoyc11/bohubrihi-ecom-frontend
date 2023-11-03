import axios from "axios"
import { API } from "../utils/config"

export const getCoupon = name =>{
    return axios.get(`${API}/discount?name=${name}`) ;
}