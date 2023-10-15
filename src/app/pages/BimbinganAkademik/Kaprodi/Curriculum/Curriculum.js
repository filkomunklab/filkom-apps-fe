import React, { useEffect, useState } from "react";
import { Typography, Select, MenuItem } from "@mui/material";
import CurriculumInformatika from "./CurriculumInformatika";
import CurriculumSistemInformasi from "./CurriculumSistemInformasi";
import CurriculumTeknologiInformasi from "./CurriculumTeknologiInformasi";

const Curriculum = () => {
  const [curriculum, setCurriculum] = useState("selectCurriculum");

  const [InformatikaContentVisible, setInformatikaContentVisible] =
    useState(false);
  const [SistemInformasiContentVisible, setSistemInformasiContentVisible] =
    useState(false);
  const [
    TeknologiInformasiContentVisible,
    setTeknologiInformasiContentVisible,
  ] = useState(false);

  useEffect(() => {
    curriculum === "informatika"
      ? setInformatikaContentVisible(true)
      : setInformatikaContentVisible(false);
    curriculum === "sistemInfromasi"
      ? setSistemInformasiContentVisible(true)
      : setSistemInformasiContentVisible(false);
    curriculum === "teknologiInfomasi"
      ? setTeknologiInformasiContentVisible(true)
      : setTeknologiInformasiContentVisible(false);
  }, [curriculum]);

  const handleOnChange = (e) => {
    setCurriculum(e.target.value);
  };

  return (
    <div>
      <div>
        <Typography
          sx={{ fontSize: "24px", fontWeight: 400, paddingBottom: "24px" }}
        >
          Curriculum
        </Typography>
        <Typography
          sx={{
            paddingBottom: "28px",
            fontSize: "15px",
            fontWeight: 400,
            color: "rgba(27, 43, 65, 0.69)",
          }}
        >
          You can choose the curriculum
        </Typography>
      </div>
      <div>
        <Select
          value={curriculum}
          onChange={handleOnChange}
          sx={{ width: "100%", backgroundColor: "rgba(26, 56, 96, 0.1)" }}
        >
          <MenuItem value="selectCurriculum">
            <Typography sx={{ fontWeight: 400 }}>View Curriculum</Typography>
          </MenuItem>
          <MenuItem value="informatika">informatika 2020</MenuItem>
          <MenuItem value="sistemInfromasi">Sistem Informasi 2020</MenuItem>
          <MenuItem value="teknologiInfomasi">Teknologi Infomasi 2023</MenuItem>
        </Select>
      </div>
      {InformatikaContentVisible && <CurriculumInformatika />}
      {SistemInformasiContentVisible && <CurriculumSistemInformasi />}
      {TeknologiInformasiContentVisible && <CurriculumTeknologiInformasi />}
    </div>
  );
};

export default Curriculum;
