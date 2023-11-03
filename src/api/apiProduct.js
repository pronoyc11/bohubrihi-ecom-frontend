import { API } from "../utils/config";
import axios from "axios";

export const getProducts = (sortBy, order, limit,skip) => {
  return axios.get(
    `${API}/product?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`
  );
};

export const getProductDetails = (id) => {
  return axios.get(`${API}/product/${id}`);
};

export const getCategories = () => {
  return axios.get(`${API}/category`);
};

export const getFilteredProducts = (skip, limit, filters = {},order,sortBy) => {
 
  const data = {
    order: order,
    sortBy:sortBy,
    limit: limit,
    skip: skip,
    filters: {...filters}
  };
 return axios.post(`${API}/product/filter`,data,{
headers:{
    "Content-Type":"application/json"
}
  })
};

export const getBoughtProducts = token =>{
  return axios.get(`${API}/boughtProduct`,{
    headers:{
      'Authorization': `Bearer ${token}`
    }
  })
}
export const gettAndPutRatings = (token,star,prodId) => {
  const data = {
    star:star,
    prodId:prodId
  }
  return axios.put(`${API}/ratings`,data,{
    headers:{
      "Authorization": `Bearer ${token}`
    }
  })

}
export const doComment = (token,prodId,cmnt) =>{
  const data = {
    comment:cmnt
  }
  return axios.post(`${API}/comments/${prodId}`,data,{
    headers:{
      "Authorization":`Bearer ${token}`
    }
  })
}