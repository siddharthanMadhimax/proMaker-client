import axios from "axios";


const backendUrl=import.meta.env.VITE_BACKEND_URL_AUTH

const axiosInstanse=axios.create({
    baseURL:backendUrl
})

axiosInstanse.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem("token")
        if(token){
            config.headers["Authorization"]=`Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default axiosInstanse