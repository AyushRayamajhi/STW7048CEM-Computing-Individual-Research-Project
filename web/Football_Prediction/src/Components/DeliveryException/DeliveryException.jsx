import React, { useContext, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import ThemeContext from "../../context/ThemContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const DeliveryExceptions = () => {
  const { theme } = useContext(ThemeContext);

  // Chart data with dynamic colors
  const chartData = {
    labels: [
      "Incorrect address",
      "Weather conditions",
      "Federal Holidays",
      "Damage during transit",
    ],
    datasets: [
      {
        data: [18, 15, 22, 14], // Values
        backgroundColor: ["#ff6f61", "#ffca28", "#66cc33", "#3498db"], // Dynamic colors
        hoverBackgroundColor: ["#ff3d30", "#ffb300", "#4caf50", "#217dbb"], // Darker on hover
        borderWidth: 0,
      },
    ],
  };

  // State to update center text dynamically on hover
  const [centerText, setCenterText] = useState({
    value: chartData.datasets[0].data[2], // Default: Federal Holidays
    label: chartData.labels[2], // Default: Federal Holidays
    color: chartData.datasets[0].backgroundColor[2], // Default color
  });

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        padding: 3,
        borderRadius: "12px",
        width: "45%",
        maxWidth: "600px",
        margin: "0 auto",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Delivery Exceptions
        </Typography>
        <IconButton>
          <MoreVert sx={{ color: theme.palette.text.primary }} />
        </IconButton>
      </Box>

      {/* Doughnut Chart with Centered Dynamic Text */}
      <Box position="relative" display="flex" justifyContent="center">
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            cutout: "70%", // Space in center for text
            plugins: {
              legend: { display: false },
              tooltip: {
                enabled: true,
                callbacks: {
                  // Update center text dynamically when hovering
                  label: (tooltipItem) => {
                    setCenterText({
                      value: tooltipItem.raw,
                      label: tooltipItem.label,
                      color:
                        chartData.datasets[0].backgroundColor[
                          tooltipItem.dataIndex
                        ],
                    });
                  },
                },
              },
            },
            onHover: (_, elements) => {
              if (elements.length > 0) {
                const index = elements[0].index;
                setCenterText({
                  value: chartData.datasets[0].data[index],
                  label: chartData.labels[index],
                  color: chartData.datasets[0].backgroundColor[index],
                });
              }
            },
          }}
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
          >
            {centerText.value}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", color: centerText.color }}
          >
            {centerText.label}
          </Typography>
        </Box>
      </Box>

      {/* Legend Section */}
      <Grid container spacing={1} mt={2} justifyContent="center">
        {chartData.labels.map((label, index) => (
          <Grid
            item
            xs={6}
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <Box
              sx={{
                width: "12px",
                height: "12px",
                backgroundColor: chartData.datasets[0].backgroundColor[index],
                borderRadius: "50%",
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.primary }}
            >
              {label}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DeliveryExceptions;
