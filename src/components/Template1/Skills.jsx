import React, { useEffect, useState } from "react";
import { Popover, Input,Button, message } from "antd";
import * as FaIcons from "react-icons/fa";
import { motion } from "framer-motion";
import axiosInstanse from "../../../axiousInstance";

const Skills = ({ skills,setSkills }) => {
  console.log("skills only", skills)
  // Convert all FontAwesome icons into an array
  const iconList = Object.keys(FaIcons).map((icon) => ({
    name: icon,
    component: FaIcons[icon],
  }));
  useEffect(()=>{
    setSkillIcons(skills)
  },[])
  // State to track selected icons for each skill
  const [skillIcons, setSkillIcons] = useState(skills);
  console.log("skills",skillIcons)  
  // Icon Picker Component
  const IconPicker = ({ onSelect }) => {
    const [search, setSearch] = useState("");

    // Filter icons based on search input
    const filteredIcons = iconList.filter((icon) =>
      icon.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div style={{ width: 300, maxHeight: 250, overflowY: "scroll", padding: 10 }}>
        <Input
          placeholder="Search icon..."

          onChange={(e) => setSearch(e.target.value)}
          allowClear
        />
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: 10 }}>
          {filteredIcons.map((icon) => {
            const IconComponent = icon.component;
            return (
              <div
                key={icon.name}
                style={{
                  padding: 8,
                  cursor: "pointer",
                  borderRadius: "8px",
                  margin: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => onSelect(icon.name)}
              >
                <IconComponent size={24} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Handle icon selection for a skill
  const handleIconSelect = (skill, icon) => {
    setSkillIcons((prev) => ({ ...prev, [skill]: icon }));
    console.log("hhh", skill)
  };
  console.log("skill icons", skillIcons)

  const handleAddIcons=async()=>{
    if(Object.entries(skillIcons).length==0){
      message.error("No Icons to Add")
      return
    }

    const response=await axiosInstanse.post("product/addSkillsIcons",skillIcons)
  }
  return (
    <div id="skills" className="mt-20">
      <h1 className="text-3xl font-bold mb-10">Skills</h1>
      <div className="grid relative sm:grid-cols-3 grid-cols-2 gap-4 items-center justify-center">
        {skills.map((item, index) => {
          const SelectIcon = skillIcons[item.name]
          ? FaIcons[skillIcons[item.name]]
          : item.icon 
          ? FaIcons[item.icon]
          : null;
        
          return (
            <motion.div initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              key={index} className="flex relative flex-col items-center justify-center mb-5">
              {/* Popover to open icon picker */}
              <Popover
                content={<IconPicker onSelect={(icon) => handleIconSelect(item.name, icon)} />}
                trigger="click"
              >
                {/* Clickable circular div */}
                <div className="w-[130px] h-[130px] flex justify-center items-center rounded-full bg-white mb-5 bg-opacity-10 cursor-pointer">
                  {SelectIcon ? <SelectIcon size={44} /> : "🔧"}
                </div>
              </Popover>

              {/* Skill name input */}
              <div className="text-center">
                <Input

                  value={item.name}
                  onChange={(e)=>setSkills(index,"name",e.target.value)}
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                    border: "none",
                    textAlign: "center",
                  }}
                />
              </div>
            </motion.div>
          )
        })}

        <div className="w-full absolute">
          <Button onClick={handleAddIcons} className="sm:top-[240px] w-[100px] sm:left-[45%] top-[330px] left-[35%]" type="primary">Save</Button>
        </div>
      </div>

    </div>
  );
};

export default Skills;
