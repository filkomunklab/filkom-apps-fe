import React, { useEffect, useState } from "react";
import { Typography, Select, MenuItem } from "@mui/material";
import CurriculumInformatika2018 from "./CurriculumInformatika2018";
import CurriculumInformatika2020 from "./CurriculumInformatika2020";
import CurriculumSistemInformasi2018 from "./CurriculumSistemInformasi2018";
import CurriculumSistemInformasi2020 from "./CurriculumSistemInformasi2020";
import CurriculumTeknologiInformasi from "./CurriculumTeknologiInformasi";

const Curriculum = () => {
  const [curriculum, setCurriculum] = useState("selectCurriculum");

  const [Informatika2018ContentVisible, setInformatika2018ContentVisible] =
    useState(false);
  const [Informatika2020ContentVisible, setInformatika2020ContentVisible] =
    useState(false);
  const [
    SistemInformasi2018ContentVisible,
    setSistemInformasi2018ContentVisible,
  ] = useState(false);
  const [
    SistemInformasi2020ContentVisible,
    setSistemInformasi2020ContentVisible,
  ] = useState(false);
  const [
    TeknologiInformasiContentVisible,
    setTeknologiInformasiContentVisible,
  ] = useState(false);

  useEffect(() => {
    curriculum === "informatika2018"
      ? setInformatika2018ContentVisible(true)
      : setInformatika2018ContentVisible(false);
    curriculum === "informatika2020"
      ? setInformatika2020ContentVisible(true)
      : setInformatika2020ContentVisible(false);
    curriculum === "sistemInfromasi2018"
      ? setSistemInformasi2018ContentVisible(true)
      : setSistemInformasi2018ContentVisible(false);
    curriculum === "sistemInfromasi2020"
      ? setSistemInformasi2020ContentVisible(true)
      : setSistemInformasi2020ContentVisible(false);
    curriculum === "teknologiInformasi"
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
          sx={{ fontSize: "24px", fontWeight: 500, paddingBottom: "24px" }}
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
          <MenuItem value="informatika2018">informatika 2018</MenuItem>
          <MenuItem value="informatika2020">informatika 2020</MenuItem>
          <MenuItem value="sistemInfromasi2018">Sistem Informasi 2018</MenuItem>
          <MenuItem value="sistemInfromasi2020">Sistem Informasi 2020</MenuItem>
          <MenuItem value="teknologiInformasi">
            Teknologi Informasi 2023
          </MenuItem>
        </Select>
      </div>
      {Informatika2018ContentVisible && <CurriculumInformatika2018 />}
      {Informatika2020ContentVisible && <CurriculumInformatika2020 />}
      {SistemInformasi2018ContentVisible && <CurriculumSistemInformasi2018 />}
      {SistemInformasi2020ContentVisible && <CurriculumSistemInformasi2020 />}
      {TeknologiInformasiContentVisible && <CurriculumTeknologiInformasi />}
    </div>
  );
};

export default Curriculum;
