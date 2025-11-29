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

/* ---------- Smooth curve helper (cardinal spline) ---------- */
function buildSmoothPath(points, tension = 0.5) {
  if (!points || points.length < 3) return "";
  // clamp 0..1, convert to “smoothing” factor (0=very curvy, 1=straight-ish)
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

function SmoothRadar({
  points,
  stroke,
  fill,
  strokeWidth = 2,
  tension = 0.55,
}) {
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
 *  - metrics: Array<{ name: string, match: number, season: number }>  // values in 0..max
 *  - max: number (default 1)
 *  - height: number (default 420)
 *  - tension: number 0..1 (default 0.55)  // curve smoothness
 *  - invert?: string[]  // names to invert (e.g., ['xGA']) so higher=better
 */
export default function RadarTeamChart({
  title = "Bayer Leverkusen — Matchday 1",
  metrics = [],
  max = 1,
  height = 420,
  tension = 0.55,
  invert = [], // e.g., ['xGA']
}) {
  const invSet = useMemo(() => new Set(invert), [invert]);

  // Normalize data + optional inversion (e.g., for xGA where lower is better)
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

  // Styling similar to your first image
  const cardStyle = {
    background: "#06213A",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#E6F1FF",
    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
    padding: 16,
    width: "100%",
    margin: "0 auto",
  };

  return (
    <div style={cardStyle}>
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
        {title}
      </div>

      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="80%">
            {/* Web grid */}
            <PolarGrid
              gridType="polygon"
              stroke="rgba(255,255,255,0.15)"
              radialLines
            />

            {/* Labels around the circle */}
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: "#cfe6ff", fontSize: 12 }}
            />

            {/* Rings + ticks */}
            <PolarRadiusAxis
              angle={90}
              domain={[0, max]}
              tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 10 }}
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
                background: "rgba(11, 35, 60, 0.96)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                color: "#e6f1ff",
                fontSize: 12,
              }}
              formatter={(v, name) => [Number(v).toFixed(2), name]}
            />
            <Legend
              verticalAlign="top"
              wrapperStyle={{ color: "#cfe6ff", fontSize: 12 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
