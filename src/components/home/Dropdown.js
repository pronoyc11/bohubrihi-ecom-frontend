import React from 'react'

const Dropdown = ({handleFilter}) => {
  const handleChange = (e) =>{
    handleFilter(e.target.value);
  }
  return (
    <select className="custom-select" onChange={e=>handleChange(e)}>
      <option value="desc">Descending</option>
  <option value="asce">Ascending</option>
</select>
  )
}

export default Dropdown