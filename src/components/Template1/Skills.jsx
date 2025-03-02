import React, { useEffect, useState,useMemo} from "react";
import { Popover, Input, Button, message } from "antd";
import * as FaIcons from "react-icons/fa";
import { motion } from "framer-motion";
import axiosInstanse from "../../../axiousInstance";
import { PlusCircleFilled } from "@ant-design/icons";
import EditComponent from "./EditComponent";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Skills = ({ skills, setSkills, generate }) => {
  console.log("skills only", skills)
  // Convert all FontAwesome icons into an array
  const iconList = Object.keys(FaIcons).map((icon) => ({
    name: icon,
    component: FaIcons[icon],
  }));
  useEffect(() => {
    setSkillIcons(skills)
  }, [])
  // use states
  const [skillIcons, setSkillIcons] = useState(skills);
  const [editAccess, setEditAccess] = useState(false)
  const [editPopver, setEditPopover] = useState(false)

  const [bgcolor,setbgColor]=useState("black")
  const [textColor,setTextColor]=useState("white")
  const [borderColor,setBorderColor]=useState("")
  
  const [styles,setStyles]=useState()

  // use query

  const {data:skillStyles,isLoading}=useQuery({
    queryKey:["skillsStyles"],
    queryFn:async()=>{
      const response=await axiosInstanse.get("product/getSkills")
      console.log(response.data.data)
      setStyles(response.data.data)
      setbgColor(styles.bgColor)
      setBorderColor(styles.borderColor)
      setTextColor(styles.textColor)
      return response.data.data

    },
    refetchOnWindowFocus:false
  })

  const containerStyle = useMemo(() => ({
    backgroundColor: bgcolor,
    color: textColor,
    border: borderColor ? `1px solid ${borderColor}` : "none",
  }), [bgcolor, textColor, borderColor]);
  

  console.log("edit access", editAccess)

  console.log("skills", skillIcons)
  const IconPicker = ({ onSelect }) => {
    const [search, setSearch] = useState("");

    const filteredIcons = iconList.filter((icon) =>
      icon.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div style={{ width: 300, maxHeight: 250, overflowY: "scroll", padding: 10, }}>
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
                onClick={generate ? undefined : () => onSelect(icon.name)}
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

  const handleAddIcons = async () => {
    if (Object.entries(skillIcons).length == 0) {
      message.error("No Icons to Add")
      return
    }

    const response = await axiosInstanse.post("product/addSkillsIcons", skillIcons)
  }

  const handleInputChange=(index,type,e)=>{
    e.stopPropagation()
    setSkills(index,type,e.target.value)
  }
  return (
    <div id="skills" className="mt-20">
      <h1 className="text-3xl font-bold mb-10">Skills</h1>
    <div className={` ${editAccess ? "editableAccess" : ""}`}>
    <div
      style={containerStyle}
       className={`grid relative p-6  rounded-lg sm:grid-cols-3 grid-cols-2 gap-4
         items-center justify-center`}
        onClick={generate ? undefined : ()=>setEditAccess((prev)=>!prev)}
      >
        {
          editAccess ? <div onClick={(e) => e.stopPropagation()} className="absolute right-[-2px] cursor-pointer ">
            <Popover
            arrow={false}
            trigger="click"
            
              open={editPopver}
              onOpenChange={() => setEditPopover((prev) => !prev)}
              content={<EditComponent bgcolor={bgcolor} textColor={textColor} borderColor={borderColor}
                 setBorderColor={setBorderColor } setTextColor={setTextColor}
               setbgColor={setbgColor}/>}
              placement="left" 

            >
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditPopover(true);
                }}
                className="rounded-full bg-gray-700 sm:h-[50px] sm:w-[50px] h-[35px] w-[35px] absolute sm:right-[-40px] right-[-15px]"
              >
                <PlusCircleFilled className="text-2xl text-blue-600" />
              </Button>
            </Popover>

          </div> : ""
        }
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
              <Popover
                content={<IconPicker onSelect={(icon) => handleIconSelect(item.name, icon)} />}
                trigger="click"
              >
                <div className="sm:w-[130px] sm:h-[130px] max-sm:h-[90px] max-sm:w-[90px] flex justify-center items-center rounded-full bg-white mb-5 bg-opacity-10 cursor-pointer">
                  {SelectIcon ? <SelectIcon size={50} /> : "🔧"}
                </div>
              </Popover>

              <div className="text-center">
                <Input
                  readOnly={generate}
                  value={item.name}
                  onClick={(e)=>e.stopPropagation()}
                  onChange={(e)=>handleInputChange(index,"name",e)}
                  style={{
                    backgroundColor: "transparent",
                    color: textColor,
                    border: "none",
                    textAlign: "center",
                  }}
                />
              </div>
            </motion.div>
          )
        })}

        {
          generate ? "" : <div className="w-full absolute">
            <Button onClick={handleAddIcons} className="sm:top-[240px] w-[100px] sm:left-[45%] top-[330px] left-[35%]" type="primary">Save</Button>
          </div>
        }
      </div>

    </div>
    </div>
  );
};

export default Skills;
