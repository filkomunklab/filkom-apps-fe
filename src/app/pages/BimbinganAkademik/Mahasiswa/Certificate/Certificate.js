import Div from "@jumbo/shared/Div";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
} from "@mui/material";
import ActionButton from "app/shared/ActionButton";
import SearchGlobal from "app/shared/SearchGlobal";
import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import SearchLocal from "./SearchLocal";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const Certificate = () => {
  const [page, setPage] = useState(1);

  const handleChange = (e, p) => {
    setPage(p);
  };

  const TableItem = ({ index }) => (
    <TableRow
      style={{ textDecoration: "none" }}
      component={Link}
      to="/bimbingan-akademik/certificates/student-certificate-waiting"
    >
      <TableCell>{index + 1}</TableCell>
      <TableCell>10 May 2000</TableCell>
      <TableCell>Menang lomba desain prototype</TableCell>
      <TableCell>Faculty</TableCell>
      <TableCell>Sertifikat menang lomba.pdf</TableCell>
      <TableCell>Approved</TableCell>
    </TableRow>
  );

  return (
    <Div>
      <Div
        sx={{
          display: "flex",
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "24px",
        }}
      >
        <Typography sx={{ fontSize: "24px", fontWeight: 500, gap: "24px" }}>
          All Certifications
        </Typography>
        <Div
          sx={{
            display: "flex",
            direction: "row",
            gap: 3,
            alignItems: "center",
          }}
        >
          <SearchLocal />
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/bimbingan-akademik/certificates/add-new"
          >
            <Button
              sx={{
                backgroundColor: "#006AF5",
                borderRadius: "24px",
                color: "white",
                whiteSpace: "nowrap",
                minWidth: "132px",
                fontSize: "12px",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                gap: "6px",

                "&:hover": {
                  backgroundColor: "#025ED8",
                },
              }}
            >
              {" "}
              <AddIcon sx={{ fontSize: "medium" }} />
              Add New
            </Button>
          </Link>
        </Div>
      </Div>
      <TableContainer
        sx={{
          overflow: "auto",
          marginBottom: "30px",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Submission Date</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Certificate</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(10)].map((item, index) => (
              <TableItem index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Pagination count={10} color="primary" onChange={handleChange} />
      </div>
    </Div>
  );
};

export default Certificate;
