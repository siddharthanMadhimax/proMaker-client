import { Button } from 'antd';
import axios from 'axios';
import React from 'react';
import axiosInstanse from '../../../axiousInstance';

const EditComponent = ({ setbgColor, setTextColor, setBorderColor, bgcolor, textColor, borderColor }) => {

  const handleStylesAdd=async()=>{
    const response=await axiosInstanse.post("product/editStyles",
      {
        styles:{
          bgColor:bgcolor,
          textColor:textColor,
          borderColor:borderColor
        }
      }
      
    )
    console.log(response)
  }
  return (
    <div className="flex bg-gray-700 rounded-lg flex-col items-center  gap-5 p-2">
      {/* Background Color Picker */}
      <div 
        className="relative w-7 h-7 rounded-full border-2 shadow-lg cursor-pointer"
        style={{ backgroundColor: bgcolor, borderColor: bgcolor }}
      >
        <input
          type="color"
          value={bgcolor}
          onChange={(e) => setbgColor(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Text Color Picker */}
      <div 
        className="relative w-7 h-7 rounded-full border-2 shadow-lg cursor-pointer"
        style={{ backgroundColor: textColor, borderColor: textColor }}
      >
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Border Color Picker */}
      <div 
        className="relative w-7 h-7 rounded-full border-2 shadow-lg cursor-pointer"
        style={{ backgroundColor: borderColor, borderColor: borderColor }}
      >
        <input
          type="color"
          value={borderColor}
          onChange={(e) => setBorderColor(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <div>
        <Button onClick={handleStylesAdd} type='primary'>save</Button>
      </div>
    </div>
  );
};

export default EditComponent;
