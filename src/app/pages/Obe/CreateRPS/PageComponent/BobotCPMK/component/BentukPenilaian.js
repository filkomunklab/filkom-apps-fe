import React from "react";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";

const BentukPenilaian = () => {
  const [BentukPenilaian, setBentukPenilaian] = useState([]);
  const [bobotTerpakai, setBobotTerpakai] = useState(0);
  const [totalPerPenilaian, setTotalPerPenilaian] = useState(11);

  const handleChangeBentukPenilaian = (event) => {
    setBentukPenilaian(event.target.value);
  };

  const handleChangeBobotTerpakai = (event) => {
    const inputBobot = parseInt(event.target.value, 10);
    setBobotTerpakai(inputBobot);
  };

  const sisaBobot = totalPerPenilaian - bobotTerpakai;

  return (
    <div className="grid grid-cols-2 gap-3 mb-10">
      <div>
        <div className="flex justify-between">
          <p className="font-semibold mb-2">Bentuk Penilaian</p>
          <p>
            Total per Penilaian : <span>{totalPerPenilaian}</span>
          </p>
        </div>
        <FormControl fullWidth>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={BentukPenilaian}
            onChange={handleChangeBentukPenilaian}
            inputProps={{ "aria-label": "Without label" }}
          >
            {/* {BentukPenilaian.map((name) => (
                        <MenuItem key={name} value={name}>
                            {name}
                        </MenuItem>
                    ))} pake ini kalo mau pake map
                     */}

            <MenuItem value={10}>Ujian Tengah Semester</MenuItem>
            <MenuItem value={20}>Ujian Akhir Semester</MenuItem>
            <MenuItem value={30}>Tugas</MenuItem>
            <MenuItem value={40}>Praktikum</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <div className="flex justify-between">
          <p className="font-semibold mb-2">Total per Penilaian</p>
          <p>
            Sisa Bobot : <span>{sisaBobot}</span>
          </p>
        </div>
        <input
          type="number"
          className="border border-gray-300 p-2 w-full h-[53px] rounded-md active:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300"
          value={bobotTerpakai}
          onChange={handleChangeBobotTerpakai}
          min={0}
        />
        {sisaBobot < 0 && (
          <div className="text-end mt-2">
            <p className="text-red-500 text-xs">Bobot Melebihi Limit</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BentukPenilaian;
