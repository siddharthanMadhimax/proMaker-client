import { create } from "zustand";

const useAuthStore=create((set)=>({
    token:null,
    email:null,
    setToken:(newToken)=>{
        set({token:newToken})
        localStorage.setItem("token",newToken)
    },
    setEmail:(newEmail)=>{
        set({email:newEmail})
    },
    clearToken:()=>{
        set({token:null})
        localStorage.removeItem('token')
    }
}))

export default useAuthStore