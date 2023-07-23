import React from 'react';
import './index.css';
import BackDrop from '../back-drop';

const Loader = ({ visible }: { visible: boolean }) => {
  if (!visible) {
    return <></>;
  }
  return (
    <BackDrop>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="loader">
          <div className="loader_cube loader_cube--color" />
          <div className="loader_cube loader_cube--glowing" />
        </div>
      </div>
    </BackDrop>
  );
};

export default Loader;
