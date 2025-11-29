import React, { createContext, useState } from "react";

const NavContext = createContext();

export const NavProvider = ({ children }) => {
  // State for keeping track of open menus
  const [openMenus, setOpenMenus] = useState({});

  // Toggle submenu state (No localStorage)
  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <NavContext.Provider value={{ openMenus, toggleMenu }}>
      {children}
    </NavContext.Provider>
  );
};

export default NavContext;
