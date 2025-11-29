import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import React, { useContext } from "react";
import { ThemeProvider } from "./context/ThemContext";
import { NavProvider } from "./context/NavContext";
import Layout from "./utils/Layout";
import MainPage from "./Pages/MainPage/MainPage";
import Login from "./Pages/Login/Login";
import SignUpPage from "./Pages/SignUp/SignUP";
import BoxManager from "./Components/Test/BoxManager";
import CustomerDetailPage from "./Pages/CustomerDetail/CustomerDetail";
import BundesligaTable from "./Components/BundesligaTable/BundesligaTable";
import MatchDayGraphComparison from "./Components/StatsCompare/StatsCompare";

//import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  // Get the current location using useLocation hook

  const location = useLocation();

  // const isTreePage = location.pathname == "/tree";
  return (
    <>
      <ThemeProvider>
        <NavProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<BundesligaTable />} />
              <Route path="statcompare" element={<MatchDayGraphComparison />} />
              <Route path="bundesliga" element={<BundesligaTable />} />
            </Route>
          </Routes>
        </NavProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
