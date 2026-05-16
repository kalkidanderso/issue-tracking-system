import React, { createContext, useState } from 'react';

export const MenuWidthContext = createContext();

export const MenuWidthProvider = ({ children }) => {
  const [menuWidth, setMenuWidth] = useState(250); // Default width

  return (
    <MenuWidthContext.Provider value={{ menuWidth, setMenuWidth }}>
      {children}
    </MenuWidthContext.Provider>
  );
};