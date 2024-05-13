// View.js
import React from 'react';

const View = ({ products,title }) => {
  return (
    <div className='view'>
      <h2>Product Details</h2>
      {/* <p>{title}</p> */}
      <p>Title:  {products}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default View;
