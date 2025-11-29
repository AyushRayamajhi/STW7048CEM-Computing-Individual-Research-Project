import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import ThemeContext from "../../context/ThemContext"; // Import theme context

const CustomerHeader = ({ customer }) => {
  const { theme } = useContext(ThemeContext);
  const [openDialog, setOpenDialog] = useState(false);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        borderRadius: 2,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      {/* Customer ID & Date */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textAlign: "left",
            color: theme.palette.text.primary,
          }}
        >
          Customer ID #{customer.id}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          {formatDate(customer.joinedDate)}
        </Typography>
      </Box>

      {/* Delete Customer Button */}
      <Button
        variant="outlined"
        color="error"
        onClick={() => setOpenDialog(true)}
        sx={{
          borderColor: theme.palette.error.main,
          color: theme.palette.error.main,
        }}
      >
        Delete Customer
      </Button>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          Are you sure you want to delete this customer?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => alert("Customer deleted!")} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerHeader;
