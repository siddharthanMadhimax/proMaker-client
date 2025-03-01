import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { Popover } from "antd";

const EditComponent = () => {
  const [bgColor, setBgColor] = useState("#ff0000"); // Background Color
  const [textColor, setTextColor] = useState("#000000"); // Text Color
  const [borderColor, setBorderColor] = useState("#000000"); // Border Color
  const [visiblePicker, setVisiblePicker] = useState(null); // Control popover visibility

  return (
    <div className="p-5 text-center">
      <h1 className="mb-4 font-bold">Edit Component</h1>

      {/* Editable Circle with Dynamic Background */}
      <div
        className="w-[300px] h-[300px] rounded-full border mx-auto flex items-center justify-center"
        style={{ backgroundColor: bgColor, color: textColor, borderColor: borderColor, borderWidth: "2px" }}
      >
        <p className="text-xl font-bold">Sample Text</p>
      </div>

      {/* Color Picker Buttons */}
      <div className="mt-5 flex justify-center gap-5">
        
        {/* Background Color Picker */}
        <Popover
          content={
            <SketchPicker
              color={bgColor}
              onChange={(updatedColor) => setBgColor(updatedColor.hex)}
              disableAlpha
            />
          }
          trigger="click"
          open={visiblePicker === "bg"}
          onOpenChange={(open) => setVisiblePicker(open ? "bg" : null)}
        >
          <div
            className="w-10 h-10 rounded-full border-2 border-gray-400 cursor-pointer"
            style={{ backgroundColor: bgColor }}
          ></div>
        </Popover>

        {/* Text Color Picker */}
        <Popover
          content={
            <SketchPicker
              color={textColor}
              onChange={(updatedColor) => setTextColor(updatedColor.hex)}
              disableAlpha
            />
          }
          trigger="click"
          open={visiblePicker === "text"}
          onOpenChange={(open) => setVisiblePicker(open ? "text" : null)}
        >
          <div
            className="w-10 h-10 rounded-full border-2 border-gray-400 cursor-pointer"
            style={{ backgroundColor: textColor }}
          ></div>
        </Popover>

        {/* Border Color Picker */}
        <Popover
          content={
            <SketchPicker
              color={borderColor}
              onChange={(updatedColor) => setBorderColor(updatedColor.hex)}
              disableAlpha
            />
          }
          trigger="click"
          open={visiblePicker === "border"}
          onOpenChange={(open) => setVisiblePicker(open ? "border" : null)}
        >
          <div
            className="w-10 h-10 rounded-full border-2 border-gray-400 cursor-pointer"
            style={{ backgroundColor: borderColor }}
          ></div>
        </Popover>

      </div>
    </div>
  );
};

export default EditComponent;
