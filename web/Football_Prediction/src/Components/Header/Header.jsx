import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  InputBase,
  Badge,
  Switch,
  FormControlLabel,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Popover,
} from "@mui/material";
import {
  Search,
  NightlightRound,
  Notifications,
  AccountCircle,
  Settings,
  AttachMoney,
  HelpOutline,
  ExitToApp,
  LightModeOutlined,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import ThemeContext from "../../context/ThemContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {} from "@fortawesome/free-solid-svg-icons";

// Styled Search Bar
const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.background.default,
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: "100%",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
}));

const SearchIconWrapper = styled(Search)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const InputField = styled(InputBase)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  flex: 1,
  color: theme.palette.text.primary,
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState(5);
  const navigate = useNavigate(); // Navigate on click
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log(theme.palette.mode);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleNotificationClick = () => setNotifications(0);

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100, // Ensures it's above other components
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
        padding: "10px 20px",
        marginBottom: "10px",
        borderRadius: "10px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Search Bar */}
        <SearchContainer>
          <SearchIconWrapper />
          <InputField
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </SearchContainer>

        {/* Icons and User Profile */}
        <Box
          sx={{
            minWidth: "250px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* Dark Mode Toggle */}
          <FormControlLabel
            sx={{
              marginBottom: "0",
              marginRight: "0",
            }}
            control={<Switch onChange={toggleTheme} />}
            label={
              theme.palette.mode === "light" ? (
                <NightlightRound
                  sx={{ color: theme.palette.text.primary, marginBottom: "0" }}
                />
              ) : (
                <LightModeOutlined
                  sx={{ color: theme.palette.primary.default }}
                />
              )
            }
          />

          {/* Notification Icon */}
          <IconButton onClick={handleNotificationClick}>
            <Badge badgeContent={notifications} color="error">
              <Notifications sx={{ color: theme.palette.text.primary }} />
            </Badge>
          </IconButton>

          {/* Profile Avatar */}
          <IconButton onClick={handleMenuOpen}>
            <Avatar alt="User Name" src="/profile.jpg" />
          </IconButton>

          {/* Profile Dropdown */}
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Box
              sx={{
                width: 250,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                padding: 2,
              }}
            >
              {/* User Info */}
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
              >
                <Avatar
                  alt="User Name"
                  src="/profile.jpg"
                  sx={{ marginRight: 2 }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    User Name
                  </Typography>
                  <Typography sx={{ color: theme.palette.text.primary }}>
                    user@example.com
                  </Typography>
                </Box>
              </Box>

              {/* Profile Menu Items */}
              <MenuItem
                sx={{ color: theme.palette.text.primary }}
                onClick={handleMenuClose}
              >
                <AccountCircle sx={{ marginRight: 2 }} /> My Profile
              </MenuItem>
              <MenuItem
                sx={{ color: theme.palette.text.primary }}
                onClick={handleMenuClose}
              >
                <Settings sx={{ marginRight: 2 }} /> Settings
              </MenuItem>
              <MenuItem
                sx={{ color: theme.palette.text.primary }}
                onClick={handleMenuClose}
              >
                <AttachMoney sx={{ marginRight: 2 }} /> Pricing
              </MenuItem>
              <MenuItem
                sx={{ color: theme.palette.text.primary }}
                onClick={handleMenuClose}
              >
                <HelpOutline sx={{ marginRight: 2 }} /> FAQ
              </MenuItem>
              <MenuItem
                sx={{
                  color: "#fff",
                  backgroundColor: theme.palette.secondary.main,
                  "&:hover": { backgroundColor: theme.palette.secondary.dark },
                }}
                onClick={() => navigate("/login")}
              >
                <ExitToApp sx={{ marginRight: 2 }} /> Logout
              </MenuItem>
            </Box>
          </Popover>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Header;
