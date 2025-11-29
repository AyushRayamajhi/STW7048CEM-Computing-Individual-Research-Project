// src/RadarTeamChart.jsx
import React, { useMemo } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@mui/material/styles";

/* ---------- Smooth curve helper (cardinal spline) ---------- */
function buildSmoothPath(points, tension = 0.8) {
  if (!points || points.length < 3) return "";
  const t = (1 - Math.max(0, Math.min(1, tension))) * 0.5;

  const n = points.length;
  const P = (i) => points[(i + n) % n];

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < n; i++) {
    const p0 = P(i - 1);
    const p1 = P(i);
    const p2 = P(i + 1);
    const p3 = P(i + 2);

    const cp1x = p1.x + (p2.x - p0.x) * t;
    const cp1y = p1.y + (p2.y - p0.y) * t;
    const cp2x = p2.x - (p3.x - p1.x) * t;
    const cp2y = p2.y - (p3.y - p1.y) * t;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  d += " Z";
  return d;
}

function SmoothRadar({ points, stroke, fill, strokeWidth = 2, tension = 0.5 }) {
  const d = useMemo(() => buildSmoothPath(points, tension), [points, tension]);
  return (
    <path
      d={d}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  );
}

/* ----------------------- Main component -------------------- */
/**
 * Props:
 *  - title: string
 *  - metrics: Array<{ name: string, match: number, season: number }>
 *  - max: number (default 1)
 *  - tension: number 0..1 (default 0.55)
 *  - invert?: string[]  // metric names to invert
 */
export default function RadarTeamChart({
  title = "Bayer Leverkusen — Matchday 1",
  metrics = [],
  max = 1,
  tension = 0.55,
  invert = [],
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const invSet = useMemo(() => new Set(invert), [invert]);

  // Normalize data + optional inversion
  const data = useMemo(
    () =>
      metrics.map((m) => {
        const norm = (v) => {
          const num = Number(v ?? 0);
          if (invSet.has(m.name)) return Math.max(0, Math.min(max, max - num));
          return Math.max(0, Math.min(max, num));
        };
        return { metric: m.name, match: norm(m.match), season: norm(m.season) };
      }),
    [metrics, max, invSet]
  );

  // Colors based on theme
  const axisLabelColor = isDark
    ? "#cfe6ff"
    : theme.palette.text.secondary || "#64748b";
  const ringLabelColor = isDark
    ? "rgba(255,255,255,0.55)"
    : "rgba(15,23,42,0.55)";
  const gridStroke = isDark ? "rgba(255,255,255,0.15)" : "rgba(15,23,42,0.15)";

  // Container/card styling – fills parent box
  const cardStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: theme.shape.borderRadius || 12,
    padding: isDark ? 16 : 8,
    background: isDark ? theme.palette.background.default : "white",
    color: theme.palette.text.primary,
  };

  return (
    <div style={cardStyle}>
      <div
        style={{
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        {title}
      </div>

      <div style={{ flex: 1, minHeight: 360 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="80%">
            <PolarGrid gridType="polygon" stroke={gridStroke} radialLines />

            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: axisLabelColor, fontSize: 12 }}
            />

            <PolarRadiusAxis
              angle={90}
              domain={[0, max]}
              tick={{ fill: ringLabelColor, fontSize: 10 }}
              tickCount={5}
              axisLine={false}
            />

            {/* Season (blue) */}
            <Radar
              name="Season avg"
              dataKey="season"
              stroke="rgba(93, 196, 255, 0.95)"
              fill="rgba(93, 196, 255, 0.28)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              shape={(props) => <SmoothRadar {...props} tension={tension} />}
            />

            {/* Matchday (green) */}
            <Radar
              name="Matchday"
              dataKey="match"
              stroke="rgba(90, 247, 153, 0.95)"
              fill="rgba(90, 247, 153, 0.35)"
              strokeWidth={2.5}
              dot={{ r: 2.2, strokeWidth: 0, fill: "rgba(90, 247, 153, 0.9)" }}
              isAnimationActive={false}
              shape={(props) => <SmoothRadar {...props} tension={tension} />}
            />

            <Tooltip
              contentStyle={{
                background: isDark ? "rgba(11, 35, 60, 0.96)" : "#ffffff",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(15,23,42,0.12)",
                borderRadius: 10,
                color: isDark ? "#e6f1ff" : theme.palette.text.primary,
                fontSize: 12,
              }}
              formatter={(v, name) => [Number(v).toFixed(2), name]}
            />
            <Legend
              verticalAlign="top"
              wrapperStyle={{
                color: axisLabelColor,
                fontSize: 12,
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
