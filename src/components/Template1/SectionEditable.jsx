import { Button } from 'antd';
import React from 'react';
import axiosInstanse from '../../../axiousInstance';

const SectionEditable = ({ 
    sectionName,
    bgColor, setbgColor, 
    textColor, setTextColor, 
    headingColor, setHeadingColor, 
    subBgColor, setSubBgColor 
}) => {

    const handleUpdateStyles=async()=>{
        const response=await axiosInstanse.post("product/set/sectionstyles",
            {
               
                styles:{
                    headindColor:headingColor,
                    textColor:textColor,
                    bgColor:bgColor,
                    subBgColor:subBgColor,
                    sectionName:sectionName
                }
            }
        )
    }
    return (
        <div className="flex max-sm:flex-col  items-center gap-6 max-sm:4 max-sm:p-2 p-4 bg-white text-black rounded-lg shadow-lg">
            {/* Background Color Picker */}
            <div className="flex flex-col items-center">
                <div 
                    className="relative w-8 h-8 rounded-full border-2 shadow-lg cursor-pointer"
                    style={{ backgroundColor: bgColor, borderColor: "black" }}
                >
                    <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setbgColor(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
                <p className="text-xs mt-1">B</p>
            </div>

            {/* Sub-Background Color Picker */}
            <div className="flex flex-col items-center">
                <div 
                    className="relative w-8 h-8 rounded-full border-2 shadow-lg cursor-pointer"
                    style={{ backgroundColor: subBgColor, borderColor: "black" }}
                >
                    <input
                        type="color"
                        value={subBgColor}
                        onChange={(e) => setSubBgColor(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
                <p className="text-xs mt-1">SB</p>
            </div>

            {/* Text Color Picker */}
            <div className="flex flex-col items-center">
                <div 
                    className="relative w-8 h-8 rounded-full border-2 shadow-lg cursor-pointer"
                    style={{ backgroundColor: textColor, borderColor: "black" }}
                >
                    <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
                <p className="text-xs mt-1">T</p>
            </div>

            {/* Heading Color Picker */}
            <div className="flex flex-col items-center">
                <div 
                    className="relative w-8 h-8  rounded-full border-2 shadow-lg cursor-pointer"
                    style={{ backgroundColor: headingColor, borderColor: "black" }}
                >
                    <input
                        type="color"
                        value={headingColor}
                        onChange={(e) => setHeadingColor(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
                <p className="text-xs mt-1">H</p>
            </div>
            <div className='text-center relative top-[-8px]'>
                <Button type='primary' onClick={handleUpdateStyles}>Save</Button>
            </div>
        </div>
    );
};

export default SectionEditable;
