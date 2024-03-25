import React from "react";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import { Form } from "react-router-dom";

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

const namaDosen = [
  "Andrew Tanny Liem, SSi., MT., PhD",
  "Stenly R. Pungus, MT, PhD",
  "Green Mandias, SKom, MCs",
  "Oktoverano H. Lengkong, SKom, MDs, MM",
  "Debby E. Sondakh, MT, PhD",
  "Joe Y. Mambu, BSIT, MCIS",
  "Lidya C. Laoh, SKom, MMSi",
  "Reynoldus A. Sahulata, SKom, MM",
  "Jimmy H. Moedjahedy, SKom, MKom, MM",
];

function getStyles(namaDosen, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(namaDosen) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MediaPembelajaran = () => {
  const theme = useTheme();
  const [dosen, setDosen] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDosen(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleDelete = (chipToDelete) => () => {
    setDosen((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  return (
    <div>
      <div className="bg-white rounded-sm p-5 my-5">
        <h1 className="text-lg font-semibold mb-5">Media Pembelajaran</h1>

        <div className="mb-5 grid grid-cols-2 gap-4">
          <div>
            <p className="mb-2">Software</p>
            <input
              type="text"
              className="w-full border border-gray-400 rounded-md p-2 py-[15px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Ex.Arena Simulation Software"
            />
          </div>

          <div>
            <p className="mb-2">Hardware</p>
            <input
              type="text"
              className="w-full border border-gray-400 rounded-md p-2 py-[15px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Ex. Komputer/Laptop, Proyektor, dll"
            />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-sm p-5 my-5">
        <h1 className="text-lg font-semibold mb-5">Team Teaching</h1>

        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-multiple-chip-label">Nama Dosen</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={dosen}
            onChange={handleChange}
            input={
              <OutlinedInput id="select-multiple-chip" label="Nama Dosen" />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    onDelete={handleDelete(value)}
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {namaDosen.map((nama) => (
              <MenuItem
                key={nama}
                value={nama}
                style={getStyles(nama, dosen, theme)}
              >
                {nama}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="bg-white rounded-sm p-5 my-5">
        <h1 className="text-lg font-semibold mb-5">MataKuliah Syarat</h1>

        <div>
          <table className="w-full border-collapse border">
            <thead className="bg-stone-200">
              <tr>
                <th className="border text-left px-2">Nama Matakuliah</th>
                <th className="border px-2">Jumlah Credit(s)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2">
                  [IS1222] Pengantar Akuntansi Keuangan/ Introduction to
                  Financial Accounting
                </td>
                <td className="border text-center px-2">3</td>
              </tr>
              <tr>
                <td className="border px-2">
                  [IS1222] Pengantar Akuntansi Keuangan/ Introduction to
                  Financial Accounting
                </td>
                <td className="border text-center px-2">3</td>
              </tr>
              <tr>
                <td className="border px-2">
                  [IS1222] Pengantar Akuntansi Keuangan/ Introduction to
                  Financial Accounting
                </td>
                <td className="border text-center px-2">3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white rounded-sm p-5 my-5">
        <h1 className="text-lg font-semibold mb-5">Ambang Batas Kelulusan</h1>

        <div className="mb-5 grid grid-cols-2 gap-4">
          <div>
            <p className="mb-2">Mahasiswa</p>
            <input
              type="text"
              className="w-full border border-gray-400 rounded-md p-2 py-[15px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="50.01"
            />
          </div>

          <div>
            <p className="mb-2">Matakuliah</p>
            <input
              type="text"
              className="w-full border border-gray-400 rounded-md p-2 py-[15px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Ex. Komputer/Laptop, Proyektor, dll"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPembelajaran;
