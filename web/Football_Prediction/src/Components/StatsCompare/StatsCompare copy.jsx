// src/components/bundesliga/MatchDayGraphLayout.jsx
import React, { useContext, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  useMediaQuery,
} from "@mui/material";
import ThemeContext from "../../context/ThemContext";
import TeamGraphs from "./TeamGraphs"; // ⬅️ your graph component

const MATCH_DAYS = Array.from({ length: 18 }, (_, i) => i + 1);

const GRAPH_OPTIONS = [
  { id: "goals", label: "Goals" },
  { id: "xg", label: "Expected Goals (xG)" },
  { id: "shots", label: "Total Shots" },
  { id: "onTarget", label: "Shots on Target" },
  { id: "possession", label: "Possession %" },
  { id: "passes", label: "Pass Accuracy" },
];

const MatchDayGraphLayout = ({
  homeTeam = "Bayern",
  awayTeam = "Leverkusen",
}) => {
  const { theme } = useContext(ThemeContext);
  const [matchDay, setMatchDay] = useState(1);
  const [selectedGraphs, setSelectedGraphs] = useState(["goals"]);
  const isSmall = useMediaQuery("(max-width: 900px)");

  const handleMatchDayChange = (event) => {
    setMatchDay(event.target.value);
  };

  const handleGraphChange = (event) => {
    const value = event.target.value;
    setSelectedGraphs(typeof value === "string" ? value.split(",") : value);
  };

  const graphBg =
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.03)"
      : "rgba(15,23,42,0.03)";

  const Panel = ({ teamName, teamId }) => (
    <Paper
      elevation={1}
      sx={{
        flex: 1,
        minHeight: 320,
        p: 2,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <Typography
        variant="subtitle1"
        align="center"
        sx={{
          fontWeight: 600,
          color: theme.palette.text.primary,
          mb: 0.5,
        }}
      >
        {teamName}
      </Typography>

      {/* This is where your real graph component lives */}
      <Box
        sx={{
          flex: 1,
          borderRadius: 2,
          backgroundColor: graphBg,
          border: `1px dashed ${theme.palette.divider}`,
          p: 1,
        }}
      >
        <TeamGraphs
          teamId={teamId}
          teamName={teamName}
          matchDay={matchDay}
          graphTypes={selectedGraphs}
        />
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Top controls: match day & graph type */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {/* Match Day dropdown */}
        <FormControl
          size="small"
          sx={{
            minWidth: 180,
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
          }}
        >
          <InputLabel>Match Day</InputLabel>
          <Select
            value={matchDay}
            label="Match Day"
            onChange={handleMatchDayChange}
            input={<OutlinedInput label="Match Day" />}
          >
            {MATCH_DAYS.map((day) => (
              <MenuItem key={day} value={day}>
                Matchday {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Graph Type multi-select */}
        <FormControl
          size="small"
          sx={{
            minWidth: 220,
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
          }}
        >
          <InputLabel>Graph Type</InputLabel>
          <Select
            multiple
            value={selectedGraphs}
            onChange={handleGraphChange}
            input={<OutlinedInput label="Graph Type" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {GRAPH_OPTIONS.filter((g) => selected.includes(g.id)).map(
                  (g) => (
                    <Chip key={g.id} label={g.label} size="small" />
                  )
                )}
              </Box>
            )}
          >
            {GRAPH_OPTIONS.map((g) => (
              <MenuItem key={g.id} value={g.id}>
                {g.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Two big panels side by side */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmall ? "column" : "row",
          gap: 2,
        }}
      >
        <Panel teamName={homeTeam} teamId="bayern" />
        <Panel teamName={awayTeam} teamId="leverkusen" />
      </Box>
    </Box>
  );
};

export default MatchDayGraphLayout;
