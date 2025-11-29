import "./TableTemplate.css";
import {
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
// import { userColumns, userRows } from "./datatablesource";
import { useState } from "react";
import { actionColumn, StripedDataGrid } from "./TableConstant";
import axios from "../../api/axios";
import { userRows } from "./datatablesource";
import useAuth from "../../hooks/useAuth";

const TransactionTableTemplate = (props) => {
  let { userColumns, userRows, loading, agnetList, agentByID, setrefresh } =
    props;
  const [data, setData] = useState(userRows);
  const PROFILE_URL = "/get/agentById";
  const { user } = useAuth();
  const isCommentRow = (row) => row.isCommentRow;

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const onViewClicked = async (param) => {
    try {
      console.log("clicked");
      const value = {
        user_Id: param,
      };
      const res = await axios.post(PROFILE_URL, value, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        agentByID(res.data);
        console.log(res.data);
        console.log("cliecked");
        // console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDelClicked = (param) => {
    // const deleteAgent = async () => {
    //   try {
    //     const res = await axios.post("/get/deleteAgent", {
    //       user_Id: param,
    //     });
    //     if (res === 200) {
    //       alert("Agent Cliented");
    //     }
    //     setrefresh(true);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // deleteAgent();

    axios
      .post("/get/deleteAgent", {
        user_Id: param,
        current_user: user.user_ID,
      })
      .then((res) => {
        if (res.status == 200) {
          alert(res.data.message);
          setrefresh(true);
        } else {
          navigate("/agent");
        }
      })
      .then((err) => {
        if (err) {
          console.log(data);
          console.log(err);
        }
      });
  };

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100vw",
            gap: "50px",
          }}
        >
          <GridToolbarExport />

          <span style={{}}>Next Payment should be on</span>
          {/* You can add more components or text here */}
          <GridToolbarQuickFilter />
        </div>
      </GridToolbarContainer>
    );
  };

  return (
    <div className="datatabletransaction">
      <StripedDataGrid
        className="datagrid"
        rows={userRows}
        loading={loading}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        // getRowClassName={(params) => {
        //   return params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd";
        // }}
        columns={userColumns.concat(actionColumn(onDelClicked))}
        initialState={{
          pagination: { paginationModel: { pageSize: 8 } },
        }}
        pageSizeOptions={[8, 50, 100]}
        slots={{ toolbar: CustomToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </div>
  );
};

export default TransactionTableTemplate;
