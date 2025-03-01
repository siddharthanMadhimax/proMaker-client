import { Input } from 'antd'
import React from 'react'
import { motion } from 'framer-motion'

const Education = ({education,onEducationChange}) => {
  return (
    <div className='education-form mt-[100px] overflow-hidden' id='education'>
      <h1 className='text-3xl font-bold mb-10'>Education</h1>
      <div className='flex flex-col gap-10 rounded-lg bg-gray-700' style={{backgroundColor:"",padding:"20px"}}>
      {education.map((item,index)=>(
        <motion.div initial={{opacity:0,y:100}}
        whileInView={{opacity:1,y:0}}
        transition={{duration:0.7}}
        key={index} style={{border:"1px solid white"}} className='rounded-lg bg-gray-900 p-2  education-div'>
          <Input value={item.std} onChange={(e)=>onEducationChange(index,"std",e.target.value)}
          style={{color:"blue",fontSize:"24px"}}/>
          <Input  value={item.mark} onChange={(e)=>onEducationChange(index,"mark",e.target.value)}
           style={{color:"white",fontSize:"20px"}}/>
          <Input className='max-sm:hidden' value={item.description} onChange={(e)=>onEducationChange(index,"description",e.target.value)}
          style={{color:"white",fontSize:"16px"}}/>
        </motion.div>
      ))}
      </div>
    </div>
  )
}

export default Education