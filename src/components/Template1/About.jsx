import { Input,Button,Popover } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useMemo, useState } from 'react'
import { color, motion } from 'framer-motion'
import { EditOutlined } from '@ant-design/icons'
import SectionEditable from './sectionEditable'


const About = ({ about, onAboutChange,generate }) => {
    const [editAccess,setEditAccess]=useState(false)
    const [bgColor,setbgColor]=useState("#374151")
    const [textColor,setTextColor]=useState("white")
    const [headingColor,setHeadingColor]=useState("blue")
    const [subBgColor,setSubBgColor]=useState("black")
    const [editPopover,setEditPopover]=useState(false)

    const stylesContainer=useMemo(()=>(
        {
            backgroundColor:bgColor,
            color:textColor
        }
    ),[bgColor,textColor])

    // const subHeadingStyle=useMemo
    
    return (
        <div className='overflow-x:hidden  mt-10 mb-[40px]' id='about'>
            <h1 
            className='text-3xl  font-bold'>About</h1>
           <div className={`${editAccess ? "editableAccess" :""} mt-10 `}>


           <div style={stylesContainer}
           onClick={generate ? undefined :()=>setEditAccess((prev)=>!prev)}
            className=' flex max-sm:flex-col overflow-x:hidden items-center sm:p-10 p-3  rounded-lg   justify-around gap-[80px] '>
                 {
          editAccess ? <div onClick={(e) => e.stopPropagation()} className="absolute right-[-2px] cursor-pointer ">
            <Popover
            arrow={false}
            trigger="click"
            placement='left'
        content={
            <SectionEditable
            name={"aboutMe"}
      bgColor={bgColor} setbgColor={setbgColor}
      textColor={textColor} setTextColor={setTextColor}
      headingColor={headingColor} setHeadingColor={setHeadingColor}
      subBgColor={subBgColor} setSubBgColor={setSubBgColor}
    />
        }
              open={editPopover}
              onOpenChange={(visible) => setEditPopover(visible)}
            

            >
              <Button
                
                className="rounded-full bg-gray-700 sm:h-[50px] sm:w-[50px] h-[35px] w-[35px] absolute sm:right-[14px] right-[5px]"
              >
                <EditOutlined className="text-2xl text-blue-600" />
              </Button>
            </Popover>

          </div> : ""
        }
                {
                    about.map((item, index) => (
                        <motion.div 
                        style={{border:"1px solid white",backgroundColor:subBgColor}}
                        initial={{ opacity: 0, x: 20 }} 
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{duration:0.8}}
                        key={index} className='about-form-page bg-gray-900   rounded-lg p-5 sm:w-[400px]'>
                            <div>
                                <Input 
                                onClick={(e)=>e.stopPropagation()}
                                readOnly={`${generate}`}
                                style={{textAlign:"center",color:headingColor,fontSize:"20px"}}
                                value={item.aboutHead} className='text-xl font-bold txt-blue-300' 
                                onChange={(e)=>onAboutChange(index,"aboutHead",e.target.value)}/>
                            </div>
                            <div >
                                <TextArea
                                  onClick={(e)=>e.stopPropagation()}
                                readOnly={`${generate}`}
                                autoSize={{ minRows: 3, maxRows: 15 }}
                                    style={{
                                        
                                        height:"200px",
                                        color: textColor,
                                        border: "none",
                                        resize:"none",
                                        fontSize:"16px",
                                        
                                    }}
                                    value={item.aboutDescription} className='custom-textarea'
                                    onChange={(e)=>onAboutChange(index,"aboutDescription",e.target.value)}/>
                            </div>
                        </motion.div>
                    ))
                }
            </div>

           </div>
        </div>
    )
}

export default About
