// src/components/bundesliga/MatchEfficiencyChart.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

/**
 * Props:
 *  - teamName: string
 *  - matchDay: number
 *  - opponent: string
 *  - venue: "Home" | "Away" | string
 *  - metrics: Array<{
 *      id: string,
 *      label: string,
 *      value: number,    // 0..1 for bar length
 *      display: string,  // main number on bar
 *      subLabel: string  // small text below
 *    }>
 */
const MatchEfficiencyChart = ({
  teamName,
  matchDay,
  opponent,
  venue,
  metrics = [],
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const cardBg = isDark ? theme.palette.background.default : "white";
  const trackBg = isDark ? "rgb(148, 147, 147)" : "#e5e7eb";
  const barBg = isDark ? "#e5e7eb" : "#0818A8";
  const barBgaway = "green";
  const barBghome = "#880808";
  const textMain = theme.palette.text.primary;
  const textMuted = theme.palette.text.secondary;

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        borderRadius: 2,
        bgcolor: cardBg,
      }}
    >
      {/* Title */}
      <Box sx={{ textAlign: "center", mb: 1 }}>
        <Typography
          variant="caption"
          sx={{
            letterSpacing: 1,
            textTransform: "uppercase",
            color: textMuted,
          }}
        >
          {teamName.toUpperCase()} VS {opponent.toUpperCase()} ({venue})
        </Typography>
      </Box>

      {/* Metrics list */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.75 }}>
        {metrics.map((m) => (
          <Box key={m.id}>
            {/* Metric label */}
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
                color: textMain,
              }}
            >
              {m.label}
            </Typography>

            {/* Bar */}
            <Box
              sx={{
                position: "relative",
                mt: 0.75,
                mb: 0.25,
                height: 24,
                borderRadius: 0.5,
                bgcolor: trackBg,
                overflow: "hidden",
              }}
            >
              {/* Filled bar */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: `${Math.max(0, Math.min(1, m.value)) * 100}%`,
                  bgcolor:
                    venue.toLowerCase() === "away" ? barBgaway : barBghome,
                  transition: "width 0.3s ease",
                }}
              />

              {/* Value text on top */}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  pr: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: isDark ? "#ffffff" : "#111827",
                  }}
                >
                  {m.display}
                </Typography>
              </Box>
            </Box>

            {/* Sub label */}
            <Typography variant="caption" sx={{ color: textMuted }}>
              {m.subLabel}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MatchEfficiencyChart;
