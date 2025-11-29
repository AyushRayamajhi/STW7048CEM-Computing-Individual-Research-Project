import React, { useState, useContext } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ThemeContext from "../../context/ThemContext";

const EditUserModal = ({ open, handleClose, user }) => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({ ...user });

  // Input Fields (Dynamic)
  const inputFields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "username", label: "User Name", type: "text" },
    { name: "email", label: "Billing Email", type: "email" },
    { name: "taxId", label: "Tax ID", type: "text" },
    { name: "contact", label: "Contact", type: "text" },
  ];

  const dropdownFields = [
    {
      name: "status",
      label: "Status",
      options: ["Active", "Inactive", "Pending"],
    },
    {
      name: "language",
      label: "Language",
      options: ["English", "Spanish", "French"],
    },
    {
      name: "country",
      label: "Country",
      options: ["France", "Russia", "China", "UK", "US"],
    },
  ];

  // Handle Input Change
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="edit-user-modal">
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: 3,
          boxShadow: 24,
          padding: 4,
          width: "50%",
          margin: "auto",
          marginTop: "5%",
          outline: "none",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            style={{
              width: "100%",
              textAlign: "center",
              color: theme.palette.text.primary,
            }}
          >
            Edit User Information
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{ color: theme.palette.text.primary }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography
          variant="body2"
          color="textSecondary"
          style={{
            width: "100%",
            textAlign: "center",
            color: theme.palette.text.primary,
          }}
          sx={{ marginBottom: 3 }}
        >
          Updating user details will receive a privacy audit.
        </Typography>

        {/* Form Fields */}
        <Grid container spacing={2}>
          {inputFields.map((field) => (
            <Grid item xs={12} sm={6} key={field.name}>
              <TextField
                fullWidth
                variant="outlined"
                label={field.label}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: theme.palette.text.primary, // Default label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: theme.palette.primary.main, // Ensure label is orange on focus
                  },

                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.palette.text.primary, // Default border
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main, // Orange on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main, // Orange on focus
                    },
                  },
                  "& .MuiInputBase-root": {
                    color: theme.palette.text.primary,
                  },
                }}
              />
            </Grid>
          ))}

          {dropdownFields.map((field) => (
            <Grid item xs={12} sm={6} key={field.name}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel
                  sx={{
                    // color: theme.palette.text.primary, // Default label color
                    "&.Mui-focused": {
                      color: theme.palette.primary.main, // Orange label on focus
                    },
                    "&.MuiFormLabel-root": {
                      backgroundColor: theme.palette.background.paper,
                      padding: "0 5px",
                    },
                  }}
                >
                  Country
                </InputLabel>
                <Select
                  value={formData.country || ""}
                  onChange={handleChange}
                  name="country"
                  displayEmpty
                  sx={{
                    backgroundColor: theme.palette.background.paper, // Match input background
                    color: theme.palette.text.primary, // Text color
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.text.primary, // Default border color
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main, // Orange on hover
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main, // Orange on focus
                      borderWidth: "2px", // Slightly thicker border
                    },
                  }}
                >
                  {/* <MenuItem
                    disabled
                    value=""
                   
                  >
                    Select Country
                  </MenuItem> */}
                  {[
                    "Select Country",
                    "France",
                    "Russia",
                    "China",
                    "UK",
                    "US",
                  ].map((country) => (
                    <MenuItem
                      key={country}
                      value={country}
                      sx={{
                        backgroundColor: theme.palette.background.paper, // Dropdown background
                        color: theme.palette.text.primary,
                        "&:hover": {
                          backgroundColor: theme.palette.primary.light, // Hover color (like dashboard)
                          color: theme.palette.primary.default,
                        },
                        "&.Mui-selected": {
                          backgroundColor:
                            theme.palette.primary.light + " !important", // Keep hover color on selection
                          color: theme.palette.primary.default + " !important",
                        },
                        "&.MuiList-root": {
                            backgroun
                        },
                      }}
                    >
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))}
        </Grid>

        {/* Buttons - Centered */}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
          <Button
            onClick={handleClose}
            sx={{ marginRight: 2 }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button variant="contained" color="warning">
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
