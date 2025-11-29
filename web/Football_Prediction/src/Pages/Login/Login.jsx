import React, { useState, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, NavLink } from "react-router-dom";
import { Twitter, GitHub, Google, Facebook } from "@mui/icons-material";
import ThemeContext from "../../context/ThemContext";

const LoginPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Navigate on click

  return (
    <Box
      sx={{
        height: "80vh",
        width: "80vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "40px",
          borderRadius: "10px",
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          width: "450px",
          height: "630px",
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: theme.palette.primary.main,
          }}
        >
          Nakshatra
        </Typography>

        {/* Welcome Text */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Welcome to Nakshatra
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 3, color: theme.palette.text.secondary }}
        >
          Please sign in to your account and start the adventure
        </Typography>

        {/* Email Input */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: theme.palette.primary.main },
            },
          }}
        />

        {/* Password Input */}
        <TextField
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          fullWidth
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: theme.palette.primary.main },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Remember Me & Forgot Password */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <FormControlLabel
            control={<Checkbox sx={{ color: theme.palette.primary.main }} />}
            label="Remember me"
          />
          <Link href="#" sx={{ color: theme.palette.primary.main }}>
            Forgot password?
          </Link>
        </Box>

        {/* Login Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.paper,
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
        >
          Log In
        </Button>

        {/* Signup Link */}
        <Typography sx={{ mt: 2, color: theme.palette.text.secondary }}>
          New on our platform?{" "}
          <NavLink to="/signup" sx={{ color: theme.palette.primary.main }}>
            Create an account
          </NavLink>
        </Typography>

        {/* Divider */}
        <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Box
            sx={{
              flex: 1,
              height: "1px",
              backgroundColor: theme.palette.text.disabled,
            }}
          />
          <Typography sx={{ mx: 2, color: theme.palette.text.secondary }}>
            or
          </Typography>
          <Box
            sx={{
              flex: 1,
              height: "1px",
              backgroundColor: theme.palette.text.disabled,
            }}
          />
        </Box>

        {/* Social Login Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <IconButton sx={{ color: "#1DA1F2" }}>
            <Twitter />
          </IconButton>
          <IconButton sx={{ color: "#333" }}>
            <GitHub />
          </IconButton>
          <IconButton sx={{ color: "#DB4437" }}>
            <Google />
          </IconButton>
          <IconButton sx={{ color: "#1877F2" }}>
            <Facebook />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
