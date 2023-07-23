import React, { useState } from 'react';

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  const handleChangeColor = (event) => {
    setSelectedColor(event.target.value);
  };

  return (
    <div className="flex items-center space-x-4">
      <div
        className="w-10 h-10 overflow-hidden"
        style={{ backgroundColor: selectedColor }}
      >
        <input
          type="color"
          className="w-full h-full p-0 border-none cursor-pointer appearance-none"
          value={selectedColor}
          onChange={handleChangeColor}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
