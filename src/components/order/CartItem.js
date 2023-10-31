import React from 'react';
import { API } from '../../utils/config';

const CartItem = ({ item,serial,increaseItem,decreaseItem,deleteItem }) => {
    return (
        <tr className='mb-2'>
            <th scope="row">{serial}</th>
            <th><img src={`${API}/product/photo/${item.product._id}`} className='img-fluid' style={{width:"3rem",height:"3rem"}} /></th>
            <td>{item.name}</td>
            <td>
                <button className="btn btn-outline-primary btn-sm" onClick={decreaseItem}>-</button>
                &nbsp;&nbsp;&nbsp;&nbsp;{item.count}
                <button className="btn btn-outline-primary btn-sm" onClick={increaseItem}>+</button>
            </td>
            <td align="right">৳{item.price*item.count}  </td>
            <td><button className="btn btn-danger btn-sm" onClick={deleteItem}>Remove From Cart</button></td>
        </tr>)
};


export default CartItem;