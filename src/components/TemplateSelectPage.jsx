import React from 'react'
import _exports from './Template1/constant'
import { useNavigate } from 'react-router-dom'

const TemplateSelectPage = () => {
  const naviagate=useNavigate()
  return (
    <div className='bg-black sm:w-full sm:h-screen'>
      <div className='p-10 grid grid-cols-4 relative max-sm:left-[20px] items-center justify-center max-sm:grid-cols-1 gap-10'>
        {
          _exports.templates.map((item,index)=>(
            <div key={index} className=''>
              <div onClick={()=>naviagate(`${item.link}`)} className='w-[200px] cursor-pointer flex items-center justify-center border-style h-[200px] bg-white bg-opacity-10 rounded-xl'>
              <h1 className='text-white font-bold text-blue-700'>{item.name}</h1>
              </div>
              
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default TemplateSelectPage