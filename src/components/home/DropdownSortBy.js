import React from 'react'

const DropdownSortBy = ({handleFilter}) => {
    const handleChange = (e) =>{
        handleFilter(e.target.value);
      }
      return (
        <select className="custom-select" onChange={e=>handleChange(e)}>
          <option value="createdAt">Arrival</option>
          <option value="price">Price</option>
      <option value="sold">Sold</option>
      <option value="totalRating">Review</option>
    </select>
      )
}

export default DropdownSortBy