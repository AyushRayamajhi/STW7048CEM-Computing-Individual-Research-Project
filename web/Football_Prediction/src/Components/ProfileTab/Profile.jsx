import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import ProfileTab from "./ProfileTab";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ padding: 3, width: "62%" }}>
      <ProfileTab onTabChange={setActiveTab} />
      <Box sx={{ marginTop: 3 }}>
        {activeTab === 0 && <Typography>Overview Content</Typography>}
        {activeTab === 1 && <Typography>Security Settings</Typography>}
        {activeTab === 2 && (
          <Typography>Billing & Address Information</Typography>
        )}
        {activeTab === 3 && <Typography>Notification Preferences</Typography>}
      </Box>
    </Box>
  );
};

export default Profile;
