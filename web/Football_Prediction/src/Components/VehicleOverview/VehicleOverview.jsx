import React, { useContext } from "react";
import { ProgressBar, Table, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPersonBiking,
  faHourglassHalf,
  faArrowUpFromBracket,
  faTruckRampBox,
} from "@fortawesome/free-solid-svg-icons";
import ThemeContext from "../../context/ThemContext";

const VehicleOverview = () => {
  const { theme } = useContext(ThemeContext);

  // Define vehicle progress data with theme support
  const data = [
    {
      label: "On way",
      time: "2hr 10min",
      percentage: 5,
      color: theme.palette.primary.main,
    },
    {
      label: "Unloading",
      time: "3hr 15min",
      percentage: 65,
      color: theme.palette.secondary.main,
    },
    {
      label: "Loading",
      time: "1hr 24min",
      percentage: 25,
      color: theme.palette.info.main,
    },
    {
      label: "Waiting",
      time: "5hr 19min",
      percentage: 5,
      color: theme.palette.grey[500],
    },
  ];

  return (
    <Card
      className="p-3 "
      style={{
        width: "600px",
        borderRadius: "10px",
        backgroundColor: theme.palette.background.paper, // Card background color
        color: theme.palette.text.primary, // Text color
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <Card.Body>
        {/* Header with Title & Menu Icon */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Card.Title
            className="fs-5 mb-0"
            style={{ color: theme.palette.text.primary, fontWeight: "800" }}
          >
            Vehicle Overview
          </Card.Title>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            style={{ color: theme.palette.text.primary }}
          />
        </div>

        {/* Labels Above Progress Bar */}
        <div
          className="d-flex position-relative mb-2"
          style={{ width: "100%", height: "20px" }}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="position-absolute text-center"
              style={{
                left: `${data
                  .slice(0, index)
                  .reduce((acc, d) => acc + d.percentage, 0)}%`,
                fontSize: "12px",
                fontWeight: "bold",
                color: theme.palette.text.primary,
              }}
            >
              {item.percentage > 10 ? item.label : item.label.slice(0, 1)}
            </div>
          ))}
        </div>

        {/* Dividers for Progress Bar Sections */}
        <div
          className="d-flex position-relative mb-2"
          style={{ width: "100%", height: "20px" }}
        >
          {data.map((_, index) => (
            <div
              key={index}
              className="position-absolute"
              style={{
                left: `${data
                  .slice(0, index)
                  .reduce((acc, d) => acc + d.percentage, 0)}%`,
                width: "2px",
                backgroundColor: theme.palette.divider, // Use theme divider color
              }}
            >
              <div
                style={{
                  backgroundColor: theme.palette.divider,
                  width: "2px",
                  height: "20px",
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <ProgressBar style={{ height: "30px", borderRadius: "8px" }}>
            {data.map((item, index) => (
              <ProgressBar
                key={index}
                now={item.percentage}
                label={`${item.percentage}%`}
                style={{
                  backgroundColor: item.color,
                  color: theme.palette.text.primary,
                }}
              />
            ))}
          </ProgressBar>
        </div>

        {/* Table View */}
        <Table borderless>
          <tbody>
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td className="d-flex align-items-center">
                    <div
                      style={{
                        width: "50px",
                        fontSize: "25px",
                        marginRight: "10px",
                        color: theme.palette.text.primary, // Theme text color for icons
                      }}
                    >
                      {index === 0 ? (
                        <FontAwesomeIcon icon={faPersonBiking} />
                      ) : index === 1 ? (
                        <FontAwesomeIcon icon={faTruckRampBox} />
                      ) : index === 2 ? (
                        <FontAwesomeIcon icon={faArrowUpFromBracket} />
                      ) : (
                        <FontAwesomeIcon icon={faHourglassHalf} />
                      )}
                    </div>
                    {item.label}
                  </td>
                  <td className="text-end">{item.time}</td>
                  <td className="text-end">{item.percentage}%</td>
                </tr>

                {/* Table Divider */}
                <tr>
                  <td colSpan="3" style={{ padding: "0" }}>
                    <hr
                      style={{
                        width: "100%",
                        borderColor: theme.palette.divider,
                        borderWidth: "1px",
                      }}
                    />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default VehicleOverview;
