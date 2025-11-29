import React, { useContext, useMemo } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers, // Total
  faUserCheck, // Active
  faUserSlash, // Disabled
  faUserXmark, // Terminated
} from "@fortawesome/free-solid-svg-icons";
import ThemeContext from "../../context/ThemContext"; // <-- fixed typo

/**
 * Client Stats Cards
 * - Dark & Light mode aware
 * - Responsive (1/2/4 per row)
 * - Bottom border thickens slightly on hover (no layout jump)
 * - Clean, accessible, professional look
 *
 * Props (all optional; defaults shown):
 *  total=2000, active=1480, disabled=320, terminated=200
 */
const ClientStatsCards = ({
  total = { main: "#60a5fa", tint: "rgba(96,165,250,0.14)", user: 2000 },
  active = { main: "#22c55e", tint: "rgba(34,197,94,0.14)", user: 1480 }, // green
  disabled = { main: "#ef4444", tint: "rgba(239,68,68,0.16)", user: 320 }, // red
  term = { main: "#9ca3af", tint: "rgba(156,163,175,0.18)", user: 200 }, // gray
}) => {
  const { theme } = useContext(ThemeContext);

  const items = [
    {
      key: "total",
      label: "Total Client",
      value: total.user,
      icon: faUsers,
      color: total.main,
      tint: total.tint,
    },
    {
      key: "active",
      label: "Active Client",
      value: active.user,
      icon: faUserCheck,
      color: active.main,
      tint: active.tint,
    },
    {
      key: "disabled",
      label: "Disabled Client",
      value: disabled.user,
      icon: faUserSlash,
      color: disabled.main,
      tint: disabled.tint,
    },
    {
      key: "terminated",
      label: "Terminated Client",
      value: term.user,
      icon: faUserXmark,
      color: term.main,
      tint: term.tint,
    },
  ];

  const fmt = (n) =>
    typeof n === "number"
      ? n.toLocaleString(undefined, { maximumFractionDigits: 0 })
      : n ?? "—";

  return (
    <>
      {/* Scoped styles */}
      <style>{`
        .client-card {
          background: ${theme.palette.background.paper};
          color: ${theme.palette.text.primary};
          border: 0;
          border-radius: 13px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
          height: 100%;
          position: relative;
          overflow: hidden;
          /* create space so border-bottom growth doesn't shift layout */
          padding: 0.75em 0.75em 0.75em 0.75em;
          transition: transform 160ms ease, box-shadow 160ms ease;
          
        }
        .client-card:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
        }
        /* bottom accent (grows on hover without layout jump) */
        .client-accent {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 4px;
          transition: height 160ms ease;
        }
        .client-card:hover .client-accent { height: 7px; }

        .client-icon {
          width: 48px; height: 48px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center; justify-content: center;
          margin-right: .9rem;
        }
        .client-title {
          color: ${theme.palette.text.primary};
          margin: 0 0 1.15rem 0;
          font-weight: 900;
          letter-spacing: .2px;
          font-size: clamp(1.35rem, 2.2vw, 1.05rem);
        }
        .client-value {
          margin: .2rem 0 0;
          font-weight: 800;
          font-size: clamp(0.2rem, 4.5vw, 1.8rem);
          line-height: 1.05;
          font-variant-numeric: tabular-nums;
        }
        .client-sub {
          margin: .25rem 0 0;
          color: ;
          font-size: .85rem;
        }
        .kebab {
          opacity: .8;
          user-select: none;
        }
        .card-body {
          padding: 10px;
        }
      `}</style>

      {/* Responsive grid: phones(1) / sm(2) / md+(4) */}
      <Row className="g-3">
        {items.map((item) => (
          <Col key={item.key} xs={12} sm={6} md={3} className="mb-4">
            <Card
              className="client-card"
              role="region"
              aria-label={`${item.label}: ${fmt(item.value)}`}
            >
              <Card.Body className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="client-title">{item.label}</h5>
                  <span className="kebab" aria-hidden="true">
                    •••
                  </span>
                </div>

                <div className="d-flex align-items-center mt-1">
                  <span
                    className="client-icon"
                    style={{ backgroundColor: item.tint }}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      style={{ fontSize: "1.25rem", color: item.color }}
                    />
                  </span>
                  <p className="client-value mb-0">{fmt(item.value)}</p>
                </div>

                <div
                  className="client-accent"
                  style={{ backgroundColor: item.color }}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ClientStatsCards;
