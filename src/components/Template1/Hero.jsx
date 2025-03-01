import { UploadOutlined,LoadingOutlined } from '@ant-design/icons';
import { Input, Upload,Spin} from 'antd';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axiosInstanse from '../../../axiousInstance';
import { useQuery } from '@tanstack/react-query';


const Hero = ({ name, profession, setName, setProfession }) => {
  
  const [imageUrl, setImageUrl] = useState(null);
  const [loading,setLoading]=useState(false)
  console.log("image url",imageUrl)
  const {data:imageUrlCloud,isLoading}=useQuery({
    queryKey:["imageUrlCloud"],
    queryFn:async()=>{
      const response=await axiosInstanse.get("/product/getImage")
      if(response.data.success){
        setImageUrl(response.data.imageUrl.imageUrl)

      }
      else{
        setImageUrl(null)
      }
      return response.data.imageUrl
    },
    
  })
  const handleUpload = async ({ file }) => {
    if (!file) {
        console.error("No file selected");
        return;
    }

    console.log("Selected file:", file); // Debugging

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true)
    console.log("Form data before sending:", [...formData.entries()]); // Check if file is appended

    try {
        const response = await axiosInstanse.post("/product/upload/images", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.success) {
            console.log("Upload successful:", response.data.imageUrl);
            setLoading(false)
            setImageUrl(response.data.imageUrl);
        } else {
            // console.error("Upload failed:", response.data.message);
        }
    } catch (error) {
        console.error("Error uploading file:", error);
    }
};



  return (
    <div className='sm:mt-[70px] overflow-x:hidden mb-[150px] bg-black mt-[10px] overflow-x-hidden' id='home'>
      <div className='text-white font-bold flex items-center sm:flex-row max-sm:gap-10 flex-col'>
        {/* Left side */}
        <motion.div className='max-sm:order-2'>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='text-6xl sm:mb-10 mb-5 max-sm:text-5xl input-editable'
          />
          <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <Input
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              style={{ color: 'blue' }}
              className='sm:text-6xl max-sm:text-3xl input-editable'
            />
          </motion.div>
        </motion.div>

        {/* Right side - Upload */}
        <div className='max-sm:order-1'>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className='sm:h-[400px] sm:w-[400px] h-[280px] w-[280px] text-center flex items-center bg-white sm:rounded-full rounded-lg bg-opacity-10'
          >
            
           {
            loading ? (  <Spin className='relative sm:left-[170px] max-sm:left-[110px]' indicator={<LoadingOutlined style={{ fontSize: 60, color: 'blue' }} spin />} />)
            : imageUrl ?(
              <img src={imageUrl}  alt="uploaded" className='rounded-full w-full h-full object-cover' />
            ):
            (
              <Upload showUploadList={false} customRequest={handleUpload} className='w-full text-center'>
              <UploadOutlined className='text-3xl text-white' />
            </Upload>
            )
           }
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
