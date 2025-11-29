import React, { useContext } from "react";
import { Box, Typography, Grid } from "@mui/material";
import {
  CalendarToday,
  CheckCircle,
  Replay,
  ErrorOutline,
} from "@mui/icons-material";
import ThemeContext from "../../context/ThemContext";

const PaymentStatus = () => {
  const { theme } = useContext(ThemeContext);

  // Dynamic payment stats data
  const stats = [
    {
      label: "Pending Payment",
      value: 56,
      icon: <CalendarToday />,
      color: "#ff9800",
    },
    {
      label: "Completed",
      value: "12,689",
      icon: <CheckCircle />,
      color: "#4caf50",
    },
    { label: "Refunded", value: 124, icon: <Replay />, color: "#03a9f4" },
    { label: "Failed", value: 32, icon: <ErrorOutline />, color: "#f44336" },
  ];

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        padding: 2,

        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {stats.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={3}
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 15px",
              height: 120,
              borderRight:
                index !== stats.length - 1
                  ? `1px solid ${theme.palette.divider}`
                  : "none",
            }}
          >
            {/* Value & Label */}
            <Box>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ color: theme.palette.text.primary, textAlign: "left" }}
              >
                {item.value}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary, textAlign: "left" }}
              >
                {item.label}
              </Typography>
            </Box>

            {/* Icon Box */}
            <Box
              sx={{
                backgroundColor: `${item.color}33`,
                padding: "8px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box sx={{ color: item.color, fontSize: "20px" }}>
                {item.icon}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PaymentStatus;
