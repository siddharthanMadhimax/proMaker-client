import React, { useEffect, useState } from 'react'
import { LoginImg } from '../assets'
import Spline from "@splinetool/react-spline";
import { Form, Input, Button, message } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
const Login = ({ isAuth, checkAuth }) => {

    const navigate = useNavigate()
    const backendUrl = import.meta.env.VITE_BACKEND_URL_AUTH
    const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;
    console.log("url", backendUrl)
    const setToken = useAuthStore((state) => state.setToken)

    const [messageRes, setMessageRes] = useState("")
    const form = useForm()
    const [signing, setSigning] = useState("signin")
    const onFinish = async (values) => {
        const endpoint = signing == "signUp" ? "signup" : "signin"
        setMessageRes("")
        console.log("values", values)
        const response = await axios.post(`${backendUrl}/auth/${endpoint}`, values)
        console.log(response.data.message)
        if (response.data.message == "password is weak please enter more than 8 character") {
            setMessageRes(response.data.message)
            console.log("dd", messageRes)
        }
        if (response.data.message == "success") {
            message.success("success")
        }
        if (response.data.success == false) {
            message.error(response.data.message)
        }
        const { token } = response.data
        console.log('token', token)
        setToken(token)
        isAuth(!!token)
        if (response.data.isEnter) {
            navigate("/form")
        }
    }

    const handleGoogleEnter=async(credentialResponse)=>{
        console.log("cre",credentialResponse)
        try{
            const response=await axios.post(`${backendUrl}/auth/google`,{
                token:credentialResponse.credential
            })
            if(response.data.success){
                message.success("success")
                const {token}=response.data
                setToken(token)
                isAuth(!!token)
                navigate("/form")
            }
            else{
                message.error("failed")
            }

        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className='bg-black w-full h-screen overflow-hidden relative'>
            <Spline className='max-sm:hidden'
                scene="https://prod.spline.design/T5pKfwFIvAhA417u/scene.splinecode"
            />
            <div className='absolute sm:w-[450px] max-sm:w-[300px] z-100 bg-white top-[90px] max-sm:top-[20px] left-[400px] max-sm:left-[10px] p-10 rounded-xl bg-opacity-15 '>
                <Form layout='vertical' className='form-page' onFinish={onFinish}>
                    <div>
                        <h1 className='text-white mb-5 font-bold text-3xl'><span className='text-4xl'>W</span>elcome!</h1>
                    </div>
                    {
                        signing == "signUp" ? <div className=''>
                            <Form.Item name="name" >
                                <Input placeholder='Enter your Name' />
                            </Form.Item>
                        </div> : ""
                    }
                    <div>
                        <Form.Item name="email" >
                            <Input placeholder='Enter you Email' />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item name="password">
                            <Input.Password placeholder='Enter your Password' />
                        </Form.Item>
                        <p className='text-white mb-2'>{messageRes}</p>
                    </div>
                    {
                        signing == "signUp" ? <div className='w-full '>
                            <Button className='sign-in-btn text-lg' htmlType='submit' onClick={onFinish}>Sign up</Button>

                        </div> : <div className='w-full '>
                            <Button className='sign-in-btn text-lg' htmlType='submit' onClick={onFinish}>Sign in</Button>
                        </div>
                    }
                </Form>


                <div className='flex items-center max-sm:flex-col   sm:gap-14'>

                    <div className=' text-center max-sm:full  '>
                    <GoogleOAuthProvider clientId={clientId} >
                        <GoogleLogin className="h-[10px]" onSuccess={handleGoogleEnter}  onError={()=>message.error("google sign-in failed")}/>
                    </GoogleOAuthProvider>
                    </div>
                    <div className='relative text-blue-500 text-lg w-[full] min-w-[100px]  font-bold underline max-sm:hidden'>
                        {
                            signing == "signUp" ? <p className='signupPage' onClick={() => setSigning("signin")}>Sign in</p> :

                                <p className='signupPage' onClick={() => setSigning("signUp")}>Sign up</p>
                        }
                    </div>
                    <div className='relative text-white   mt-2 max-sm:w-full  sm:hidden'>
                        <p>dont't have account</p>
                        {
                            signing == "signUp" ? <p className='text-lg text-blue-500 font-bold underline signupPage' onClick={() => setSigning("signin")}>Sign in</p>
                                : <p className='text-lg text-blue-500 font-bold underline signupPage' onClick={() => setSigning("signUp")}>Sign up</p>
                        }
                    </div>
                </div>
            </div>

            <div className='absolute z-100 top-[495px] right-[20px] w-[200px] bg-black h-[80px]'>

            </div>
        </div>
    )
}

export default Login