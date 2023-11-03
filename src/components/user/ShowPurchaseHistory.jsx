import React from 'react'

import CartItemo from '../order/CartItemo';

const ShowPurchaseHistory = ({order,handleDeleteOrder}) => {
    let oId = order._id;
    const handleDeleteOrders = () =>{
        handleDeleteOrder(oId);
    }
  return (
    <li className='list-group-item border border-info rounded mb-2'>
        <div>
        {order.cartItems.map((item, i) => {
              return (
                <CartItemo
                  item={item}
                  serial={i + 1}
                  key={item._id}
                />
              );
            })}
        </div>
            <div style={{display:"flex",justifyContent:"space-between"}} >
            <span className='border border-secondary rounded p-2 text-primary'>Total:{order.ammount}</span>
            <span className={`border border-secondary rounded p-2 ${order.status === "pending"?"text-danger":"text-success"}`}>Status:{order.status === "pending"?"Not validated":"Valid"}</span>
            <span className='border border-secondary rounded p-2 text-info'>Date:{new Date(order.createdAt).toDateString()}</span>
            <button onClick={oId=>handleDeleteOrders(oId)} className='btn btn-danger'>delete</button>
            </div>

    </li>
  )
}

export default ShowPurchaseHistory