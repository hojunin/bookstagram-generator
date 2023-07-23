import React from 'react';
const BackDrop = ({ children }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      {children}
    </div>
  );
};

export default BackDrop;
