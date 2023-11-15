import React from 'react'
import { TbError404 } from "react-icons/tb";

const ErrorElement = () => {
  return (
    <div className='flex items-center justify-center h-screen text-4xl font-semibold tracking-wider text-red-500'>
    <TbError404 size="10em"/>
    <div className='p-3 border-b-2 border-red-500'>Something went Wrong</div>
    </div>
  )
}

export default ErrorElement