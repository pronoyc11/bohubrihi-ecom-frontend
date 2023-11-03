import React from "react";

const Radiobox = ({ prices, handleFilter }) => {


    const handleChange = (e)=>{
       handleFilter(e.target.value);
     
    }




  return prices.map((price) => {

   return <div className="col-6" key={price.id}>
      <input
        type="radio"
        onChange={e=>handleChange(e)}
        value={price.id}
        name="price_filter"
        className="mr-2"
      />
      <label className="form-check-label mr-4">{price.name}</label>
    </div>;
  });
};

export default Radiobox;
