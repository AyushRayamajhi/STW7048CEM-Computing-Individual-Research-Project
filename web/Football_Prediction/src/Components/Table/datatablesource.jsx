import { LocalShipping } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { ProgressBar } from "react-bootstrap";

export const userColumns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "super-app-theme--header",
    width: 70,
    renderCell: (params) => {
      return <div style={{ paddingLeft: "10px" }}>{params.row.id}</div>;
    },
  },
  {
    field: "username",
    headerName: "User",
    headerClassName: "super-app-theme--header",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <LocalShipping style={{ marginRight: 5, color: "#f39c12" }} />
          {/* <img className="cellImg" src={params.row.img} alt="avatar" /> */}
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Starting Route",
    headerClassName: "super-app-theme--header",
    width: 230,
  },

  {
    field: "age",
    headerName: "Ending Route",
    headerClassName: "super-app-theme--header",
    width: 200,
  },

  {
    field: "status",
    headerName: "Status",
    headerClassName: "super-app-theme--header",
    width: 150,
  },
  {
    field: "progress-bar",
    headerName: "Progress",
    headerClassName: "super-app-theme--header",
    width: 350,
    renderCell: (params) => {
      return (
        <div className="progressBar">
          {/* <LocalShipping style={{ marginRight: 5, color: "#f39c12" }} /> */}
          <ProgressBar
            now={params.row.percentage}
            variant="success"
            label={`${params.row.percentage}`}
            className="progress-bar-bar"
          />

          {/* <img className="cellImg" src={params.row.img} alt="avatar" /> */}
        </div>
      );
    },
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    mobile: 9810504177,
    email: "ashim@ashim.com",
    branch: "Dharan",
    percentage: 39.7,
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    percentage: 99.7,
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    percentage: 50.7,
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    percentage: 39.7,
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    percentage: 39.7,
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    percentage: 39.7,
    age: 15,
  },
];
