import React from "react";
import Sidebar from "../../Components/SideNavbar/SideNavbar";
import CustomerHeader from "../../Components/CustomerHeader/CustomerHeader";
import ProfileCard from "../../Components/CustomerProfileCard/CustomerProfileCard";
import ProfileTabs from "../../Components/ProfileTab/ProfileTab";
import Profile from "../../Components/ProfileTab/Profile";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

const CustomerDetailPage = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="MainPage">
          <CustomerHeader
            customer={{
              id: "879861",
              joinedDate: "2020-08-17T05:48:00",
            }}
          />
          <div className="CustomerHeader">
            <ProfileCard />
            <Profile />
          </div>
        </div>
      </ThemeProvider>

      {/* <Test /> */}
    </>
  );
};

export default CustomerDetailPage;
