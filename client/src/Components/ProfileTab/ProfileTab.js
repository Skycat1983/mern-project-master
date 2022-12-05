import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TabScrollButton } from "@mui/material";
import "./ProfileTab.css";

function ProfileTab() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box className="profile-tab" sx={{ maxWidth: { xs: 255, sm: 200 } }}>
      <Tabs
        TabIndicatorProps={{ style: { backgroundColor: "green" } }}
        onChange={handleChange}
        value={value}
        // aria-label="Tabs where selection follows focus"
        // selectionFollowsFocus
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {/* <TabScrollButton direction="left" /> */}

        <Tab className="my-tab" label="about" style={{ minWidth: "50%" }} />
        <Tab className="my-tab" label="plants" style={{ minWidth: "50%" }} />
        <Tab className="my-tab" label="reviews" style={{ minWidth: "50%" }} />
        <Tab className="my-tab" label="account" style={{ minWidth: "50%" }} />
      </Tabs>
    </Box>
  );
}

export default ProfileTab;
