import React, { useContext, useState } from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import {
  LocalShipping,
  DirectionsCar,
  CheckCircle,
  Home,
  WatchLater,
  Person,
  MoreVert,
} from "@mui/icons-material";
import ThemeContext from "../../context/ThemContext";

const DeliveryPerformance = () => {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState({
    performanceIncrease: 12,
    stats: [
      {
        label: "Packages in transit",
        value: "10k",
        percentageChange: 25.8,
        icon: <LocalShipping fontSize="small" />,
        color: "#f39c12",
      },
      {
        label: "Packages out for delivery",
        value: "5k",
        percentageChange: 4.3,
        icon: <DirectionsCar fontSize="small" />,
        color: "#3498db",
      },
      {
        label: "Packages delivered",
        value: "15k",
        percentageChange: -12.5,
        icon: <CheckCircle fontSize="small" />,
        color: "#2ecc71",
      },
      {
        label: "Delivery success rate",
        value: "95%",
        percentageChange: 35.6,
        icon: <Home fontSize="small" />,
        color: "#e67e22",
      },
      {
        label: "Average delivery time",
        value: "2.5 Days",
        percentageChange: -2.15,
        icon: <WatchLater fontSize="small" />,
        color: "#95a5a6",
      },
      {
        label: "Customer satisfaction",
        value: "4.5/5",
        percentageChange: 5.7,
        icon: <Person fontSize="small" />,
        color: "#e74c3c",
      },
    ],
  });

  const renderPercentageColor = (percentageChange) => {
    return percentageChange > 0
      ? theme.palette.success.main
      : theme.palette.error.main;
  };

  const renderChangeIcon = (percentageChange) => {
    return percentageChange > 0 ? "▲" : "▼";
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        padding: 3,
        borderRadius: "12px",
        width: "55%",
        maxWidth: "800px",
        margin: "0 auto",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: theme.palette.text.secondary }}
          >
            Delivery Performance
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary, textAlign: "left" }}
          >
            {data.performanceIncrease}% increase this month
          </Typography>
        </Box>
        <IconButton>
          <MoreVert sx={{ color: theme.palette.text.primary }} />
        </IconButton>
      </Box>

      {/* Stats Section (VERTICAL ALIGNMENT & RESPONSIVE) */}
      <Grid container direction="column" spacing={2}>
        {data.stats.map((stat, index) => (
          <Grid item key={index}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: theme.palette.background.default,
                padding: 2,
                borderRadius: 2,
                boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    backgroundColor: `${stat.color}20`,
                    color: stat.color,
                    padding: "10px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {stat.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: renderPercentageColor(stat.percentageChange),
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {renderChangeIcon(stat.percentageChange)}{" "}
                    {stat.percentageChange}%
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                  textAlign: "right",
                }}
              >
                {stat.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DeliveryPerformance;
