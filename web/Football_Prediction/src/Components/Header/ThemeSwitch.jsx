import React, { useId, useState } from "react";

/**
 * Props
 *  - checked?: boolean        (controlled, true = dark)
 *  - defaultChecked?: boolean (uncontrolled)
 *  - onChange?: (next:boolean)=>void
 *  - width?: number           (default 159)
 *  - ariaLabel?: string
 */
export default function ThemePillToggle({
  checked,
  defaultChecked = false,
  onChange,
  width = 159,
  ariaLabel = "Toggle theme",
}) {
  const [internal, setInternal] = useState(defaultChecked);
  const isDark = checked ?? internal;
  const setIsDark = (v) => {
    if (checked === undefined) setInternal(v);
    onChange?.(v);
  };

  const id = useId();
  const ids = {
    // dark
    clipDark: `clip0_350_640_${id}`,
    f0iDark: `filter0_ii_350_640_${id}`,
    f1d: `filter1_d_350_640_${id}`,
    f2d: `filter2_d_350_640_${id}`,
    f3d: `filter3_d_350_640_${id}`,
    f4d: `filter4_d_350_640_${id}`,
    f5d: `filter5_d_350_640_${id}`,
    f6d: `filter6_d_350_640_${id}`,
    f7d: `filter7_d_350_640_${id}`,
    f8d: `filter8_d_350_640_${id}`,
    f9d: `filter9_d_350_640_${id}`,
    f10d: `filter10_d_350_640_${id}`,
    f11d: `filter11_d_350_640_${id}`,
    f12d: `filter12_d_350_640_${id}`,
    f13d: `filter13_d_350_640_${id}`,
    f14d: `filter14_d_350_640_${id}`,
    // light
    clipLight: `clip0_323_386_${id}`,
    f0iLight: `filter0_ii_323_386_${id}`,
    f1l: `filter1_d_323_386_${id}`,
    f2l: `filter2_d_323_386_${id}`,
    f3l: `filter3_d_323_386_${id}`,
    f4l: `filter4_d_323_386_${id}`,
  };

  const height = (62 / 159) * width;

  // small travel amounts for just the sun/moon
  const sunShift = isDark ? -26 : 0; // slide left when turning dark
  const moonShift = isDark ? 0 : -16; // start slightly left; move right on dark

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      aria-pressed={isDark}
      aria-label={ariaLabel}
      style={{
        appearance: "none",
        border: 0,
        background: "transparent",
        padding: 0,
        cursor: "pointer",
        lineHeight: 0,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 159 62"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        <defs>
          {/* ====== DARK defs (IDs made unique) ====== */}
          <filter
            id={ids.f0iDark}
            x="0"
            y="0"
            width="161.5"
            height="64.5"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="4" dy="4" />
            <feGaussianBlur stdDeviation="1.25" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 0.942383 0 0 0 0 0.942383 0 0 0 0.25 0"
            />
            <feBlend in2="shape" result="effect1_innerShadow_350_640" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="1" dy="1" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
            />
            <feBlend
              in2="effect1_innerShadow_350_640"
              result="effect2_innerShadow_350_640"
            />
          </filter>
          <clipPath id={ids.clipDark}>
            <rect width="159" height="62" rx="28" />
          </clipPath>
          {[
            ["f1d", "9.29395", "10", "21.4121", "20.8541"],
            ["f2d", "46.1221", "3", "14.7559", "14.5226"],
            ["f3d", "36.1953", "21", "17.6094", "17.2361"],
            ["f4d", "16.1465", "33", "15.707", "15.427"],
            ["f5d", "66.1221", "11", "14.7559", "14.5226"],
            ["f6d", "81.1221", "28", "14.7559", "14.5226"],
            ["f7d", "94.0977", "9", "13.8047", "13.618"],
            ["f8d", "66.1221", "46", "14.7559", "14.5226"],
            ["f9d", "37.1221", "45", "14.7559", "14.5226"],
            ["f10d", "94.1221", "48", "14.7559", "14.5226"],
          ].map(([key, x, y, w, h]) => (
            <filter
              key={key}
              id={ids[key]}
              x={x}
              y={y}
              width={w}
              height={h}
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
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.998347 0 0 0 0 0.998347 0 0 0 0 0.998347 0 0 0 1 0"
              />
              <feBlend
                in2="BackgroundImageFix"
                result="effect1_dropShadow_350_640"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_350_640"
                result="shape"
              />
            </filter>
          ))}
          <filter
            id={ids.f11d}
            x="47"
            y="-49"
            width="168"
            height="168"
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
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_350_640"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_350_640"
              result="shape"
            />
          </filter>
          <filter
            id={ids.f12d}
            x="67"
            y="-29"
            width="128"
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
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_350_640"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_350_640"
              result="shape"
            />
          </filter>
          <filter
            id={ids.f13d}
            x="87"
            y="-8"
            width="88"
            height="88"
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
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_350_640"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_350_640"
              result="shape"
            />
          </filter>
          <filter
            id={ids.f14d}
            x="107"
            y="11"
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
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_350_640"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_350_640"
              result="shape"
            />
          </filter>

          {/* ====== LIGHT defs (IDs made unique) ====== */}
          <filter
            id={ids.f0iLight}
            x="-4"
            y="0"
            width="163"
            height="66"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="2"
              operator="erode"
              in="SourceAlpha"
              result="effect1_innerShadow_323_386"
            />
            <feOffset dx="-4" dy="4" />
            <feGaussianBlur stdDeviation="4" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.2383 0 0 0 0 0.235919 0 0 0 0 0.235919 0 0 0 0.44 0"
            />
            <feBlend in2="shape" result="effect1_innerShadow_323_386" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="-2" dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0"
            />
            <feBlend
              in2="effect1_innerShadow_323_386"
              result="effect2_innerShadow_323_386"
            />
          </filter>
          <clipPath id={ids.clipLight}>
            <rect width="159" height="62" rx="28" />
          </clipPath>
          <filter
            id={ids.f1l}
            x="-58"
            y="-49"
            width="168"
            height="168"
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
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_323_386"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_323_386"
              result="shape"
            />
          </filter>
          <filter
            id={ids.f2l}
            x="-38"
            y="-29"
            width="128"
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
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_323_386"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_323_386"
              result="shape"
            />
          </filter>
          <filter
            id={ids.f3l}
            x="-18"
            y="-8"
            width="88"
            height="88"
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
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_323_386"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_323_386"
              result="shape"
            />
          </filter>
          <filter
            id={ids.f4l}
            x="2"
            y="11"
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
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_323_386"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_323_386"
              result="shape"
            />
          </filter>
        </defs>

        {/* Base pill */}
        <rect width="159" height="62" rx="28" fill="#071932" />

        {/* ---------- LIGHT (Day) ---------- */}
        <g
          filter={`url(#${ids.f0iLight})`}
          clipPath={`url(#${ids.clipLight})`}
          style={{
            opacity: isDark ? 0 : 1,
            transition: "opacity 400ms ease",
          }}
        >
          <rect x="-1" width="155" height="55" rx="20" fill="#0C4E9E" />
          <g filter={`url(#${ids.f1l})`}>
            <circle cx="26" cy="31" r="80" fill="white" fillOpacity="0.15" />
          </g>
          <g filter={`url(#${ids.f2l})`}>
            <circle cx="26" cy="31" r="60" fill="white" fillOpacity="0.1" />
          </g>
          <g filter={`url(#${ids.f3l})`}>
            <circle cx="26" cy="32" r="40" fill="white" fillOpacity="0.05" />
          </g>

          {/* clouds */}
          <ellipse cx="102.5" cy="41" rx="13.5" ry="8" fill="#BFBCBC" />
          <ellipse cx="21.5" cy="47" rx="23.5" ry="16" fill="#BFBCBC" />
          <ellipse cx="47.5" cy="47" rx="12.5" ry="9" fill="#BFBCBC" />
          <ellipse cx="69.5" cy="40" rx="16.5" ry="11" fill="#BFBCBC" />
          <ellipse
            cx="83.0994"
            cy="49.9583"
            rx="15.0294"
            ry="11.3621"
            transform="rotate(1.51696 83.0994 49.9583)"
            fill="#BFBCBC"
          />
          <ellipse
            cx="116.678"
            cy="54.1905"
            rx="21.6309"
            ry="15.9881"
            fill="#BFBCBC"
          />
          <ellipse cx="141" cy="40.5" rx="20" ry="17.5" fill="#BFBCBC" />
          <ellipse cx="140.5" cy="21.5" rx="21.5" ry="18.5" fill="#BFBCBC" />
          <ellipse cx="106.5" cy="52.5" rx="12.5" ry="7.5" fill="#D9D9D9" />
          <ellipse cx="21.5" cy="57.5" rx="19.5" ry="13.5" fill="#D9D9D9" />
          <ellipse cx="48.5" cy="59" rx="12.5" ry="9" fill="#D9D9D9" />
          <ellipse cx="69" cy="52.5" rx="17" ry="11.5" fill="#D9D9D9" />
          <ellipse
            cx="89.2949"
            cy="62.5"
            rx="15.9807"
            ry="12.0812"
            transform="rotate(1.51696 89.2949 62.5)"
            fill="#D9D9D9"
          />
          <ellipse cx="125" cy="67" rx="23" ry="17" fill="#D9D9D9" />
          <ellipse cx="145.5" cy="49" rx="20.5" ry="18" fill="#D9D9D9" />
          <ellipse cx="149.5" cy="21" rx="20.5" ry="18" fill="#D9D9D9" />

          {/* SUN — moves left on toggle */}
          <g
            style={{
              transform: `translate(${sunShift}px, 0px)`,
              transformOrigin: "26px -31px",
              transition: "transform 550ms cubic-bezier(.2,.8,.2,1)",
            }}
          >
            <g filter={`url(#${ids.f4l})`}>
              <circle cx="26" cy="31" r="20" fill="#F2A600" />
            </g>
            <ellipse cx="26" cy="37" rx="6" ry="5" fill="#FFBD2F" />
            <circle cx="38.5" cy="27.5" r="2.5" fill="#FFBE31" />
          </g>
        </g>

        {/* ---------- DARK (Night) ---------- */}
        <g
          filter={`url(#${ids.f0iDark})`}
          clipPath={`url(#${ids.clipDark})`}
          style={{
            opacity: isDark ? 1 : 0,
            transition: "opacity 400ms ease 100ms",
          }}
        >
          <rect width="159" height="62" rx="28" fill="#071932" />
          <rect x="-2" width="161" height="62" rx="20" fill="#191A1C" />
          {/* stars */}
          <g filter={`url(#${ids.f1d})`}>
            <path
              d="M20 15L21.3471 19.1459H25.7063L22.1796 21.7082L23.5267 25.8541L20 23.2918L16.4733 25.8541L17.8204 21.7082L14.2937 19.1459H18.6529L20 15Z"
              fill="#D9D9D9"
            />
          </g>
          <g filter={`url(#${ids.f2d})`}>
            <path
              d="M53.5 8L54.0613 9.72746H55.8776L54.4082 10.7951L54.9695 12.5225L53.5 11.4549L52.0305 12.5225L52.5918 10.7951L51.1224 9.72746H52.9387L53.5 8Z"
              fill="#D9D9D9"
            />
          </g>
          <g filter={`url(#${ids.f3d})`}>
            <path
              d="M45 26L45.8981 28.7639H48.8042L46.4531 30.4721L47.3511 33.2361L45 31.5279L42.6489 33.2361L43.5469 30.4721L41.1958 28.7639H44.1019L45 26Z"
              fill="#D9D9D9"
            />
          </g>
          <g filter={`url(#${ids.f4d})`}>
            <path
              d="M24 38L24.6735 40.0729H26.8532L25.0898 41.3541L25.7634 43.4271L24 42.1459L22.2366 43.4271L22.9102 41.3541L21.1468 40.0729H23.3265L24 38Z"
              fill="#D9D9D9"
            />
          </g>
          <g filter={`url(#${ids.f5d})`}>
            <path
              d="M73.5 16L74.0613 17.7275H75.8776L74.4082 18.7951L74.9695 20.5225L73.5 19.4549L72.0305 20.5225L72.5918 18.7951L71.1224 17.7275H72.9387L73.5 16Z"
              fill="#D9D9D9"
            />
          </g>
          <g filter={`url(#${ids.f6d})`}>
            <path
              d="M88.5 33L89.0613 34.7275H90.8776L89.4082 35.7951L89.9695 37.5225L88.5 36.4549L87.0305 37.5225L87.5918 35.7951L86.1224 34.7275H87.9387L88.5 33Z"
              fill="#D9D9D9"
            />
          </g>
          <g filter={`url(#${ids.f7d})`}>
            <path
              d="M101 14L101.449 15.382H102.902L101.727 16.2361L102.176 17.618L101 16.7639L99.8244 17.618L100.273 16.2361L99.0979 15.382H100.551L101 14Z"
              fill="#D9D9D9"
            />
          </g>
          <g filter={`url(#${ids.f8d})`}>
            <path
              d="M73.5 51L74.0613 52.7275H75.8776L74.4082 53.7951L74.9695 55.5225L73.5 54.4549L72.0305 55.5225L72.5918 53.7951L71.1224 52.7275H72.9387L73.5 51Z"
              fill="#D9D9D9"
            />
          </g>
          <g filter={`url(#${ids.f9d})`}>
            <path
              d="M44.5 50L45.0613 51.7275H46.8776L45.4082 52.7951L45.9695 54.5225L44.5 53.4549L43.0305 54.5225L43.5918 52.7951L42.1224 51.7275H43.9387L44.5 50Z"
              fill="#D9D9D9"
            />
          </g>
          <g filter={`url(#${ids.f10d})`}>
            <path
              d="M101.5 53L102.061 54.7275H103.878L102.408 55.7951L102.969 57.5225L101.5 56.4549L100.031 57.5225L100.592 55.7951L99.1224 54.7275H100.939L101.5 53Z"
              fill="#D9D9D9"
            />
          </g>

          {/* MOON — moves right on toggle */}
          <g
            style={{
              transform: `translate(${moonShift}px, 0px)`,
              transformOrigin: "131px 31px",
              transition: "transform 550ms cubic-bezier(.2,.8,.2,1)",
            }}
          >
            <g filter={`url(#${ids.f11d})`}>
              <circle cx="131" cy="31" r="80" fill="white" fillOpacity="0.15" />
            </g>
            <g filter={`url(#${ids.f12d})`}>
              <circle cx="131" cy="31" r="60" fill="white" fillOpacity="0.1" />
            </g>
            <g filter={`url(#${ids.f13d})`}>
              <circle cx="131" cy="32" r="40" fill="white" fillOpacity="0.05" />
            </g>
            <g filter={`url(#${ids.f14d})`}>
              <circle cx="131" cy="31" r="20" fill="#C6C6C6" />
            </g>
            <circle cx="131" cy="38" r="6" fill="#D9D9D9" />
            <circle cx="143.5" cy="27.5" r="2.5" fill="#DCDCDC" />
            <path
              d="M122 16C122 16.5523 121.328 17 120.5 17C119.672 17 119 16.5523 119 16C119 15.4477 119.672 15 120.5 15C121.328 15 122 15.4477 122 16Z"
              fill="#DCDCDC"
            />
          </g>
        </g>
      </svg>
    </button>
  );
}
