import { create } from "zustand";

const useAuthStore=create((set)=>({
    token:null,
    email:null,
    name:null,
    setToken:(newToken)=>{
        set({token:newToken})
        localStorage.setItem("token",newToken)
    },
    setName:(newName)=>{
        set({name:newName})
        localStorage.setItem("name",newName)
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