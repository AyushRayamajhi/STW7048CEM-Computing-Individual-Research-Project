import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  Chip,
  Avatar,
} from "@mui/material";
import { ShoppingCart, AttachMoney, Edit } from "@mui/icons-material";
import ThemeContext from "../../context/ThemContext"; // Import Theme Context
import EditCustomerModal from "../EditCustomer/EditCustomer";

const CustomerProfileCard = () => {
  const { theme } = useContext(ThemeContext);
  const customer = {
    username: "Stanfield Baser",
    customerId: "#879861",
    orders: 157,
    spent: "$2074.22",
    billingEmail: "sbaser0@boston.com",
    status: "Active", // This will use the "Active" badge
    contact: "+1 (234) 464-0600",
    country: "Australia",
    imageUrl: "https://i.pravatar.cc/150?img=3", // Placeholder profile image
  };

  const [open, setOpen] = useState(false);

  const user = {
    firstName: "Stanfield",
    lastName: "Baser",
    username: "Stanfield Baser",
    email: "oliverQueen@gmail.com",
    taxId: "Tax-8894",
    contact: "+1 609 933 4422",
    status: "Active",
    language: "English",
    country: "US",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "35%",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          padding: 3,
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
          boxShadow: 3,
          color: theme.palette.text.primary,
        }}
      >
        <Grid container direction="column" alignItems="center">
          {/* Profile Image */}
          <Avatar
            src={customer.imageUrl}
            alt="Profile"
            sx={{
              width: 120,
              height: 120,
              borderRadius: 2, // Square with rounded corners
              marginBottom: 2,
              backgroundColor: theme.palette.primary.light,
            }}
          />

          {/* Customer Info */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
          >
            {customer.username}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Customer ID {customer.customerId}
          </Typography>

          {/* Orders and Spending Info */}
          <Grid
            container
            spacing={10}
            justifyContent="center"
            sx={{ marginBottom: 2 }}
          >
            <Grid item>
              <Box
                sx={{
                  borderRadius: 2,
                  padding: "8px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.light, // Themed background
                    borderRadius: 2,
                    padding: "10px 10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ShoppingCart sx={{ color: theme.palette.primary.main }} />
                </Box>

                <Grid>
                  <Typography
                    sx={{
                      marginLeft: 1,
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {customer.orders}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ marginLeft: 1, color: theme.palette.text.secondary }}
                  >
                    Orders
                  </Typography>
                </Grid>
              </Box>
            </Grid>

            <Grid item>
              <Box
                sx={{
                  borderRadius: 2,
                  padding: "8px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.light, // Themed background
                    borderRadius: 2,
                    padding: "10px 10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AttachMoney sx={{ color: theme.palette.primary.main }} />
                </Box>

                <Grid>
                  <Typography
                    sx={{
                      marginLeft: 1,
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {customer.spent}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ marginLeft: 1, color: theme.palette.text.secondary }}
                  >
                    Spent
                  </Typography>
                </Grid>
              </Box>
            </Grid>
          </Grid>

          {/* Customer Details */}
          <Box sx={{ width: "100%", marginTop: 3, textAlign: "left" }}>
            <Typography
              variant="body2"
              sx={{ fontSize: "20px", color: theme.palette.text.primary }}
            >
              <strong>Details</strong>
            </Typography>
            <Divider
              sx={{ my: 2, backgroundColor: theme.palette.text.secondary }}
            />

            <Typography variant="body2">
              <span style={{ fontWeight: "600" }}>Username:</span>{" "}
              {customer.username}
            </Typography>

            <Typography variant="body2" sx={{ paddingTop: "10px" }}>
              <span style={{ fontWeight: "600" }}>Email Address:</span>{" "}
              {customer.billingEmail}
            </Typography>

            <Typography
              variant="body2"
              sx={{ paddingTop: "10px", display: "flex", alignItems: "center" }}
            >
              <span style={{ fontWeight: "600" }}>Status:</span>
              <Chip
                label={customer.status}
                color="success"
                size="small"
                sx={{
                  backgroundColor:
                    customer.status === "Active" ? "#4CAF50" : "#F44336",
                  color: "#fff",
                  fontWeight: "600",
                  marginLeft: 1,
                }}
              />
            </Typography>

            <Typography variant="body2" sx={{ paddingTop: "10px" }}>
              <span style={{ fontWeight: "600" }}>Contact:</span>{" "}
              {customer.contact}
            </Typography>

            <Typography variant="body2" sx={{ paddingTop: "10px" }}>
              <span style={{ fontWeight: "600" }}>Address:</span>{" "}
              {customer.country}
            </Typography>
          </Box>

          {/* Edit Button */}
          <Button
            variant="contained"
            sx={{
              mt: 3,
              width: "100%",
              backgroundColor: theme.palette.primary.default,
              "&:hover": { backgroundColor: theme.palette.primary.dark },
            }}
            endIcon={<Edit />}
            onClick={() => setOpen(true)}
          >
            Edit Details
          </Button>
          <EditCustomerModal
            open={open}
            handleClose={() => setOpen(false)}
            user={user}
          />
        </Grid>
      </Paper>
    </Box>
  );
};

export default CustomerProfileCard;
