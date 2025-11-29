import React from "react";
import Sidebar from "../Components/SideNavbar/SideNavbar";
import Header from "../Components/Header/Header";
import HeaderPills from "../Components/Header/HeaderNew";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom"; // Renders nested routes

const Layout = () => {
  return (
    <Box>
      {/* Sidebar always present */}
      <Sidebar />

      {/* Content area */}
      <Box className="Header">
        <HeaderPills />
        <Box>
          <Outlet /> {/* This renders the page content */}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
