import React from "react";
import Sidebar from "../../Components/SideNavbar/SideNavbar";
import Header from "../../Components/Header/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import StatsCard from "../../Components/StatsCard/StatsCardNew";
import ClientStatsCards from "../../Components/StatsCard/ClientCard";
import VehicleOverview from "../../Components/VehicleOverview/VehicleOverview";
import ShipmentStats from "../../Components/ShipmentStats/ShipmentStats";
import DeliveryExceptions from "../../Components/DeliveryException/DeliveryException";
import DeliveryPerformance from "../../Components/DeliveryPerformance/DeliveryPerformance";
import OnRouteVehicles from "../../Components/RouteVehicle/OnRouteVehicle";
import StripedGrid from "../../Components/Test/Test";
import List from "../../Components/List/List";
import "./MainPage.css";
import { Card, ProgressBar, Row, Col } from "react-bootstrap";
import Lighttheme from "../../Components/Header/Lighttheme";

const theme = createTheme();

const MainPage = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="MainPage">
          {/* <Sidebar />
          <Header /> */}
          {/* <StatsCard /> */}
          <ClientStatsCards />

          <div className="Row">
            <VehicleOverview />
            <ShipmentStats />
          </div>

          <div className="Row-1">
            <DeliveryExceptions />
            <DeliveryPerformance />
          </div>

          <OnRouteVehicles />
          {/* <List /> */}
          <Lighttheme />
        </div>
      </ThemeProvider>

      {/* <Test /> */}
    </>
  );
};

export default MainPage;
