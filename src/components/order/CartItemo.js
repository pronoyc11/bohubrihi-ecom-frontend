import React, { useEffect, useState } from 'react';
import { API } from '../../utils/config';
import { getProductDetails } from '../../api/apiProduct';

const CartItemo = ({ item,serial }) => {
    let [name,setName] = useState('');
    useEffect(()=>{
getProductDetails(item.product)
.then(response=> setName(response.data.name))
.catch(err=>console.log(err));
    },[])
    return (
        <div className='mb-2'>
         
           
            <img src={`${API}/product/photo/${item.product}`} className='img-fluid' style={{width:"3rem",height:"3rem"}} />
            <span className='ml-3'>{name}</span>
            <span align="right" className='float-right'>৳{item.price*item.count}  </span>
        </div>)
};


export default CartItemo;