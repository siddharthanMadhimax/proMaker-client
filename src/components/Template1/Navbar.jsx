import React, { useState } from 'react'
import _exports from './constant'
import { ul } from 'framer-motion/client'
import { MenuOutlined, UserAddOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'

const Navbar = ({nameFirst}) => {
  const [drawerOpen,setdrawerOpen]=useState(false)
  const firstLetter=nameFirst[0]
  console.log("name",firstLetter)
  return (
    <div className='py-2 sm:mb-[100px]'>
        <div className='flex items-center justify-between max-sm:hidden'>
          <div className='w-[40px] h-[40px] bg-white bg-opacity-10 rounded-full  flex justify-center items-center'>
            <h1 className='sm:text-xl sm:font-bold'>{firstLetter}</h1>
          </div>
            <ul className='flex gap-10'>
              {_exports.navbars.map((item,index)=>{
              return  <li key={index}>
                  <a href={`${item.link}`}>
                    {item.name}
                  </a>
                </li>
              })}
            </ul>
        </div>

        <div className='sm:hidden flex items-center justify-between'>
          {/* left-side */}
          <div className='h-[30px] w-[30px] font-bold text-lg text-center bg-white bg-opacity-10 rounded-full'>
            <h1>{firstLetter}</h1>
          </div>
          {/* right side */}
          <div>
            <MenuOutlined onClick={()=>setdrawerOpen(true)}/>
            <Drawer 
            width={200}
            open={drawerOpen}
            style={{backgroundColor:"black",color:"white"}}
            onClose={()=>setdrawerOpen(false)}
            >
             <div >
              <ul className='flex flex-col items-center justify-center gap-10'>
                {
                  _exports.navbars.map((item,index)=>(
                    <li key={index} className='text-lg font-bold'>
                      <a href={`${item.link}`} onClick={()=>setdrawerOpen(false)}>
                        {item.name}
                      </a>
                    </li>
                  ))
                }
              </ul>
             </div>
            </Drawer>
          </div>
        </div>
    </div>
  )
}

export default Navbar