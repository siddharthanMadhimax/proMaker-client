import React, { useState } from "react";
import { Popover, Input } from "antd";
import * as FaIcons from "react-icons/fa";

const Skills = ({ skills }) => {
  // Convert all FontAwesome icons into an array
  const iconList = Object.keys(FaIcons).map((icon) => ({
    name: icon,
    component: FaIcons[icon],
  }));

  // State to track selected icons for each skill
  const [skillIcons, setSkillIcons] = useState({});

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
  };

  return (
    <div id="skills">
      <h1 className="text-3xl font-bold mb-10">Skills</h1>
      <div className="grid grid-cols-3 gap-4 items-center justify-center">
        {skills.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center mb-5">
            {/* Popover to open icon picker */}
            <Popover
              content={<IconPicker onSelect={(icon) => handleIconSelect(item, icon)} />}
              trigger="click"
            >
              {/* Clickable circular div */}
              <div className="w-[130px] h-[130px] flex justify-center items-center rounded-full bg-white mb-5 bg-opacity-10 cursor-pointer">
                {skillIcons[item] ? (
                  React.createElement(FaIcons[skillIcons[item]], { size: 50 })
                ) : (
                  "🔧" 
                )}
              </div>
            </Popover>

            {/* Skill name input */}
            <div className="text-center">
              <Input
                value={item}
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  border: "none",
                  textAlign: "center",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
