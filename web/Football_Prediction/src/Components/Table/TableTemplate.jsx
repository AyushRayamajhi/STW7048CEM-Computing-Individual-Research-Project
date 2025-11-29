import "./TableTemplate.css";
// import "./TableTemplate.scss"
import {
  DataGrid,
  GridHeader,
  gridClasses,
  gridTopLevelRowCountSelector,
} from "@mui/x-data-grid";
import { userColumns, userRows } from "./datatablesource";
import {
  styled,
  createTheme,
  alpha,
  getContrastRatio,
} from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useState } from "react";
// import {useHistory} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import PreviewIcon from "@mui/icons-material/Preview";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOff";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import { Typography } from "@mui/material";

import { color } from "chart.js/helpers";
import { BorderStyle, LocalShipping } from "@mui/icons-material";
import { tableCellClasses, tableHeadClasses } from "@mui/material";
import { GridColumnHeaderRow } from "@mui/x-data-grid/internals";
import { BiFontSize } from "react-icons/bi";

const TableTemplate = () => {
  const [data, setData] = useState(userRows);
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const ODD_OPACITY = 0.9;

  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    border: "0",
    fontWeight: "300",
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "rgb(79, 103, 128)",
      color: theme.palette.grey[200],

      "&:hover": {
        backgroundColor: "rgba(79, 103, 128, 0.5)",
        color: theme.palette.grey[200],
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      },
      "&.Mui-selected": {
        backgroundColor: "transparent",

        "&:hover": {
          backgroundColor: alpha(
            theme.palette.warning.light,
            ODD_OPACITY +
              theme.palette.action.selectedOpacity +
              theme.palette.action.hoverOpacity
          ),

          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity
            ),
          },
        },
      },
    },
    [`& .${gridClasses.row}.odd`]: {
      backgroundColor: "rgba(44, 62, 80)",
      color: theme.palette.grey[200],
      ODD_OPACITY,
      "&:hover": {
        backgroundColor: "rgba(79, 103, 128, 0.5)",

        "@media (hover: none)": {
          backgroundColor: alpha(theme.palette.warning.dark, ODD_OPACITY),
        },
      },
      "&.Mui-selected": {
        backgroundColor: alpha(
          theme.palette.warning.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity
        ),
        color: theme.palette.grey[200],
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.warning.light,
            ODD_OPACITY +
              theme.palette.action.selectedOpacity +
              theme.palette.action.hoverOpacity
          ),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity
            ),
          },
        },
      },
    },
    "& .MuiDataGrid-main": {
      color: "white",
    },

    "& .MuiPaginationItem-root": {
      color: "white",
    },
    "& .MuiDataGrid-filler": {
      backgroundColor: "#2c3e50",
    },
    "& .MuiTablePagination-toolbar": {
      backgroundColor: "#2c3e50",
      color: "white",
    },
    "& .MuiTablePagination-actions": {
      color: "white",
    },
  }));

  const HoverableButton = ({
    defaultIcon: DefaultIcon,
    hoverIcon: HoverIcon,
    buttonClassName,
    redirectTo,
    ...props
  }) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const handleClick = () => {
      navigate(redirectTo);
    };
    return (
      <button
        className={buttonClassName}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {isHovered ? (
          <HoverIcon className="hover-icon" {...props} />
        ) : (
          <DefaultIcon className="hover-icon" {...props} />
        )}
      </button>
    );
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Progress",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => (
        <>
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
              <PreviewIcon />
            </Link> */}
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link> */}
            {/* <div className="visibility">
            <VisibilityIcon />
            </div> */}

            <HoverableButton
              defaultIcon={VisibilityTwoToneIcon}
              hoverIcon={VisibilityIcon}
              buttonClassName={"viewButton"}
              redirectTo={`/`}
            />
            <HoverableButton
              defaultIcon={EditTwoToneIcon}
              hoverIcon={EditIcon}
              buttonClassName={"editButton"}
              redirectTo={`/clientprofile`}
            />
            <HoverableButton
              defaultIcon={HighlightOffTwoToneIcon}
              hoverIcon={HighlightOffOutlinedIcon}
              buttonClassName={"deleteButton"}
              redirectTo={`/client`}
            />
            <Typography>{params.row.percentage}%</Typography>
            {/* <button className="editButton"><EditTwoToneIcon className="hover-icon"/></button>
            <button onClick={() => handleDelete(params.row.id)} className="deleteButton"><HighlightOffTwoToneIcon className="hover-icon"/></button> */}
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="datatable">
      {/* <div className="datatableTitle">
        Add New User
        <Link to="/new/agent" className="link">
          Add New
        </Link>
      </div> */}

      <StripedDataGrid
        className="datagrid"
        sx={{
          "& .super-app-theme--header": {
            backgroundColor: "#2c3e50",
          },
        }}
        rows={data}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        columns={userColumns}
        //  pageSize={9}
        // rowsPerPageOptions={[9]}
        // checkboxSelection
        // slotProps={{
        //   toolbar: {
        //     showQuickFilter: true,
        //   },
        // }}
        BorderStyle="none"
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 20, 50]}
      ></StripedDataGrid>
    </div>
  );
};

export default TableTemplate;
