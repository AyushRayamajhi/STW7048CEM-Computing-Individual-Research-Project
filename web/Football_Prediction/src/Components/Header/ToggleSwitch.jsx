import React, { useId, useState } from "react";

/**
 * Uses the provided SVG as the "day" visual.
 * Animates to a matching "night" scene + sliding knob.
 *
 * Props:
 *  - checked?: boolean  (controlled)
 *  - defaultChecked?: boolean  (uncontrolled)
 *  - onChange?: (next:boolean) => void
 *  - width?: number (default 155)
 *  - ariaLabel?: string
 */
export default function DayNightToggleFromSVG({
  checked,
  defaultChecked = false,
  onChange,
  width = 155,
  ariaLabel = "Toggle theme",
}) {
  const [internal, setInternal] = useState(defaultChecked);
  const isOn = checked ?? internal; // night when true
  const setOn = (v) => {
    if (checked === undefined) setInternal(v);
    onChange?.(v);
  };

  const h = (55 / 155) * width;
  const travel = 100; // ~ pill width - pill height (155-55), tuned for your layout
  const uid = useId();

  // === dynamic IDs so multiple instances won't clash
  const ids = {
    clip: `clip0_323_386_${uid}`,
    f0: `filter0_d_323_386_${uid}`,
    f1: `filter1_d_323_386_${uid}`,
    f2: `filter2_d_323_386_${uid}`,
    f3: `filter3_d_323_386_${uid}`,
    knobShadow: `knobShadow_${uid}`,
  };

  return (
    <button
      onClick={() => setOn(!isOn)}
      aria-pressed={isOn}
      aria-label={ariaLabel}
      style={{
        appearance: "none",
        background: "transparent",
        border: "0",
        padding: 0,
        cursor: "pointer",
        lineHeight: 0,
        borderRadius: 20,
      }}
    >
      <svg
        width={width}
        height={h}
        viewBox="0 0 155 55"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        <defs>
          {/* --- cloned defs from your SVG but with unique IDs --- */}
          <filter
            id={ids.f0}
            x="-60"
            y="-58"
            width="178"
            height="178"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
          <filter
            id={ids.f1}
            x="-40"
            y="-33"
            width="138"
            height="128"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
          <filter
            id={ids.f2}
            x="-20"
            y="-18"
            width="98"
            height="98"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
          <filter
            id={ids.f3}
            x="5"
            y="7"
            width="48"
            height="48"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
          <clipPath id={ids.clip}>
            <rect width="155" height="55" rx="20" fill="white" />
          </clipPath>

          {/* subtle knob shadow for the sliding group */}
          <filter
            id={ids.knobShadow}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="3" />
            <feColorMatrix
              type="matrix"
              values="
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 0.35 0"
            />
            <feBlend in2="SourceGraphic" mode="normal" />
          </filter>
        </defs>

        {/* ======= BASE PILL (background color animates) ======= */}
        <rect
          width="155"
          height="55"
          rx="20"
          fill={isOn ? "#111E29" : "#071932"}
          style={{ transition: "fill 450ms ease" }}
        />

        {/* ======= SCENE (clipped to the pill) ======= */}
        <g clipPath={`url(#${ids.clip})`}>
          {/* --- DAY LAYER (your SVG) --- */}
          <g
            style={{
              opacity: isOn ? 0 : 1,
              transform: `translate(${isOn ? 12 : 0}px, ${isOn ? 6 : 0}px)`,
              transition:
                "opacity 420ms ease, transform 600ms cubic-bezier(.2,.8,.2,1)",
            }}
          >
            <rect x="-1" width="155" height="55" rx="20" fill="#0C4E9E" />
            <g filter={`url(#${ids.f0})`}>
              <circle cx="29" cy="27" r="85" fill="white" fillOpacity="0.15" />
            </g>
            <g filter={`url(#${ids.f1})`}>
              <ellipse
                cx="29"
                cy="27"
                rx="65"
                ry="60"
                fill="white"
                fillOpacity="0.1"
              />
            </g>
            <g filter={`url(#${ids.f2})`}>
              <circle cx="29" cy="27" r="45" fill="white" fillOpacity="0.05" />
            </g>

            {/* clouds */}
            <ellipse cx="102.5" cy="39" rx="13.5" ry="8" fill="#BFBCBC" />
            <ellipse cx="21.5" cy="45" rx="23.5" ry="16" fill="#BFBCBC" />
            <ellipse cx="47.5" cy="45" rx="12.5" ry="9" fill="#BFBCBC" />
            <ellipse cx="69.5" cy="38" rx="16.5" ry="11" fill="#BFBCBC" />
            <ellipse
              cx="83.0994"
              cy="47.9583"
              rx="15.0294"
              ry="11.3621"
              transform="rotate(1.51696 83.0994 47.9583)"
              fill="#BFBCBC"
            />
            <ellipse
              cx="116.678"
              cy="52.1905"
              rx="21.6309"
              ry="15.9881"
              fill="#BFBCBC"
            />
            <ellipse cx="141" cy="38.5" rx="20" ry="17.5" fill="#BFBCBC" />
            <ellipse cx="146.5" cy="13" rx="26.5" ry="23" fill="#BFBCBC" />
            <ellipse cx="106.5" cy="45.5" rx="12.5" ry="7.5" fill="#D9D9D9" />
            <ellipse cx="21.5" cy="50.5" rx="19.5" ry="13.5" fill="#D9D9D9" />
            <ellipse cx="48.5" cy="52" rx="12.5" ry="9" fill="#D9D9D9" />
            <ellipse cx="69" cy="45.5" rx="17" ry="11.5" fill="#D9D9D9" />
            <ellipse
              cx="89.2949"
              cy="55.5"
              rx="15.9807"
              ry="12.0812"
              transform="rotate(1.51696 89.2949 55.5)"
              fill="#D9D9D9"
            />
            <ellipse cx="125" cy="60" rx="23" ry="17" fill="#D9D9D9" />
            <ellipse cx="145.5" cy="42" rx="20.5" ry="18" fill="#D9D9D9" />
            <ellipse cx="149.5" cy="14" rx="20.5" ry="18" fill="#D9D9D9" />

            {/* sun (kept from your art) */}
            <g filter={`url(#${ids.f3})`}>
              <circle cx="29" cy="27" r="20" fill="#F2A600" />
            </g>
            <ellipse cx="26" cy="34" rx="6" ry="5" fill="#FFBD2F" />
            <circle cx="38.5" cy="24.5" r="2.5" fill="#FFBE31" />
          </g>

          {/* --- NIGHT LAYER (adds stars, dark bands) --- */}
          <g
            style={{
              opacity: isOn ? 1 : 0,
              transform: `translate(${isOn ? 0 : -10}px, ${isOn ? 0 : 4}px)`,
              transition:
                "opacity 420ms ease 120ms, transform 600ms cubic-bezier(.2,.8,.2,1) 120ms",
            }}
          >
            {/* horizon bands (right-leaning) */}
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M${35 + i * 25} 0 H155 V55 H${35 + i * 25} C${
                  10 + i * 25
                } 55, ${10 + i * 25} 0, ${35 + i * 25} 0 Z`}
                fill={["#0A1823", "#162632", "#263743"][i]}
                opacity={[0.9, 0.6, 0.35][i]}
              />
            ))}
            {/* star sprites */}
            {[
              [45, 28],
              [62, 36],
              [70, 22],
              [86, 30],
              [98, 24],
              [110, 35],
            ].map(([x, y], i) => (
              <path
                key={i}
                d={`M${x} ${y - 2} L${x + 1.2} ${y} L${x} ${y + 2} L${
                  x - 1.2
                } ${y} Z`}
                fill="#FFFFFF"
                opacity={[1, 0.85, 0.9, 0.75, 0.9, 0.8][i]}
              />
            ))}
          </g>

          {/* --- SLIDING KNOB (sun -> moon) --- */}
          <g
            filter={`url(#${ids.knobShadow})`}
            style={{ transition: "transform 650ms cubic-bezier(.2,.8,.2,1)" }}
            transform={`translate(${isOn ? travel : 0} 0)`}
          >
            {/* soft ring/halo that darkens at night */}
            <circle
              cx="29"
              cy="27"
              r="24"
              fill={isOn ? "#3B4650" : "rgba(255,255,255,0.15)"}
              style={{ transition: "fill 450ms ease" }}
            />
            {/* face: day=bright yellow, night=moon base (crossfade handled by groups) */}

            {/* SUN (visible by day) */}
            <g
              style={{
                opacity: isOn ? 0 : 1,
                transform: `scale(${isOn ? 0.9 : 1})`,
                transformOrigin: "29px 27px",
                transition:
                  "opacity 300ms ease, transform 450ms cubic-bezier(.2,.8,.2,1)",
              }}
            >
              <circle cx="29" cy="27" r="22" fill="#FAD929" />
              <ellipse
                cx="25"
                cy="18.5"
                rx="10"
                ry="6"
                fill="rgba(255,255,255,0.35)"
              />
            </g>

            {/* MOON (visible by night) */}
            <g
              style={{
                opacity: isOn ? 1 : 0,
                transform: `scale(${isOn ? 1 : 0.9})`,
                transformOrigin: "29px 27px",
                transition:
                  "opacity 300ms ease 120ms, transform 450ms cubic-bezier(.2,.8,.2,1) 120ms",
              }}
            >
              <circle cx="29" cy="27" r="22" fill="#E6E7EC" />
              <circle cx="22" cy="31" r="7" fill="#B6C3CF" opacity="0.75" />
              <circle cx="36" cy="32" r="4.8" fill="#B6C3CF" opacity="0.65" />
              <circle cx="33" cy="19" r="3.4" fill="#B6C3CF" opacity="0.55" />
            </g>
          </g>
        </g>
      </svg>
    </button>
  );
}
