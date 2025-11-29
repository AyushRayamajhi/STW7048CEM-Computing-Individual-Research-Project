import React from "react";
import Sidebar from "../../Components/SideNavbar/SideNavbar";
import Header from "../../Components/Header/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import StatsCard from "../../Components/StatsCard/StatsCardNew";
import VehicleOverview from "../../Components/VehicleOverview/VehicleOverview";
import ShipmentStats from "../../Components/ShipmentStats/ShipmentStats";
import DeliveryExceptions from "../../Components/DeliveryException/DeliveryException";
import DeliveryPerformance from "../../Components/DeliveryPerformance/DeliveryPerformance";
import OnRouteVehicles from "../../Components/RouteVehicle/OnRouteVehicle";
import StripedGrid from "../../Components/Test/Test";
import List from "../../Components/List/List";
import { Card, ProgressBar, Row, Col } from "react-bootstrap";
import PaymentStatus from "../../Components/PaymentStatus/PaymentStatus";
import OrderTable from "../../Components/OrderTable/OrderTable";

const theme = createTheme();

const Order = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="MainPage">
          <PaymentStatus />
          {/* <div className="Row">
            <VehicleOverview />
            <ShipmentStats />
          </div> */}
          <OrderTable />
        </div>
      </ThemeProvider>

      {/* <Test /> */}
    </>
  );
};

export default Order;
