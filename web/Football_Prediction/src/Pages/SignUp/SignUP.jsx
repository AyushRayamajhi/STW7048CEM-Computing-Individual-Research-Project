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
import { Twitter, GitHub, Google, Facebook } from "@mui/icons-material";
import ThemeContext from "../../context/ThemContext";

const SignUpPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <Box
      sx={{
        height: "80vh",
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
          height: "680px",
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
          Adventure starts here 🚀
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 3, color: theme.palette.text.secondary }}
        >
          Make your app management easy and fun!
        </Typography>

        {/* Username Input */}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: theme.palette.primary.main },
            },
          }}
        />

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

        {/* Privacy Policy Agreement */}
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              sx={{ color: theme.palette.primary.main }}
            />
          }
          label={
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              I agree to the{" "}
              <Link href="#" sx={{ color: theme.palette.primary.main }}>
                privacy policy & terms
              </Link>
            </Typography>
          }
          sx={{ mb: 2 }}
        />

        {/* Sign-Up Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.paper,
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
        >
          Sign Up
        </Button>

        {/* Already have an account? */}
        <Typography sx={{ mt: 2, color: theme.palette.text.secondary }}>
          Already have an account?{" "}
          <Link href="#" sx={{ color: theme.palette.primary.main }}>
            Sign in instead
          </Link>
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
            Or
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

export default SignUpPage;
