import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Box,
  Chip,
  Tooltip,
} from "@mui/material";
import { Check, Close, Remove } from "@mui/icons-material";
import ThemeContext from "../../context/ThemContext";
import standings from "./BundesligaTabledata";

const getPositionTag = (pos, theme) => {
  // Colours approximate the left bar in your screenshot
  if (pos === 1) {
    return (
      <Chip
        size="small"
        label={pos}
        sx={{
          fontWeight: 700,
          background: theme.palette.success.dark,
          color: "#fff",
        }}
      />
    );
  }

  if (pos >= 2 && pos <= 4) {
    return (
      <Chip
        size="small"
        label={pos}
        sx={{
          fontWeight: 700,
          background: theme.palette.success.main,
          color: "#fff",
        }}
      />
    );
  }

  if (pos >= 5 && pos <= 7) {
    return (
      <Chip
        size="small"
        label={pos}
        sx={{
          fontWeight: 700,
          background: theme.palette.info.main,
          color: "#fff",
        }}
      />
    );
  }

  if (pos === 16) {
    return (
      <Chip
        size="small"
        label={pos}
        sx={{
          fontWeight: 700,
          background: theme.palette.warning.main,
          color: "#000",
        }}
      />
    );
  }

  if (pos >= 17) {
    return (
      <Chip
        size="small"
        label={pos}
        sx={{
          fontWeight: 700,
          background: theme.palette.error.main,
          color: "#fff",
        }}
      />
    );
  }

  return (
    <Chip
      size="small"
      label={pos}
      sx={{
        fontWeight: 700,
        background: theme.palette.grey[700],
        color: "#fff",
      }}
    />
  );
};

const getResultColor = (result, theme) => {
  if (result === "W") return theme.palette.success.main;
  if (result === "L") return theme.palette.error.main;
  return theme.palette.grey[500]; // Draw
};

// ⬇️ New ResultDot with icon + optional white ring for latest match
const ResultDot = ({ result, theme, isLatest }) => {
  const bgColor = getResultColor(result, theme);

  const label = result === "W" ? "Win" : result === "L" ? "Loss" : "Draw";

  const icon =
    result === "W" ? (
      <Check fontSize="inherit" />
    ) : result === "L" ? (
      <Close fontSize="inherit" />
    ) : (
      <Remove fontSize="inherit" />
    );

  return (
    <Tooltip title={label}>
      <Box
        sx={{
          width: isLatest ? 24 : 18,
          height: isLatest ? 24 : 18,
          borderRadius: "50%",
          border: isLatest ? "2px solid #fff" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: isLatest ? 18 : 16,
            height: isLatest ? 18 : 16,
            borderRadius: "50%",
            backgroundColor: bgColor,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
          }}
        >
          {icon}
        </Box>
      </Box>
    </Tooltip>
  );
};

const BundesligaTablePro = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Box mt={4}>
      <Box mb={2}>
        <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
          Bundesliga 2023–24
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          Final league standings
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              {[
                "S.N",
                "Club",
                "MP",
                "W",
                "D",
                "L",
                "GF",
                "GA",
                "GD",
                "Pts",
                "Last 5",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.text.primary,
                    whiteSpace: "nowrap",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {standings.map((team) => (
              <TableRow
                key={team.pos}
                hover
                sx={{
                  "&:last-child td, &:last-child th": { borderBottom: 0 },
                  backgroundColor:
                    team.pos === 1
                      ? theme.palette.action.selected
                      : "transparent",
                }}
              >
                <TableCell>{getPositionTag(team.pos, theme)}</TableCell>

                {/* Club + logo + info tooltip */}
                <TableCell>
                  <Tooltip
                    title={
                      <Box sx={{ p: 1, maxWidth: 260 }}>
                        <Avatar
                          src={team.logo}
                          alt={team.club}
                          sx={{
                            width: 30,
                            height: 30,
                            bgcolor: "transparent",
                          }}
                        ></Avatar>
                        <Typography variant="subtitle1">{team.club}</Typography>
                        <Typography variant="caption">{team.info}</Typography>
                      </Box>
                    }
                    arrow
                    placement="right"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        cursor: "pointer",
                      }}
                    >
                      <Avatar
                        src={team.logo}
                        alt={team.club}
                        sx={{
                          width: 30,
                          height: 30,
                          bgcolor: "transparent",
                        }}
                      >
                        {/* fallback to initials if logo missing */}
                        {team.short}
                      </Avatar>

                      <Typography sx={{ color: theme.palette.text.primary }}>
                        {team.club}
                      </Typography>
                    </Box>
                  </Tooltip>
                </TableCell>

                <TableCell>{team.mp}</TableCell>
                <TableCell>{team.w}</TableCell>
                <TableCell>{team.d}</TableCell>
                <TableCell>{team.l}</TableCell>
                <TableCell>{team.gf}</TableCell>
                <TableCell>{team.ga}</TableCell>
                <TableCell
                  sx={{
                    color:
                      team.gd > 0
                        ? theme.palette.success.main
                        : team.gd < 0
                        ? theme.palette.error.main
                        : theme.palette.text.primary,
                    fontWeight: 500,
                  }}
                >
                  {team.gd}
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{team.pts}</TableCell>

                {/* Last 5 with icons + white ring on latest */}
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {team.last5.map((r, idx) => (
                      <ResultDot
                        key={idx}
                        result={r}
                        theme={theme}
                        isLatest={idx === team.last5.length - 1}
                      />
                    ))}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Legend block under the table */}
        <Box
          sx={{
            borderTop: `1px solid ${theme.palette.divider}`,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            p: 2,
            gap: 2,
          }}
        >
          {/* Qualification / Relegation legend */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1, color: theme.palette.text.primary }}
            >
              Qualification/Relegation
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: 0.5,
                    backgroundColor: theme.palette.success.dark,
                  }}
                />
                <Typography variant="caption">
                  UEFA Champions League group stage
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: 0.5,
                    backgroundColor: theme.palette.success.main,
                  }}
                />
                <Typography variant="caption">
                  Europa League group stage
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: 0.5,
                    backgroundColor: theme.palette.info.main,
                  }}
                />
                <Typography variant="caption">
                  Europa Conference League qualifiers
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: 0.5,
                    backgroundColor: theme.palette.error.main,
                  }}
                />
                <Typography variant="caption">Relegation</Typography>
              </Box>
            </Box>
          </Box>

          {/* Last 5 legend (same icon style, no white ring) */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1, color: theme.palette.text.primary }}
            >
              Last 5 matches
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.success.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 12,
                  }}
                >
                  <Check fontSize="inherit" />
                </Box>
                <Typography variant="caption">Win</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.grey[500],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 12,
                  }}
                >
                  <Remove fontSize="inherit" />
                </Box>
                <Typography variant="caption">Draw</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.error.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 12,
                  }}
                >
                  <Close fontSize="inherit" />
                </Box>
                <Typography variant="caption">Loss</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default BundesligaTablePro;
