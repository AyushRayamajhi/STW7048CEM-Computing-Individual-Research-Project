import React, { useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import {
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputBase,
} from "@mui/material";
import { styled } from "@mui/system";
import ThemeContext from "../../context/ThemContext"; // Ensure the correct ThemeContext import

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

// Styled Select to match the image
const CustomSelect = styled(Select)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  height: "40px",
  minWidth: "120px",
  color: theme.palette.primary.main,
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    padding: "8px",
  },
  "& fieldset": {
    display: "none", // Removes default MUI outline
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.primary.main, // Arrow icon color
  },
}));

const ShipmentStats = () => {
  const [month, setMonth] = useState("January");
  const { theme } = useContext(ThemeContext);

  const data = {
    labels: [
      "1 Jan",
      "2 Jan",
      "3 Jan",
      "4 Jan",
      "5 Jan",
      "6 Jan",
      "7 Jan",
      "8 Jan",
      "9 Jan",
      "10 Jan",
    ],
    datasets: [
      {
        label: "Delivery",
        data: [20, 25, 22, 26, 32, 28, 25, 29, 27, 24],
        borderColor: "#3498db",
        backgroundColor: "rgba(52, 152, 219, 0.9)",
        borderWidth: 4,
        tension: 0.4,
        fill: false,
        pointBorderColor: "#3498db",
        pointBackgroundColor: "#ffffff",
        pointRadius: 5,
        type: "line",
      },
      {
        label: "Shipment",
        data: [30, 35, 28, 34, 40, 42, 39, 33, 31, 38],
        backgroundColor: "#f39c12",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        type: "bar",
        borderRadius: 15,
        barThickness: 30,
      },
    ],
  };
  // Custom Select Box Styling
  const CustomSelect = styled(Select)(({ theme }) => ({
    border: `1px solid ${theme.palette.primary.default}`,
    borderRadius: "8px",
    height: "40px",
    minWidth: "140px",
    color: theme.palette.primary.main,
    // backgroundColor: theme.palette.background.paper,
    fontWeight: "bold",
    "& .MuiSelect-select": {
      display: "flex",
      alignItems: "center",
      padding: "8px",
    },
    "& fieldset": {
      display: "none", // Removes MUI default outline
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.main, // Dropdown arrow color
    },
  }));

  // Custom Dropdown Menu Styling
  const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    fontSize: "16px",
    fontWeight: "bold",
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.dark, // Selected item color
      color: theme.palette.primary.main,
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.light, // Hover color
    },
  }));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: theme.palette.text.primary },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: theme.palette.text.primary },
      },
      y: {
        ticks: { color: theme.palette.text.primary },
        grid: { color: theme.palette.divider },
      },
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: 4,
        borderRadius: 3,
        width: "100%",
        maxWidth: "800px",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}
          >
            Shipment Statistics
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Total number of deliveries: 23.8k
          </Typography>
        </Box>

        {/* Styled Select Dropdown */}
        <FormControl variant="outlined">
          <CustomSelect
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: theme.palette.background.paper, // Ensures dropdown follows theme
                  color: theme.palette.text.primary, // Text adapts to theme
                },
              },
            }}
          >
            <StyledMenuItem value="January">January</StyledMenuItem>
            <StyledMenuItem value="February">February</StyledMenuItem>
            <StyledMenuItem value="March">March</StyledMenuItem>
            <StyledMenuItem value="April">April</StyledMenuItem>
          </CustomSelect>
        </FormControl>
      </Box>

      {/* Chart Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          padding: 2,
        }}
      >
        <Line data={data} options={options} />
      </Box>

      {/* Buttons Section */}
      <Box sx={{ marginTop: 2, textAlign: "center" }}>
        <Button sx={{ color: "#f39c12", fontSize: 14 }}>Shipment</Button>
        <Button sx={{ color: "#3498db", fontSize: 14 }}>Delivery</Button>
      </Box>
    </Box>
  );
};

export default ShipmentStats;
