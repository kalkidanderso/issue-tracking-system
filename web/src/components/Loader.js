import React from 'react';
import ScaleLoader  from 'react-spinners/ScaleLoader'

function Loader() {
  return (
    <div style={{ width: '100px', margin: 'auto', display: 'block' }}>
      <ScaleLoader  color="#52bfd9" size={250}/>
    </div>
  );
};

export default Loader;