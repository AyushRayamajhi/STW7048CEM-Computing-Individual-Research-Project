// ThemeMagicToggle.jsx
import React from "react";
import { styled, keyframes } from "@mui/system";
import { Star as StarIcon, Cloud as CloudIcon } from "@mui/icons-material";

/* ---------- animations ---------- */
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
`;
const twinkle = keyframes`
  0%, 100% { opacity: .2; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
`;

/* ---------- styled atoms ---------- */
const SwitchRoot = styled("button")(({ theme, ownerState }) => {
  const isDark = ownerState.checked;
  const width =
    ownerState.size === "sm" ? 72 : ownerState.size === "lg" ? 136 : 108;
  const height =
    ownerState.size === "sm" ? 36 : ownerState.size === "lg" ? 56 : 46;

  return {
    position: "relative",
    width,
    height,
    border: 0,
    outline: "none",
    cursor: "pointer",
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 0,
    background: isDark ? "#000" : "#6ea8ff",
    boxShadow: isDark
      ? "rgba(195, 195, 195, 0.25) 0px 3px 6px -2px inset, rgba(183, 183, 183, 0.3) 0px 1px 3px -1px inset"
      : "rgba(5, 5, 9, 0.25) 0px 3px 6px -2px inset, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px inset",
    transition: "background .25s ease, box-shadow .25s ease",
    "& fieldset": {
      display: "none", // Removes MUI default outline
    },
    // focus ring
    "&:focus-visible": {
      boxShadow: `${
        isDark
          ? "0 0 0 3px rgba(99,102,241,.45)"
          : "0 0 0 3px rgba(37,99,235,.35)"
      }`,
    },
    // reduce motion
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
    },
  };
});

const Track = styled("div")(({ ownerState }) => ({
  position: "absolute",
  inset: 0,
  borderRadius: 999,
  overflow: "hidden",
}));

const Sun = styled("div")(({ ownerState }) => {
  const size =
    ownerState.size === "sm" ? 24 : ownerState.size === "lg" ? 36 : 30;
  const offset =
    ownerState.size === "sm" ? 4 : ownerState.size === "lg" ? 8 : 6;
  const translateX = ownerState.checked
    ? `calc(290% - ${size + offset}px)`
    : `${offset}px`;

  return {
    position: "absolute",
    left: 0,
    top: "50%",
    width: size,
    height: size,
    transform: `translate(${translateX}, -50%)`,
    borderRadius: "50%",
    background: ownerState.checked ? "#000" : "#fff",
    boxShadow: ownerState.checked
      ? "inset -10px 0 0 rgb(148, 148, 149)"
      : "0 4px 10px rgba(0,0,0,.15)",
    transition:
      "transform .28s ease, background .25s ease, box-shadow .25s ease",
    // little “craters” for light mode
    "&::before, &::after": !ownerState.checked
      ? {
          content: '""',
          position: "absolute",
          background: "rgba(171, 98, 24, 0.18)",
          borderRadius: "50%",
          animation: `${float} 2.2s ease-in-out infinite`,
        }
      : {},
    "&::before": !ownerState.checked
      ? { width: 6, height: 6, right: 5, top: 6 }
      : {},
    "&::after": !ownerState.checked
      ? { width: 4, height: 4, right: 16, top: 14, animationDelay: ".3s" }
      : {},
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
      animation: "none",
    },
  };
});

/* --- star bits (icon + field) --- */
const TwinkleStar = styled(StarIcon)(({ ownerState }) => {
  const size =
    ownerState.size === "sm" ? 8 : ownerState.size === "lg" ? 14 : 11;
  return {
    position: "absolute",
    width: size,
    height: size,
    color: "#fff",
    filter: "drop-shadow(0 0 2px rgba(255,255,255,.85))",
    pointerEvents: "none",
    animation: `${twinkle} 1.8s ease-in-out infinite`,
    "@media (prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  };
});

const Stars = styled("div")(({ ownerState }) => ({
  position: "absolute",
  inset: 0,
  opacity: ownerState.checked ? 1 : 0,
  transition: "opacity .25s ease",
  pointerEvents: "none",
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none",
  },
}));

// same layout as your spans, now with delays per icon
const STAR_POSITIONS = [
  //   { left: "22%", top: "32%", delay: "0s" },
  { left: "34%", top: "55%", delay: ".25s" },
  { left: "48%", top: "28%", delay: ".6s" },
  //   { left: "63%", top: "50%", delay: ".15s" },
  //   { left: "76%", top: "36%", delay: ".4s" },
];

const Label = styled("span")(({ ownerState, side }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  fontWeight: 800,
  letterSpacing: ".2px",
  fontSize: ownerState.size === "sm" ? 12 : ownerState.size === "lg" ? 16 : 14,
  color:
    side === "left"
      ? ownerState.checked
        ? "rgba(255,255,255,.45)"
        : "#223147"
      : ownerState.checked
      ? "#e9eefc"
      : "rgba(34,49,71,.45)",
  left: side === "left" ? -64 : "auto",
  right: side === "right" ? -62 : "auto",
  userSelect: "none",
}));

/* ---------- component ---------- */
/**
 * ThemeMagicToggle
 * Props:
 *  - checked: boolean (true = dark)
 *  - onChange: (next: boolean) => void
 *  - size?: "sm" | "md" | "lg" (default "md")
 *  - ariaLabel?: string
 */
const ThemeMagicToggle = ({
  checked,
  onChange,
  size = "md",
  ariaLabel = "Toggle theme",
}) => {
  const ownerState = { checked, size };

  // base icon size to match your TwinkleStar defaults
  const baseSize = size === "sm" ? 8 : size === "lg" ? 14 : 11;
  const small = Math.round(baseSize * 0.72); // tweak factor for “smaller”

  const handleClick = () => onChange?.(!checked);
  const handleKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onChange?.(!checked);
    }
  };

  return (
    <SwitchRoot
      ownerState={ownerState}
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange?.(!checked)}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onChange?.(!checked);
        }
      }}
    >
      <Track ownerState={ownerState} />

      <Stars ownerState={ownerState}>
        {STAR_POSITIONS.map((pos, i) => {
          // make the two upper stars (indices 0 and 2) smaller
          const isUpperSmall = i === 0 || i === 2;
          return (
            <TwinkleStar
              key={i}
              ownerState={ownerState}
              aria-hidden
              sx={{
                left: pos.left,
                top: pos.top,
                animationDelay: pos.delay,
                // override the default width/height from TwinkleStar for just these two
                width: isUpperSmall ? small : baseSize,
                height: isUpperSmall ? small : baseSize,
              }}
            />
          );
        })}
      </Stars>

      <Sun ownerState={ownerState} />
    </SwitchRoot>
  );
};

export default ThemeMagicToggle;
