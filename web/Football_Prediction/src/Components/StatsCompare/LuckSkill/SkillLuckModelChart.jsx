// src/components/bundesliga/SkillLuckModelChart.jsx
import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import skillLuckModelData from "./SkillLuckModelData";

const MODEL_OPTIONS = [
  { id: "hgbr", label: "HGBR" },
  { id: "modelB", label: "GBR" },
  { id: "modelC", label: "LOGIT" },
];

/**
 * Props:
 *  - teamId: "bayern" | "leverkusen"
 *  - teamName: string
 *  - matchDay: number
 */
const SkillLuckModelChart = ({ teamId, teamName, matchDay }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [modelId, setModelId] = useState("hgbr");

  // 🔹 Take ONLY the row for the current matchday
  const row = useMemo(() => {
    const teamRows = skillLuckModelData?.[modelId]?.[teamId] || [];
    return teamRows.find((r) => r.matchday === matchDay) || null;
  }, [modelId, teamId, matchDay]);

  const cardBg = isDark ? theme.palette.background.default : "white";
  const skillColor = "rgb(0, 100, 0)"; // blue-ish (Skill)
  const luckColor = "#880808"; // red (Luck)

  const labelMuted = isDark
    ? theme.palette.grey[300]
    : theme.palette.text.secondary;

  let skillPct = 0;
  let luckPct = 0;

  if (row) {
    const s = Number(row.skill ?? 0);
    const l = Number(row.luck ?? 0);
    const total = s + l || 1;
    // normalise so bar always fills 100%
    skillPct = (s / total) * 100;
    luckPct = (l / total) * 100;
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        p: 2,
        borderRadius: 2,
        bgcolor: cardBg,
      }}
    >
      {/* Header: title + model selector */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 2,
          mb: 1,
        }}
      >
        <Box>
          <Typography variant="caption" sx={{ color: labelMuted }}>
            {teamName}
            {row
              ? ` • ${row.opponent} (${row.venue}) • ${
                  MODEL_OPTIONS.find((m) => m.id === modelId)?.label
                }`
              : ` • ${MODEL_OPTIONS.find((m) => m.id === modelId)?.label}`}
          </Typography>
        </Box>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Model</InputLabel>
          <Select
            label="Model"
            value={modelId}
            onChange={(e) => setModelId(e.target.value)}
          >
            {MODEL_OPTIONS.map((m) => (
              <MenuItem key={m.id} value={m.id}>
                {m.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {!row ? (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No Skill/Luck data for Matchday {matchDay} in{" "}
            {MODEL_OPTIONS.find((m) => m.id === modelId)?.label}.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {/* Top labels: Skill | Luck (like Previous | Current) */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 0.5,
              mb: 0.5,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, color: skillColor }}
            >
              Skill
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, color: luckColor }}
            >
              Luck
            </Typography>
          </Box>

          {/* Horizontal bar */}
          <Box
            sx={{
              position: "relative",
              height: 22,
              borderRadius: 1,
              overflow: "hidden",
              display: "flex",
              boxShadow: isDark
                ? "0 0 0 1px rgba(15,23,42,0.7)"
                : "0 0 0 1px rgba(15,23,42,0.08)",
            }}
          >
            {/* Skill segment (left) */}
            <Box
              sx={{
                width: `${skillPct}%`,
                bgcolor: skillColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                px: 1,
                whiteSpace: "nowrap",
                transition: "width 0.3s ease",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#e5f2ff", fontWeight: 600 }}
              >
                {row.skill.toFixed(1)}%
              </Typography>
            </Box>

            {/* Luck segment (right) */}
            <Box
              sx={{
                width: `${luckPct}%`,
                bgcolor: luckColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: 1,
                whiteSpace: "nowrap",
                transition: "width 0.3s ease",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#fee2e2", fontWeight: 600 }}
              >
                {row.luck.toFixed(1)}%
              </Typography>
            </Box>
          </Box>

          {/* Small summary line under the bar */}
          <Typography variant="caption" sx={{ mt: 0.75, color: labelMuted }}>
            Skill: {row.skill.toFixed(1)}% • Luck: {row.luck.toFixed(1)}%
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SkillLuckModelChart;
