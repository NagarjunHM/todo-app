import React from 'react'
import { TbError404 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const ErrorElement = () => {
    const navigate = useNavigate();
  return (
    <div className='flex justify-center'>
    <div className='flex items-center justify-center h-screen mx-5 text-4xl font-semibold tracking-wider text-red-500'>
    <div className='flex-grow'>
        <button className="btn " onClick={()=>{
            navigate("/");
        }}>
            Home
        </button>
</div>
    <div className=''><TbError404 size="10em" /></div>
    <div className='p-3 border-b-2 border-red-500'>Something went Wrong</div>
    </div>
    </div>
  )
}

export default ErrorElement