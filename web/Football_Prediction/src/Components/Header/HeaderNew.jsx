// src/components/layout/HeaderPills.jsx
import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Button,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIconsx,
  ChatBubbleOutline as ChatIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/system";
import ThemeContext from "../../context/ThemContext";
import ThemeMagicToggle from "./ThemeToggle";
import ToggleSwitch from "./ToggleSwitch";
import ThemeSwitch from "./ThemeSwitch";

/* ---------- tokens from your Theme ---------- */
const useHeaderTokens = (ctxTheme) => {
  const mode = ctxTheme?.palette?.mode ?? "light";
  const isDark = mode === "dark";
  const pageStrip = "#0b1730"; // top strip when scrolled
  const pageStrip1 = "rgba(224, 234, 229, 0.99)"; // top strip when scrolled
  const groupBg = isDark
    ? "#0f2549"
    : ctxTheme?.palette?.background?.paper || "#ffffff";

  return {
    isDark,
    barBg: isDark ? pageStrip : pageStrip1,
    groupBg,
    text: ctxTheme?.palette?.text?.primary || (isDark ? "#eaf1ff" : "#0f172a"),
    placeholder: isDark ? alpha("#eaf1ff", 0.55) : alpha("#0f172a", 0.45),
    stroke: isDark ? "rgba(171,198,255,0.22)" : "rgba(15,23,42,0.15)",
    softShadow: isDark
      ? "0 8px 24px rgba(0,0,0,0.35)"
      : "0 6px 18px rgba(2,6,23,0.08)",
    pillBtnBg: isDark ? "#061224" : "#0b1730",
    pillBtnText: "#fff",
  };
};

/* ---------- styled ---------- */
const BarWrap = styled("div")({
  position: "sticky",
  top: 0,
  zIndex: 1100,
});

// 🔴 updated: reacts to `scrolled` prop
const BarSurface = styled("div")(({ tokens, scrolled }) => ({
  color: tokens.text,
  background: scrolled ? tokens.barBg : "transparent",
  backdropFilter: scrolled ? "none" : "blur(10px)",
  transition: "background 0.25s ease, box-shadow 0.25s ease",
  boxShadow: scrolled
    ? tokens.isDark
      ? "0 12px 30px rgba(0,0,0,0.6)"
      : "0 8px 24px rgba(15,23,42,0.15)"
    : "inset 0 -1px 0 rgba(255,255,255,0.02)",
}));

const Row = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  minHeight: 64,
}));

const Pill = styled(Box)(({ theme, tokens }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.25),
  padding: "8px 10px",
  borderRadius: 14,
  border: `1px solid ${tokens.stroke}`,
  boxShadow: tokens.softShadow,
}));

const SearchPill = styled(Pill)(({ theme }) => ({
  minWidth: 280,
  maxWidth: 640,
  padding: "10px 12px",
  flex: 1,
}));

const SearchField = styled(InputBase)(({ tokens, theme }) => ({
  flex: 1,
  marginLeft: theme.spacing(1),
  color: tokens.text,
  "& .MuiInputBase-input": {
    padding: "6px 2px",
    fontSize: 14,
    "::placeholder": { color: tokens.placeholder, opacity: 1 },
  },
}));

const SearchBtn = styled(Button)(({ tokens }) => ({
  textTransform: "none",
  padding: "8px 16px",
  borderRadius: 12,
  fontWeight: 600,
  background: tokens.pillBtnBg,
  color: tokens.pillBtnText,
  boxShadow: tokens.isDark
    ? "inset 0 1px 0 rgba(255,255,255,0.08), 0 6px 18px rgba(0,0,0,0.35)"
    : "0 6px 14px rgba(2,6,23,0.15)",
  "&:hover": { background: tokens.isDark ? "#0a1a33" : "#0e2042" },
}));

/* ---------- component ---------- */
const HeaderPills = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const tokens = useHeaderTokens(theme);
  const [q, setQ] = useState("");
  const [notif, setNotif] = useState(3);
  const [scrolled, setScrolled] = useState(false);
  const isNarrow = useMediaQuery("(max-width: 900px)");
  const isDark = tokens.isDark;

  // 🔴 scroll -> toggle solid background
  useEffect(() => {
    const handleScroll = () => {
      // change 70 to whatever vertical offset you want
      setScrolled(window.scrollY > 70);
    };

    handleScroll(); // run once on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <BarWrap>
      {/* pass scrolled here */}
      <BarSurface tokens={tokens} scrolled={scrolled}>
        <Row disableGutters>
          {/* left: menu + search */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
            <IconButton
              size="large"
              sx={{ color: tokens.text, borderRadius: 2 }}
              aria-label="open menu"
            >
              <MenuIcon />
            </IconButton>

            <SearchPill
              tokens={tokens}
              sx={{ flex: isNarrow ? 1 : "0 1 640px" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  flex: 1,
                }}
              >
                <SearchIcon sx={{ color: alpha(tokens.text, 0.8) }} />
                <SearchField
                  tokens={tokens}
                  placeholder="Search something..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && console.log("search:", q)
                  }
                />
              </Box>
              <SearchBtn
                tokens={tokens}
                onClick={() => console.log("search:", q)}
              >
                Search
              </SearchBtn>
            </SearchPill>
          </Box>

          {/* right: quick actions + THEME TOGGLE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Pill tokens={tokens} aria-label="quick actions">
              <IconButton
                size="small"
                sx={{ color: isDark ? "#fff" : tokens.text }}
                onClick={() => setNotif(0)}
              >
                <Badge badgeContent={notif} color="error" overlap="circular">
                  <NotificationsIconsx fontSize="small" />
                </Badge>
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: isDark ? "#fff" : tokens.text }}
              >
                <ChatIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: isDark ? "#fff" : tokens.text }}
              >
                <SettingsIcon fontSize="small" />
              </IconButton>
            </Pill>

            {/* other toggles if you want them */}
            {/* <ToggleSwitch checked={isDark} onChange={toggleTheme} width={120} />
            <ThemeSwitch checked={isDark} onChange={toggleTheme} width={100} /> */}

            <ThemeMagicToggle
              checked={isDark}
              onChange={toggleTheme}
              size="sm"
            />
          </Box>
        </Row>
      </BarSurface>
    </BarWrap>
  );
};

export default HeaderPills;
