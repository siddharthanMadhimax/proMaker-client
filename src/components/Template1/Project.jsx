import { Button, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { motion } from 'framer-motion'
import Tilt from "react-parallax-tilt"

const Project = ({project,setProject,generate}) => {
  return (
    <div id='projects' className='mt-[100px]'>
        <h1 className='text-3xl font-bold'>Project</h1>
        <div className='project-input flex flex-col p-5 gap-10 mt-10'>
          {
            project.map((item,index)=>(
              <Tilt key={index}
             tiltMaxAngleX={5}
             tiltMaxAngleY={5}
            //  scale={0.9}
              >
                <motion.div 
              initial={{opacity:0,x:-100}}
              whileInView={{opacity:1,x:0}}
              transition={{duration:1}}
              key={index} className='bg-gray-700 p-2 rounded-lg'>
                <TextArea 
                readOnly={generate}
                autoSize={{minRows:1,maxRows:5}}
                value={item.projectName}
                onChange={(e)=>setProject(index,"projectName",e.target.value)}
                 style={{backgroundColor:"transparent",color:"blue",border:'none'
                  ,fontSize:"26px",fontWeight:"bold"
                }}/>
                <TextArea 
                readOnly={generate}
                autoSize={{ minRows: 1, maxRows: 15 }}

                value={item.projectDetails} 
                onChange={(e)=>setProject(index,"projectDetails",e.target.value)}
                style={{backgroundColor:"transparent",color:"white",border:'none'
                  ,fontSize:"17px"
                }}/>
                <div className='mt-10 w-full mb-5 flex items-center justify-center '>
                 <a href={`${item.projectLink}`} target='_blank'>
                 <Button type='primary' className=' w-[200px] p-5 rounded-xl'>For code</Button>
                 </a>
                </div>
              </motion.div>
              </Tilt>
            ))
          }
        </div>
    </div>
  )
}

export default Project