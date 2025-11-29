import "./TableTemplate.css";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { styled, createTheme, alpha } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOff";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";

const PROFILE_URL = "/get/agentById";

// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: "red",
//     },
//     secondary: {
//       main: "blue",
//     },
//   },
// });

export const HoverableButton = ({
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

export const StripedDataGrid = styled(DataGrid)(({}) => ({
  // [`& .${gridClasses.row}.even`]: {
  //   backgroundColor: theme.palette.warning[200],
  //   color: "black",
  //   "&:hover": {
  //     backgroundColor: alpha(theme.palette.warning.dark, ODD_OPACITY),
  //     "@media (hover: none)": {
  //       backgroundColor: "transparent",
  //     },
  //   },
  //   "&.Mui-selected": {
  //     backgroundColor: alpha(
  //       theme.palette.success.light,
  //       ODD_OPACITY + theme.palette.action.selectedOpacity
  //     ),
  //     "&:hover": {
  //       backgroundColor: alpha(
  //         theme.palette.success.main,
  //         ODD_OPACITY +
  //           theme.palette.action.selectedOpacity +
  //           theme.palette.action.hoverOpacity
  //       ),
  //       // Reset on touch devices, it doesn't add specificity
  //       "@media (hover: none)": {
  //         backgroundColor: alpha(
  //           theme.palette.primary.main,
  //           ODD_OPACITY + theme.palette.action.selectedOpacity
  //         ),
  //       },
  //     },
  //   },
  // },
  // [`& .${gridClasses.row}.odd`]: {
  //   // backgroundColor: theme.palette.grey[200],
  //   color: "black",
  //   "&:hover": {
  //     backgroundColor: alpha(theme.palette.warning.dark, ODD_OPACITY),
  //     "@media (hover: none)": {
  //       backgroundColor: "transparent",
  //     },
  //   },
  //   "&.Mui-selected": {
  //     backgroundColor: alpha(
  //       theme.palette.primary.main,
  //       ODD_OPACITY + theme.palette.action.selectedOpacity
  //     ),
  //     "&:hover": {
  //       backgroundColor: alpha(
  //         theme.palette.primary.main,
  //         ODD_OPACITY +
  //           theme.palette.action.selectedOpacity +
  //           theme.palette.action.hoverOpacity
  //       ),
  //       // Reset on touch devices, it doesn't add specificity
  //       "@media (hover: none)": {
  //         backgroundColor: alpha(
  //           theme.palette.primary.main,
  //           ODD_OPACITY + theme.palette.action.selectedOpacity
  //         ),
  //       },
  //     },
  //   },
  // },
}));

export const actionColumn = (props) => [
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => (
      <>
        <div className="cellAction">
          <HoverableButton
            defaultIcon={VisibilityTwoToneIcon}
            hoverIcon={VisibilityIcon}
            buttonClassName={"viewButton"}
            redirectTo={`profile/${params.row.id}`}
            // onClick={() => onViewClicked(params.row.id)}
          />
          <HoverableButton
            defaultIcon={EditTwoToneIcon}
            hoverIcon={EditIcon}
            buttonClassName={"editButton"}
            redirectTo={`edit/${params.row.id}`}
            // onClick={() => onViewClicked(params.row.id)}
          />
          <HoverableButton
            defaultIcon={HighlightOffTwoToneIcon}
            hoverIcon={HighlightOffOutlinedIcon}
            buttonClassName={"deleteButton"}
            // redirectTo={`/client`}
            onClick={() => props(params.row.id)}
          />
        </div>
      </>
    ),
  },
];

export const ODD_OPACITY = 0.8;
