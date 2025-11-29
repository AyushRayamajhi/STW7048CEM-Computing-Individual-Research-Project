import React, { useState, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Pagination,
  Stack,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import ThemeContext from "../../context/ThemContext";

const OnRouteVehicles = () => {
  const { theme } = useContext(ThemeContext);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const vehicles = [
    {
      id: "VOL-468031",
      start: "Cagnes-sur-Mer, France",
      end: "Catania, Italy",
      warning: "No Warnings",
      warningColor: "green",
      progress: 49,
      avatar: "🚗",
    },
    {
      id: "VOL-302781",
      start: "Köln, Germany",
      end: "La Spezia, Italy",
      warning: "Ecu Not Responding",
      warningColor: "red",
      progress: 24,
      avatar: "🚙",
    },
    {
      id: "VOL-715822",
      start: "Chambray-lès-Tours, France",
      end: "Hamm, Germany",
      warning: "Oil Leakage",
      warningColor: "blue",
      progress: 7,
      avatar: "🚘",
    },
    {
      id: "VOL-451430",
      start: "Berlin, Germany",
      end: "Gelsenkirchen, Germany",
      warning: "No Warnings",
      warningColor: "green",
      progress: 95,
      avatar: "🚖",
    },
    {
      id: "VOL-921577",
      start: "Cergy-Pontoise, France",
      end: "Berlin, Germany",
      warning: "No Warnings",
      warningColor: "green",
      progress: 65,
      avatar: "🚔",
    },
    {
      id: "VOL-678901",
      start: "Paris, France",
      end: "Madrid, Spain",
      warning: "Brake Failure",
      warningColor: "red",
      progress: 15,
      avatar: "🚙",
    },
    {
      id: "VOL-789012",
      start: "Hamburg, Germany",
      end: "Oslo, Norway",
      warning: "Low Tire Pressure",
      warningColor: "yellow",
      progress: 33,
      avatar: "🚚",
    },
    {
      id: "VOL-890123",
      start: "Amsterdam, Netherlands",
      end: "Brussels, Belgium",
      warning: "No Warnings",
      warningColor: "green",
      progress: 78,
      avatar: "🚐",
    },
    {
      id: "VOL-901234",
      start: "Vienna, Austria",
      end: "Zurich, Switzerland",
      warning: "Fuel Leakage",
      warningColor: "red",
      progress: 22,
      avatar: "🚛",
    },
    {
      id: "VOL-012345",
      start: "Copenhagen, Denmark",
      end: "Stockholm, Sweden",
      warning: "Overheating",
      warningColor: "orange",
      progress: 55,
      avatar: "🚙",
    },
    {
      id: "VOL-112233",
      start: "Rome, Italy",
      end: "Athens, Greece",
      warning: "Check Engine",
      warningColor: "blue",
      progress: 40,
      avatar: "🚗",
    },
    {
      id: "VOL-223344",
      start: "Lisbon, Portugal",
      end: "Barcelona, Spain",
      warning: "Oil Change Needed",
      warningColor: "yellow",
      progress: 68,
      avatar: "🚖",
    },
    {
      id: "VOL-334455",
      start: "Bratislava, Slovakia",
      end: "Budapest, Hungary",
      warning: "Transmission Issue",
      warningColor: "red",
      progress: 20,
      avatar: "🚚",
    },
    {
      id: "VOL-445566",
      start: "Warsaw, Poland",
      end: "Prague, Czech Republic",
      warning: "No Warnings",
      warningColor: "green",
      progress: 88,
      avatar: "🚕",
    },
    {
      id: "VOL-556677",
      start: "Dublin, Ireland",
      end: "London, UK",
      warning: "Electrical Issue",
      warningColor: "blue",
      progress: 12,
      avatar: "🚙",
    },
    {
      id: "VOL-667788",
      start: "Helsinki, Finland",
      end: "Tallinn, Estonia",
      warning: "No Warnings",
      warningColor: "green",
      progress: 70,
      avatar: "🚗",
    },
    {
      id: "VOL-778899",
      start: "Belgrade, Serbia",
      end: "Sofia, Bulgaria",
      warning: "Brake Pad Replacement",
      warningColor: "yellow",
      progress: 50,
      avatar: "🚘",
    },
    {
      id: "VOL-889900",
      start: "Vilnius, Lithuania",
      end: "Riga, Latvia",
      warning: "No Warnings",
      warningColor: "green",
      progress: 90,
      avatar: "🚖",
    },
    {
      id: "VOL-990011",
      start: "Bucharest, Romania",
      end: "Chisinau, Moldova",
      warning: "Tire Puncture",
      warningColor: "red",
      progress: 18,
      avatar: "🚔",
    },
    {
      id: "VOL-101112",
      start: "Skopje, North Macedonia",
      end: "Thessaloniki, Greece",
      warning: "No Warnings",
      warningColor: "green",
      progress: 82,
      avatar: "🚛",
    },
    {
      id: "VOL-202223",
      start: "Sarajevo, Bosnia",
      end: "Podgorica, Montenegro",
      warning: "Check Engine",
      warningColor: "blue",
      progress: 30,
      avatar: "🚗",
    },
    {
      id: "VOL-303334",
      start: "Ljubljana, Slovenia",
      end: "Graz, Austria",
      warning: "No Warnings",
      warningColor: "green",
      progress: 99,
      avatar: "🚙",
    },
    {
      id: "VOL-404445",
      start: "Osijek, Croatia",
      end: "Zagreb, Croatia",
      warning: "Fuel Low",
      warningColor: "yellow",
      progress: 45,
      avatar: "🚖",
    },
    {
      id: "VOL-505556",
      start: "Tirana, Albania",
      end: "Pristina, Kosovo",
      warning: "Suspension Issue",
      warningColor: "red",
      progress: 12,
      avatar: "🚚",
    },
    {
      id: "VOL-606667",
      start: "Minsk, Belarus",
      end: "Moscow, Russia",
      warning: "No Warnings",
      warningColor: "green",
      progress: 75,
      avatar: "🚛",
    },
    {
      id: "VOL-707778",
      start: "Kiev, Ukraine",
      end: "Odessa, Ukraine",
      warning: "Oil Change Needed",
      warningColor: "yellow",
      progress: 53,
      avatar: "🚔",
    },
    {
      id: "VOL-808889",
      start: "Ankara, Turkey",
      end: "Istanbul, Turkey",
      warning: "No Warnings",
      warningColor: "green",
      progress: 91,
      avatar: "🚗",
    },
    {
      id: "VOL-909990",
      start: "Astana, Kazakhstan",
      end: "Almaty, Kazakhstan",
      warning: "Engine Failure",
      warningColor: "red",
      progress: 5,
      avatar: "🚙",
    },
    {
      id: "VOL-111213",
      start: "Baku, Azerbaijan",
      end: "Tbilisi, Georgia",
      warning: "No Warnings",
      warningColor: "green",
      progress: 83,
      avatar: "🚖",
    },
    {
      id: "VOL-222324",
      start: "Yerevan, Armenia",
      end: "Tehran, Iran",
      warning: "Overheating",
      warningColor: "orange",
      progress: 29,
      avatar: "🚚",
    },
    {
      id: "VOL-333435",
      start: "Damascus, Syria",
      end: "Beirut, Lebanon",
      warning: "No Warnings",
      warningColor: "green",
      progress: 96,
      avatar: "🚔",
    },
    {
      id: "VOL-444546",
      start: "Baghdad, Iraq",
      end: "Amman, Jordan",
      warning: "Fuel Low",
      warningColor: "yellow",
      progress: 38,
      avatar: "🚗",
    },
    {
      id: "VOL-555657",
      start: "Cairo, Egypt",
      end: "Alexandria, Egypt",
      warning: "No Warnings",
      warningColor: "green",
      progress: 89,
      avatar: "🚙",
    },
    {
      id: "VOL-666768",
      start: "Casablanca, Morocco",
      end: "Rabat, Morocco",
      warning: "Tire Replacement Needed",
      warningColor: "red",
      progress: 17,
      avatar: "🚖",
    },
    {
      id: "VOL-777879",
      start: "Tunis, Tunisia",
      end: "Tripoli, Libya",
      warning: "No Warnings",
      warningColor: "green",
      progress: 79,
      avatar: "🚘",
    },
    {
      id: "VOL-888989",
      start: "Johannesburg, South Africa",
      end: "Cape Town, South Africa",
      warning: "Brake Failure",
      warningColor: "red",
      progress: 21,
      avatar: "🚛",
    },
  ];

  // Handle Pagination
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: theme.palette.background.default,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: theme.palette.text.primary, mb: 2 }}
      >
        On Route Vehicles
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
                "LOCATION",
                "STARTING ROUTE",
                "ENDING ROUTE",
                "WARNINGS",
                "PROGRESS",
                "ACTION",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                      {vehicle.avatar}
                    </Avatar>
                    <Typography
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: "bold",
                      }}
                    >
                      {vehicle.id}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>
                    {vehicle.start}
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>
                    {vehicle.end}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={vehicle.warning}
                      sx={{
                        backgroundColor: vehicle.warningColor,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        width: `${vehicle.progress}%`,
                        height: 8,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 5,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="More Actions">
                      <IconButton>
                        <MoreVert sx={{ color: theme.palette.text.primary }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Stack spacing={2} sx={{ alignItems: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(vehicles.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
          variant="outlined"
          sx={{
            "& .MuiPaginationItem-root": {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.primary.main}`,
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.text.paper,
              },
            },
            "& .Mui-selected": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.text.paper,
              "&:hover": {
                backgroundColor: theme.palette.primary.default,
              },
            },
            "& .MuiPaginationItem-ellipsis": {
              backgroundColor: "transparent",
              color: theme.palette.text.primary,
              border: "none",
              "&:hover": {
                backgroundColor: "transparent",
                color: theme.palette.text.primary,
                border: "none",
              },
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default OnRouteVehicles;
