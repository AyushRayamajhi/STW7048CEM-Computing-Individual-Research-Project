import React from "react";

/**
 * SunnyToggle – Pure CSS art as a React component (no images)
 *
 * Props:
 *  - width: overall width in px (default 720)
 *  - height: overall height in px (default 270)
 *  - className: optional extra class names for the wrapper
 */
export default function SunnyToggle({
  width = 720,
  height = 270,
  className = "",
}) {
  const radius = height / 2;
  return (
    <div
      className={`weather-toggle ${className}`}
      style={{
        ["--w"]: `${width}px`,
        ["--h"]: `${height}px`,
        ["--r"]: `${radius}px`,
      }}
    >
      <span className="track" />

      <style jsx>{`
        :root {
          --w: 720px;
          --h: 270px;
          --r: 135px;
        }
        .weather-toggle {
          position: relative;
          width: var(--w);
          height: var(--h);
          border-radius: var(--r);
          filter: drop-shadow(0 16px 14px rgba(0, 0, 0, 0.12));
          display: inline-block;
        }
        .track {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow: inset 0 10px 18px rgba(0, 0, 0, 0.18),
            inset 0 -12px 18px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          display: block;
          background: radial-gradient(
                120% 140% at 105% 45%,
                rgba(255, 255, 255, 0.9) 0 17%,
                rgba(255, 255, 255, 0) 18%
              )
              right/60% 100% no-repeat,
            radial-gradient(circle at 95% 50%, #adc6d9 0 18%, transparent 19%)
              right 5% center/35% 110% no-repeat,
            radial-gradient(circle at 78% 70%, #d2dde7 0 18%, transparent 19%)
              right 20% bottom/40% 60% no-repeat,
            radial-gradient(circle at 18% 120%, #fff 0 14%, transparent 15%),
            radial-gradient(circle at 36% 120%, #fff 0 14%, transparent 15%),
            radial-gradient(circle at 54% 120%, #fff 0 14%, transparent 15%),
            radial-gradient(circle at 72% 120%, #fff 0 14%, transparent 15%),
            radial-gradient(circle at 90% 120%, #fff 0 14%, transparent 15%),
            radial-gradient(circle at 30% 116%, #e7eef5 0 10%, transparent 11%),
            radial-gradient(circle at 48% 116%, #e7eef5 0 10%, transparent 11%),
            radial-gradient(circle at 66% 116%, #e7eef5 0 10%, transparent 11%),
            radial-gradient(circle at 84% 116%, #e7eef5 0 10%, transparent 11%),
            radial-gradient(
              160% 160% at -10% 50%,
              #114f7d 0 38%,
              transparent 39%
            ),
            radial-gradient(
              160% 120% at -10% 50%,
              #2a6794 0 50%,
              transparent 51%
            ),
            radial-gradient(
              160% 120% at -10% 50%,
              #4c86af 0 62%,
              transparent 63%
            ),
            radial-gradient(
              160% 120% at -10% 50%,
              #6fa1c3 0 74%,
              transparent 75%
            ),
            linear-gradient(#6fa1c3, #5c8fb5);
        }
        .track::before {
          content: "";
          position: absolute;
          left: 8%;
          top: 50%;
          width: 38%;
          aspect-ratio: 1;
          transform: translateY(-50%);
          border-radius: 50%;
          background: radial-gradient(
            120% 120% at 30% 25%,
            #ffe56b 0 55%,
            #f7c700 56% 100%
          );
          box-shadow: inset -12px -12px 0 rgba(0, 0, 0, 0.06),
            0 14px 18px rgba(0, 0, 0, 0.25);
        }
        .track::after {
          content: "";
          position: absolute;
          left: 23%;
          bottom: 7%;
          width: 36%;
          height: 12%;
          transform: translateX(-50%);
          border-radius: 50%;
          background: radial-gradient(
            closest-side,
            rgba(0, 0, 0, 0.24),
            transparent 70%
          );
          filter: blur(6px);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
