// Loader.js
import React from 'react';
import spinner from "./XOsX.gif";

const Loader = () => {
  return (
    <div className=" flex flex-col items-center justify-center h-full w-full ">
      
        <img src={spinner} alt="" />
         <h3 className='font-serif font-bold text-xl'>Uploading...</h3>
    </div>
  );
};

export default Loader;
