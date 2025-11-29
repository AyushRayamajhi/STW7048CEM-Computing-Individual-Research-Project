import React, { useContext } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faTriangleExclamation,
  faRoute,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import ThemeContext from "../../context/ThemContext";

const DashboardCard = () => {
  const { theme } = useContext(ThemeContext);

  const stats = [
    {
      label: "On route vehicles",
      value: 42,
      percentage: 18.2,
      icon: faCar,
      color: "#f39c12",
      backColor: "rgba(231, 173, 78, 0.2)",
    },
    {
      label: "Vehicles with errors",
      value: 8,
      percentage: -8.7,
      icon: faTriangleExclamation,
      color: "#e67e22",
      backColor: "rgba(231, 173, 78, 0.2)",
    },
    {
      label: "Deviated from route",
      value: 27,
      percentage: 4.3,
      icon: faRoute,
      color: "#e74c3c",
      backColor: "rgba(231, 76, 60, 0.2)",
    },
    {
      label: "Late vehicles",
      value: 13,
      percentage: 2.5,
      icon: faClock,
      color: "#3498db",
      backColor: "rgba(52, 152, 219, 0.2)",
    },
  ];

  return (
    <Row>
      {stats.map((stat, index) => (
        <Col key={index} sm={2} md={3} className="mb-3">
          <Card
            className="dashboard-card"
            style={{
              //  backgroundColor: theme.palette.background.paper,
              backgroundImage: theme.palette.background.paper,
              color: theme.palette.text.primary,
              textAlign: "left",
              padding: "10px",
              borderRadius: "10px",
              borderBottom: `3px solid ${stat.color}`,
              marginBottom: "3px",
              transition:
                "border-bottom 0.3s ease-in-out, margin-bottom 0.3s ease-in-out",

              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderBottom = `6px solid ${stat.color}`;
              e.currentTarget.style.marginBottom = "0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderBottom = `3px solid ${stat.color}`;
              e.currentTarget.style.marginBottom = "3px";
            }}
          >
            <Card.Body>
              <Row>
                <Col xs={3}>
                  <div
                    style={{
                      backgroundColor: stat.backColor,
                      borderRadius: "5px",
                      textAlign: "center",
                      padding: "5px",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={stat.icon}
                      style={{ fontSize: "1.5rem", color: stat.color }}
                    />
                  </div>
                </Col>
                <Col xs={3}>
                  <h2 style={{ color: theme.palette.text.primary }}>
                    {stat.value}
                  </h2>
                </Col>
              </Row>

              <Row>
                <Col style={{ paddingTop: "10px" }}>
                  <Card.Title style={{ color: theme.palette.text.primary }}>
                    {stat.label}
                  </Card.Title>
                  <p>
                    <strong>
                      {stat.percentage > 0 ? "+" : ""}
                      {stat.percentage}%
                    </strong>{" "}
                    than last week
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DashboardCard;
