import {
  Box,
  Button,
  IconButton,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import LockResetTwoToneIcon from "@mui/icons-material/LockResetTwoTone";
import { useEffect, useRef, useState } from "react";
import { ResetModal } from "./Components";
import jwtAuthAxios from "app/services/Auth/jwtAuth";

const AccountManagement = () => {
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [modal, setModal] = useState({
    open: false,
    data: {},
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    jwtAuthAxios
      .get("/management/student", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
        console.log("data to change pass: ", res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <Table sx={{ backgroundColor: "white" }}>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow key={"header"}>
            <TableCell>No</TableCell>
            <TableCell>Nama Lengkap</TableCell>
            <TableCell>NIM</TableCell>
            <TableCell>Fakultas</TableCell>
            <TableCell>Prodi</TableCell>
            <TableCell>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
              <TableItem
                item={item}
                index={index}
                onChangePassClick={setModal}
                page={page}
                rowsPerPage={rowsPerPage}
              />
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.length}
        // count={data ? data.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <ResetModal
        open={modal.open}
        setOpen={() => {
          setModal({
            data: {},
            open: false,
          });
        }}
        data={modal.data}
      />
    </div>
  );
};

const TableItem = ({
  item,
  index,
  page,
  rowsPerPage,
  onChangePassClick = () => {},
}) => {
  const [state, setState] = useState({
    open: false,
    positionTop: 200,
    positionLeft: 400,
    anchorReference: "anchorEl",
  });
  const anchorRef = useRef(null);

  const { open, positionTop, positionLeft, anchorReference } = state;

  const handleClickButton = () => {
    setState({
      ...state,
      open: true,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <TableRow key={item.index}>
      <TableCell>{index + 1 + rowsPerPage * page}</TableCell>
      <TableCell>{item.fullName}</TableCell>
      <TableCell>{item.nim}</TableCell>
      <TableCell>{item.faculty}</TableCell>
      <TableCell>{item.major}</TableCell>
      <TableCell>
        <IconButton
          ref={anchorRef}
          variant="outlined"
          size="small"
          color="info"
          onClick={handleClickButton}
        >
          <MoreVertTwoToneIcon />
        </IconButton>
        <Popover
          anchorEl={anchorRef.current}
          open={open}
          anchorReference={anchorReference}
          onClose={handleClose}
          anchorPosition={{
            top: positionTop,
            left: positionLeft,
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Box sx={{ padding: 1 }}>
            <Button
              variant="outlined"
              startIcon={<LockResetTwoToneIcon />}
              size="small"
              onClick={() => {
                onChangePassClick({
                  data: item,
                  open: true,
                });
              }}
            >
              Change Password
            </Button>
          </Box>
        </Popover>
      </TableCell>
    </TableRow>
  );
};

export default AccountManagement;
