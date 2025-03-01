import { Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { motion } from 'framer-motion'

const About = ({ about, onAboutChange }) => {
    return (
        <div className='overflow-x:hidden mt-10 mb-[40px]' id='about'>
            <h1 className='text-3xl font-bold'>About</h1>
            <div style={{}}
            className='flex max-sm:flex-col overflow-x:hidden items-center sm:p-10 sm:bg-gray-700 rounded-lg  mt-10 justify-around gap-[80px] '>
                {
                    about.map((item, index) => (
                        <motion.div 
                        style={{border:"1px solid white"}}
                        initial={{ opacity: 0, x: 20 }} 
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{duration:0.8}}
                        key={index} className='about-form-page bg-gray-900   rounded-lg p-5 sm:w-[400px]'>
                            <div>
                                <Input style={{textAlign:"center",color:"blue",fontSize:"20px"}}
                                value={item.aboutHead} className='text-xl font-bold txt-blue-300' 
                                onChange={(e)=>onAboutChange(index,"aboutHead",e.target.value)}/>
                            </div>
                            <div >
                                <TextArea
                                autoSize={{ minRows: 3, maxRows: 15 }}
                                    style={{
                                        
                                        height:"200px",
                                        color: "white",
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
    )
}

export default About
