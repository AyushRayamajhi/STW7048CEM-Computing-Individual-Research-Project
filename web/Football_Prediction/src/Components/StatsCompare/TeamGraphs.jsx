// src/components/bundesliga/TeamGraphs.jsx
import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import RadarTeamChart from "./RadarTeamChart";
import MatchEfficiencyChart from "./Efficiency/MatchfficiencyChart";
import SkillLuckModelChart from "./LuckSkill/SkillLuckModelChart";

import radarData from "./radarTeamData.json";
import efficiencyData from "./Efficiency/EfficiencyTeamData.json";
import skillLuckModelData from "./LuckSkill/SkillLuckModelData";

/**
 * Props:
 *  - teamId: "bayern" | "leverkusen"
 *  - teamName: string
 *  - matchDay: number
 *  - graphTypes: string[]  // ["goals", "efficiency"]
 */
const TeamGraphs = ({ teamId, teamName, matchDay, graphTypes }) => {
  const hasGoals = graphTypes?.includes("goals");
  const hasEfficiency = graphTypes?.includes("efficiency");
  const hasLuckSkill = graphTypes?.includes("luckskill");

  const { radarMetrics, efficiencyMeta } = useMemo(() => {
    // ----- Radar (Goals) data -----
    const rTeams = radarData?.teams || {};
    const rTeam = rTeams[teamId];
    const season = rTeam?.season || {};
    const rMatch =
      rTeam?.matches?.[String(matchDay)] || rTeam?.matches?.["1"] || {};

    const radarMetrics = Object.keys(season).map((metricName) => ({
      name: metricName,
      season: Number(season[metricName] ?? 0),
      match: Number(rMatch[metricName] ?? 0),
    }));

    // ----- Efficiency bar data -----
    const eTeams = efficiencyData?.teams || {};
    const eTeam = eTeams[teamId];
    const eMatch = eTeam?.matches?.[String(matchDay)] || eTeam?.matches?.["1"];

    const efficiencyMeta = {
      teamName: eTeam?.name || teamName,
      opponent: eMatch?.opponent || "Opponent",
      venue: eMatch?.venue || "",
      metrics: eMatch?.metrics || [],
    };

    return { radarMetrics, efficiencyMeta };
  }, [teamId, teamName, matchDay]);

  if (!hasGoals && !hasEfficiency) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Select at least one graph type above.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column", // 🔴 vertical stack
        gap: 2,
        width: "100%",
      }}
    >
      {hasGoals && (
        <Box
          sx={{
            width: "100%",
            flex: 1,
            maxHeight: 460,
          }}
        >
          <RadarTeamChart
            title={`${teamName} — Matchday ${matchDay}`}
            metrics={radarMetrics}
            max={1}
            tension={0.95}
          />
        </Box>
      )}

      {hasEfficiency && (
        <Box
          sx={{
            width: "100%",
            flex: 1,
            minHeight: 710,
          }}
        >
          <MatchEfficiencyChart
            teamName={efficiencyMeta.teamName}
            matchDay={matchDay}
            opponent={efficiencyMeta.opponent}
            venue={efficiencyMeta.venue}
            metrics={efficiencyMeta.metrics}
          />
        </Box>
      )}

      {hasLuckSkill && (
        <Box sx={{ width: "100%", flex: 1, minHeight: 300 }}>
          <SkillLuckModelChart
            teamId={teamId}
            teamName={teamName}
            matchDay={matchDay}
          />
        </Box>
      )}
    </Box>
  );
};

export default TeamGraphs;
