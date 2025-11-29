import React from "react";
import { Card, CardContent, Typography, Box, Icon } from "@mui/material";
import { DirectionsCar, Warning, Route, AccessTime } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "20px",
  },
  card: {
    minWidth: 250,
    backgroundColor: "#34495e", // Dark background for the card
    backgroundImage: theme.palette.background.paper,
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    "&:hover": {
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    },
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
  },
  icon: {
    fontSize: "40px",
    marginRight: "20px",
  },
  number: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "white", // White text color for the number
  },
  percentage: {
    color: "#bdc3c7", // Lighter gray for percentage
    fontSize: "14px",
  },
}));

const StatsCard = () => {
  const classes = useStyles();

  const stats = [
    {
      title: "On route vehicles",
      number: 42,
      percentage: "+18.2%",
      icon: <DirectionsCar />,
      color: "#f39c12", // Yellow for on route
    },
    {
      title: "Vehicles with errors",
      number: 8,
      percentage: "-8.7%",
      icon: <Warning />,
      color: "#e67e22", // Orange for vehicles with errors
    },
    {
      title: "Deviated from route",
      number: 27,
      percentage: "+4.3%",
      icon: <Route />,
      color: "#e74c3c", // Red for deviated from route
    },
    {
      title: "Late vehicles",
      number: 13,
      percentage: "+2.5%",
      icon: <AccessTime />,
      color: "#3498db", // Blue for late vehicles
    },
  ];

  return (
    <Box className={classes.root}>
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={classes.card}
          style={{ borderBottom: `5px solid ${stat.color}` }}
        >
          <CardContent className={classes.cardContent}>
            <Box display="flex" alignItems="center">
              <Box className={classes.icon} style={{ color: stat.color }}>
                {stat.icon}
              </Box>
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ color: "#ecf0f1" }}
              >
                {stat.title}
              </Typography>
            </Box>
            <Box>
              <Typography className={classes.number}>{stat.number}</Typography>
              <Typography className={classes.percentage}>
                {stat.percentage} than last week
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default StatsCard;
