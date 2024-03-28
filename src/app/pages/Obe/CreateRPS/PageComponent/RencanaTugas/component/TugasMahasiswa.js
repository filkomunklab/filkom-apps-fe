import React from "react";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Pustaka = ["KK7", "KK8", "KK9", "KK10"];

function getStyles(Pustaka, pustaka, theme) {
  return {
    fontWeight:
      pustaka.indexOf(Pustaka) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const TugasMahasiswa = () => {
  const [MK, setMK] = useState([]);
  const [kodeMK, setKodeMK] = useState([]);
  const [SKS, setSKS] = useState([0]);
  const [semester, setSemester] = useState([0]);
  const [dosenPengampu, setDosenPengampu] = useState([]);
  const [jadwalPelaksanaan, setJadwalPelaksanaan] = useState([]);
  const [lainnya, setLainnya] = useState([]);
  const [daftarRujukan, setDaftarRujukan] = useState([]);

  const theme = useTheme();
  const [pustaka, setPustaka] = useState([]);

  const handleChangeMK = (event) => {
    setMK(event.target.value);
  };
  const handleChangeKodeMK = (event) => {
    setKodeMK(event.target.value);
  };
  const handleChangeDosenPengampu = (event) => {
    setDosenPengampu(event.target.value);
  };
  const handleChangeJadwalPelaksanaan = (event) => {
    setJadwalPelaksanaan(event.target.value);
  };
  const handleChangeLainnya = (event) => {
    setLainnya(event.target.value);
  };
  const handleChangeDaftarRujukan = (event) => {
    setDaftarRujukan(event.target.value);
  };

  const handleChangePustaka = (event) => {
    const {
      target: { value },
    } = event;
    setPustaka(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className="my-2">
      <Accordion className="bg-primary">
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              style={{
                color: "white",
              }}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{
            backgroundColor: "#006AF5",
          }}
        >
          <h2 className="text-lg font-semibold w-full text-center text-white">
            Case Study 1 : Mazda vs Ford
          </h2>
        </AccordionSummary>
        <AccordionDetails>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <p className="font-semibold mb-2">Mata Kuliah</p>
              <FormControl fullWidth>
                <Select
                  value={MK}
                  onChange={handleChangeMK}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>Mata Kuliah</em>
                  </MenuItem>
                  <MenuItem value={1}>Pemrograman Web</MenuItem>
                  <MenuItem value={2}>Pemrograman Mobile</MenuItem>
                  <MenuItem value={3}>Pemrograman Dasar</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <p className="font-semibold mb-2">Kode Mata Kuliah</p>
              <FormControl fullWidth>
                <Select
                  value={kodeMK}
                  onChange={handleChangeKodeMK}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>Kode Mata Kuliah</em>
                  </MenuItem>
                  <MenuItem value={1}>CS123</MenuItem>
                  <MenuItem value={2}>CS124</MenuItem>
                  <MenuItem value={3}>CS125</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <p className="font-semibold mb-2">Jumlah SKS (Kredit)</p>
              <FormControl fullWidth>
                <Select
                  value={SKS}
                  onChange={handleChangeMK}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>Jumlah SKS (Kredit)</em>
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <p className="font-semibold mb-2">Semester</p>
              <FormControl fullWidth>
                <Select
                  value={semester}
                  onChange={handleChangeMK}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>Semester</em>
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="mb-5">
            <div>
              <p className="font-semibold mb-2">Dosen Pengampu</p>
              <FormControl fullWidth>
                <Select
                  value={dosenPengampu}
                  onChange={handleChangeDosenPengampu}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>Dosen Pengampu</em>
                  </MenuItem>
                  <MenuItem value={1}>
                    Andrew Tanny Liem, SSi., MT., PhD
                  </MenuItem>
                  <MenuItem value={2}>Debby E. Sondakh, MT, PhD</MenuItem>
                  <MenuItem value={3}>
                    Jimmy H. Moedjahedy, SKom, MKom, MM
                  </MenuItem>
                  <MenuItem value={4}>Joe Y. Mambu, BSIT, MCIS</MenuItem>
                  <MenuItem value={5}>Lidya C. Laoh, SKom, MMSi</MenuItem>
                  <MenuItem value={6}>
                    Oktoverano H. Lengkong, SKom, MDs, MM
                  </MenuItem>
                  <MenuItem value={7}>Reynoldus A. Sahulata, SKom, MM</MenuItem>
                  <MenuItem value={8}>Stenly R. Pungus, MT, PhD</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <p className="font-semibold mb-2">Bentuk Tugas</p>
              <input
                type="text"
                className="w-full border border-gray-400 rounded-md p-2 py-[15px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
                placeholder="Ex.Tugas 2: Journal Reading Reflection"
              />
            </div>
            <div>
              <p className="font-semibold mb-2">Pustaka</p>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={pustaka}
                  onChange={handleChangePustaka}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {Pustaka.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, pustaka, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="mb-5">
            <p className="font-semibold mb-2">SUB Capaian Pembelajaran</p>
            <textarea className="w-full border border-gray-400 rounded-md p-2 py-[15px] h-24 hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out" />
          </div>

          <div className="mb-5">
            <p className="font-semibold mb-2">Deskripsi Tugas</p>
            <textarea className="w-full border border-gray-400 rounded-md p-2 py-[15px] h-24 hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out" />
          </div>

          <div className="mb-5">
            <p className="font-semibold mb-2">
              Indikator, Kriteria, dan Bobot Penilaiaan
            </p>
            <textarea className="w-full border border-gray-400 rounded-md p-2 py-[15px] h-24 hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out" />
          </div>

          <div className="mb-5">
            <div>
              <p className="font-semibold mb-2">Jadwal Pelaksanaan</p>
              <FormControl fullWidth>
                <Select
                  value={jadwalPelaksanaan}
                  onChange={handleChangeJadwalPelaksanaan}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>Jadwal Pelaksanaan</em>
                  </MenuItem>
                  <MenuItem value={1}>
                    Andrew Tanny Liem, SSi., MT., PhD
                  </MenuItem>
                  <MenuItem value={2}>Debby E. Sondakh, MT, PhD</MenuItem>
                  <MenuItem value={3}>
                    Jimmy H. Moedjahedy, SKom, MKom, MM
                  </MenuItem>
                  <MenuItem value={4}>Joe Y. Mambu, BSIT, MCIS</MenuItem>
                  <MenuItem value={5}>Lidya C. Laoh, SKom, MMSi</MenuItem>
                  <MenuItem value={6}>
                    Oktoverano H. Lengkong, SKom, MDs, MM
                  </MenuItem>
                  <MenuItem value={7}>Reynoldus A. Sahulata, SKom, MM</MenuItem>
                  <MenuItem value={8}>Stenly R. Pungus, MT, PhD</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="mb-5">
            <div>
              <p className="font-semibold mb-2">Lain Lain</p>
              <FormControl fullWidth>
                <Select
                  value={lainnya}
                  onChange={handleChangeLainnya}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>lainnya</em>
                  </MenuItem>
                  <MenuItem value={1}>
                    Andrew Tanny Liem, SSi., MT., PhD
                  </MenuItem>
                  <MenuItem value={2}>Debby E. Sondakh, MT, PhD</MenuItem>
                  <MenuItem value={3}>
                    Jimmy H. Moedjahedy, SKom, MKom, MM
                  </MenuItem>
                  <MenuItem value={4}>Joe Y. Mambu, BSIT, MCIS</MenuItem>
                  <MenuItem value={5}>Lidya C. Laoh, SKom, MMSi</MenuItem>
                  <MenuItem value={6}>
                    Oktoverano H. Lengkong, SKom, MDs, MM
                  </MenuItem>
                  <MenuItem value={7}>Reynoldus A. Sahulata, SKom, MM</MenuItem>
                  <MenuItem value={8}>Stenly R. Pungus, MT, PhD</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="mb-5">
            <div>
              <p className="font-semibold mb-2">Daftar Rujukan</p>
              <FormControl fullWidth>
                <Select
                  value={daftarRujukan}
                  onChange={handleChangeDaftarRujukan}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>Daftar Rujukan</em>
                  </MenuItem>
                  <MenuItem value={1}>
                    Andrew Tanny Liem, SSi., MT., PhD
                  </MenuItem>
                  <MenuItem value={2}>Debby E. Sondakh, MT, PhD</MenuItem>
                  <MenuItem value={3}>
                    Jimmy H. Moedjahedy, SKom, MKom, MM
                  </MenuItem>
                  <MenuItem value={4}>Joe Y. Mambu, BSIT, MCIS</MenuItem>
                  <MenuItem value={5}>Lidya C. Laoh, SKom, MMSi</MenuItem>
                  <MenuItem value={6}>
                    Oktoverano H. Lengkong, SKom, MDs, MM
                  </MenuItem>
                  <MenuItem value={7}>Reynoldus A. Sahulata, SKom, MM</MenuItem>
                  <MenuItem value={8}>Stenly R. Pungus, MT, PhD</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default TugasMahasiswa;
