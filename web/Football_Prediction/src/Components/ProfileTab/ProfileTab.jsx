import React, { useState, useContext } from "react";
import { Tabs, Tab, Box, Stack } from "@mui/material";
import { Person, Lock, LocationOn, Notifications } from "@mui/icons-material";
import ThemeContext from "../../context/ThemContext";

const tabData = [
  { label: "Overview", icon: <Person fontSize="small" /> },
  { label: "Security", icon: <Lock fontSize="small" /> },
  { label: "Address & Billing", icon: <LocationOn fontSize="small" /> },
  { label: "Notifications", icon: <Notifications fontSize="small" /> },
];

const ProfileTabs = ({ onTabChange }) => {
  const { theme } = useContext(ThemeContext);
  const [selectedTab, setSelectedTab] = useState(0);
  const [hoveredTab, setHoveredTab] = useState(null);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    onTabChange(newValue);
  };

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: theme.palette.divider,
        width: "100%",
      }}
    >
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="Profile Tabs"
        TabIndicatorProps={{
          sx: { backgroundColor: "transparent" },
        }}
      >
        {tabData.map((tab, index) => (
          <Tab
            key={index}
            label={
              <Stack direction="row" alignItems="center" spacing={2}>
                {tab.icon}
                <span>{tab.label}</span>
              </Stack>
            }
            onMouseEnter={() => setHoveredTab(index)}
            onMouseLeave={() => setHoveredTab(null)}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "16px",
              backgroundColor:
                selectedTab === index
                  ? theme.palette.primary.default
                  : hoveredTab === index
                  ? theme.palette.primary.light
                  : "transparent",
              color:
                selectedTab === index
                  ? theme.palette.primary.primary
                  : hoveredTab === index
                  ? "black"
                  : theme.palette.text.primary,
              borderRadius: 2,
              height: "30px",
              padding: "8px 24px",
              margin: "0px 5px",
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.main,
              },
              "&.Mui-selected": {
                color: "black",
              },

              "&:focus": {
                outline: "none",
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default ProfileTabs;
