import { DatePicker, Form, Input, Modal,Button, message,Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { PlusOutlined,MinusCircleOutlined,MenuOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'
import { motion } from 'framer-motion'
import axiosInstanse from '../../axiousInstance'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
const FormData = ({setIsAuth}) => {
    const navigate=useNavigate()
    const [openPop,setOpenPop]=useState(false)
    const username=localStorage.getItem("name")
    const {data:checkForm,isLoading}=useQuery({
        queryKey:["checkForm"],
        queryFn:async()=>{
            const response=await axiosInstanse.get("/product/checkForm")
            if(response.data.success){
                navigate(`/${username}/selectTemplate`)
            }
            return response.data
        }
    })
   
    const onFinish=async(values)=>{
        console.log("all values",values)
        const response=await axiosInstanse.post('/product/addForm',values)
        if(response.data.success){
            message.success("success")
            form.resetFields()
            navigate(`/${username}/selectTemplate`)
        }
        
    }
    const [form]=useForm()
   
    const [showSubmitBtn,setshowSubmitBtn]=useState(false)
    useEffect(()=>{
        const interval=setTimeout(()=>{
            message.warning("please fill all details then only the submit button will appear")
        },[2000])

        return ()=>clearInterval(interval)
    },[])

    const handleFormChange=()=>{
        const values=form.getFieldsValue()
        const isComplete=values.name && values.proffesion && values.skills &&
        values.contacts?.github && values.contacts ?.linkedIn && values.contacts ?.contactNumber &&
        // values.projects?.length > 0 && values.projects.every(proj => proj.projectName && proj.ProjectLink && proj.projectDetails);
        values.projects?.length > 0 && values.projects.every(proj=>proj.projectName && proj.projectLink && proj.projectDetails) &&
        values.education?.length > 0 && values.education.every(edu=>edu.std && edu.description && edu.mark)
        if(isComplete){
            setshowSubmitBtn(true)
        }
    }
    const handleLogout=()=>{
        localStorage.removeItem("token")
        setIsAuth(false)
        navigate("/")
      }
  return (
    <>

    <div className='w-full  bg-black flex justify-center item-center'>
    <Popover
      trigger="click"
      arrow={false}
      placement="bottom"
      open={openPop}
      color="black"
      className="custom-popover"
      onOpenChange={(visible) => setOpenPop(visible)}
      content={
        <div className="text-white p-2 sm:bg-white bg-opacity-10 sm:right-[10px] sm:top-[10px] rounded-lg p-5 relative ">
          <h1 onClick={handleLogout} className="cursor-pointer">Logout</h1>
        </div>
      }
    >
      <div className="text-white w-full sm:left-[1200px] max-sm:left-[270px] h-[30px] fixed p-4 max-sm:bg-10 cursor-pointer">
        <MenuOutlined onClick={() => setOpenPop(!openPop)} className="text-xl"  />
      </div>
    </Popover>
        <div className='bg-white   bg-opacity-10 rounded-lg  w-[500px] p-10 max-sm:mt-[50px] mt-5 mb-5'>
            <Form layout='vertical' form={form} className='form-page'
             onFinish={onFinish} onValuesChange={handleFormChange}>
                <div >
                <Form.Item name="name" label="Name">
                    <Input placeholder='Enter your name'/>
                </Form.Item>
                </div>
                <div >
                <Form.Item name="proffesion" label="Your Profession">
                    <Input placeholder= "I'M full stack developer"/>
                </Form.Item>
                </div>
                <h1 className='font-bold text-lg mb-4 text-white'>About</h1>
                <Form.List name="aboutMe">
                    {(fields,{add,remove})=>(
                        <>
                        {fields.map((key,name,...restFields)=>(
                          <div>
                              <div key={key} className='flex w-full gap-5 item-center justify-center'>
                                <div className='w-[80%]'>
                                <Form.Item name={[name,"aboutHead"]} {...restFields}>
                                    <Input placeholder='Eg-Frontend'/>
                                </Form.Item>
                               
                                </div>
                                <div className='bg-white max-sm:w-[30px] max-sm:h-[30px] h-[40px] w-[70px] flex item-center justify-center bg-opacity-10 rounded-xl max-sm:rounded-full mb-4 relative max-sm:top-[6px]' >
                                <MinusCircleOutlined className='text-red-500' onClick={()=>remove(name)}/>
                                </div>
                            </div>
                            <Form.Item name={[name,"aboutDescription"]} {...restFields}>
                                    <Input placeholder='About you eg.im a frontend developer create responsive website'/>
                                </Form.Item>
                          </div>
                        ))}
                        <Button icon={<PlusOutlined/>} type='primary' className='mb-4 w-full' onClick={()=>add()}>Add</Button>
                        </>
                    )}
                </Form.List>
                <div>

                </div>
                <h1 className='text-white text-lg font-bold mb-4'>Education</h1>
                <Form.List name="education">
                    {(fields,{add,remove})=>(
                        <>
                        {fields.map(({key,name,...restFields})=>(
                           <div key={key}
                           >
                            <div key={key} className='flex item-center sm:gap-4 max-sm:flex-col education-data'>
                               
                            <Form.Item {...restFields}
                                name={[name,"std"]}>
                                    <Input placeholder='Enter school or degree'/>
                                </Form.Item>
                            <Form.Item {...restFields} name={[name,"mark"]}>
                                   <Input placeholder='Enter Percentage'/>
                               </Form.Item>
                              <div onClick={()=>remove(name)} className='bg-white max-sm:w-[30px] max-sm:w-full max-sm:mb-5 max-sm:h-[30px] h-[40px] w-[70px] flex item-center justify-center bg-opacity-10 rounded-xl max-sm:rounded-full'>
                              <MinusCircleOutlined className='text-red-500 ' />
                              </div>
                           </div>
                            <Form.Item name={[name,"description"]} {...restFields}>
                                <Input placeholder='Education description eg:i have completed my 12th in 2024 at global school'/>
                            </Form.Item>
                             
                           </div>
                        ))}
                        <Button type='primary' className='mt-4' icon={<PlusOutlined/>} onClick={()=>add()}>
                            Add Education
                        </Button>
                        </>
                    )}
                </Form.List>
                <h1 className='text-white mt-4 font-bold text-lg mb-4'>Technical Skills</h1>
                <div className='skills-enter'>
              
                    <Form.Item name="skills">
                        <Input style={{border:'none',outline:"none"}} className='input-skill' placeholder='Enter your skill eg:Html,Css' />
                    </Form.Item>
               
                </div>
                <h1 className='text-lg text-white font-bold '>Contacts</h1>
                <div className='mt-5'>
                    <Form.Item name={["contacts","github"]}>
                        <Input placeholder='github link'/>
                    </Form.Item>
                    <Form.Item name={["contacts","linkedIn"]}>
                        <Input placeholder='Linkedin link'/>
                    </Form.Item>
                    <Form.Item name={["contacts","contactNumber"]}>
                        <Input placeholder='Contact Number'/>
                    </Form.Item>
                </div>
                <h1 className='mb-5 text-white font-bold text-lg'>Projects</h1>
                <div>
              <Form.List name="projects">
                {(fields,{remove,add})=>(
                    <>
                    {fields.map(({key,name,...restFields})=>(
                       <div>
                        <div key={key} className='flex item-center gap-5 justify-center'>
                         <Form.Item {...restFields}
                        name={[name,"projectName"]}
                        >
                            <Input placeholder='Project Name'/>
                        </Form.Item>
                         <Form.Item {...restFields}
                        name={[name,"projectLink"]}
                        >
                            <Input placeholder='Project Link'/>
                        </Form.Item>
                       <div className='flex item-center justify-center rounded-full bg-white bg-opacity-10 h-[40px] w-[40px]'>
                       <MinusCircleOutlined className='text-red-500 text-lg'
                         onClick={()=>remove(name)}/>
                       </div>
                       </div>
                       <div>
                        <Form.Item {...restFields} name={[name,"projectDetails"]}>
                            <Input placeholder='Project description'/>
                        </Form.Item>
                       </div>
                       </div>
                        
                    ))}
                    <Button type='primary' icon={<PlusOutlined/>} onClick={()=>add()}>
                        Add Project
                    </Button>
                    </>
                )}
              </Form.List>
                </div>
                {
                    showSubmitBtn && <motion.div
                    initial={{opacity:0,y:100}} animate={{opacity:1,y:0}}
                    transition={{duration:0.5}}
                     className='w-full relative max-sm:left-[-10%] left-[20%] max-sm:p-10  mt-10'>
                    <Button htmlType='submit' className='form-submit-btn' type='primary'>Submit</Button>
                </motion.div>
                }
            </Form>
        </div>
    </div>
    </>
  )
}

export default FormData