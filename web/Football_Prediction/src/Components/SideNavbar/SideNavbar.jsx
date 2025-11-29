import React, { useContext } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import {
  Dashboard,
  Pages,
  Shop,
  DirectionsCar,
  Email,
  Chat,
  CalendarToday,
  Assignment,
  People,
  Lock,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/double-logo.png";
import ThemeContext from "../../context/ThemContext";
import NavContext from "../../context/NavContext"; // Import NavContext
import BundesligaTablePro from "../BundesligaTable/BundesligaTable";

const sidebarItems = [
  { label: "Dashboards", icon: <Dashboard />, path: "/" },
  { label: "Stats Analysis", icon: <Pages />, path: "/statcompare" },
];

const Sidebar = () => {
  const location = useLocation(); // Get current location
  const navigate = useNavigate(); // Navigate on click
  const { theme } = useContext(ThemeContext);
  const { openMenus, toggleMenu } = useContext(NavContext); // Get NavContext state

  return (
    <Drawer
      sx={{
        width: "15vw",
        maxWidth: 350,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "15vw",
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.default,
          //   backgroundImage: "linear-gradient( #001027 32%, #000000 73%)",
        },
        "& .MuiPaper-root": {
          borderRight: "none",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {/* Logo Click → Redirect to Home */}
        <ListItem
          button
          onClick={() => navigate("/")}
          sx={{ justifyContent: "center", height: "80px" }}
        >
          <img src={logo} alt="logo" height={110} />
        </ListItem>

        {/* Dynamically Render Sidebar Items */}
        {sidebarItems.map((item, index) => {
          if (item.type === "divider") return <Divider key={index} />;

          return (
            <React.Fragment key={item.label}>
              {item.path ? (
                <ListItem
                  button
                  component={Link}
                  to={item.path}
                  sx={{
                    backgroundColor:
                      location.pathname === item.path
                        ? theme.palette.primary.default
                        : "transparent",
                    color: theme.palette.text.secondary,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.text.secondary,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        location.pathname === item.path
                          ? theme.palette.text.paper
                          : theme.palette.text.primary,
                      "&:hover": {
                        color: theme.palette.text.paper,
                      },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              ) : (
                <ListItem button onClick={() => toggleMenu(item.label)}>
                  <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{ color: theme.palette.text.primary }}
                  />
                  {openMenus[item.label] ? (
                    <ExpandLess sx={{ color: theme.palette.text.primary }} />
                  ) : (
                    <ExpandMore sx={{ color: theme.palette.text.primary }} />
                  )}
                </ListItem>
              )}

              {/* Submenu Items (Collapsible) */}
              {item.subItems && (
                <Collapse
                  in={openMenus[item.label]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItem
                        button
                        component={Link}
                        to={subItem.path}
                        key={subItem.label}
                        sx={{
                          pl: 4,
                          backgroundColor:
                            location.pathname === subItem.path
                              ? theme.palette.primary.default
                              : "transparent",
                          color: theme.palette.text.secondary,
                          "&:hover": {
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.text.secondary,
                          },
                        }}
                      >
                        <ListItemText primary={subItem.label} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
