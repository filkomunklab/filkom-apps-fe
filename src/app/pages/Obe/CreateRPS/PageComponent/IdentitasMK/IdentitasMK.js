import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const IdentitasMK = () => {
  const [MK, setMK] = React.useState("");
  const [kodeMK, setKodeMK] = React.useState("");
  const [rumpunMK, setRumpunMK] = React.useState("");
  const [bobot, setBobot] = React.useState([2, 3, 4]);
  const [sks, setSks] = React.useState("");
  const [pararel, setPararel] = React.useState("");
  const [jadwal, setJadwal] = React.useState("");
  const [semester, setSemester] = React.useState("");
  const [direvisi, setDirevisi] = React.useState("");

  const handleChange = (event) => {
    setMK(event.target.value);
  };

  const handleChangeKodeMK = (event) => {
    setKodeMK(event.target.value);
  };

  const handleChangeRumpunMK = (event) => {
    setRumpunMK(event.target.value);
  };

  const handleBobot = (event) => {
    setBobot(event.target.value);
  };

  const handleSks = (event) => {
    setSks(event.target.value);
  };

  const handlePararel = (event) => {
    setPararel(event.target.value);
  };

  const handleJadwal = (event) => {
    setJadwal(event.target.value);
  };

  const handleSemester = (event) => {
    setSemester(event.target.value);
  };

  const handleDirevisi = (event) => {
    setDirevisi(event.target.value);
  };

  return (
    <div className="bg-white rounded-sm p-5">
      <h1 className="text-base font-semibold mb-5">Identitas Mata Kuliah</h1>
      <div className="mb-5">
        <p className="mb-2">Nama Mata Kuliah</p>
        <FormControl sx={{ minWidth: 120, width: "100%" }}>
          <Select
            value={MK}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>Pilih Mata Kuliah</em>
            </MenuItem>
            <MenuItem value={10}>
              Business Process Reengineering / Rekayasa Proses Bisnis
            </MenuItem>
            <MenuItem value={20}>
              Business Process Reengineering / Rekayasa Proses Bisnis
            </MenuItem>
            <MenuItem value={30}>
              Business Process Reengineering / Rekayasa Proses Bisnis
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="mb-5">
        <p className="mb-2">Ketua Kelompok Keahlian</p>
        <input
          type="text"
          className="w-full border border-gray-400 rounded-md p-2 py-4 hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
          placeholder="Ex.IS3155"
          value={kodeMK}
          onChange={handleChangeKodeMK}
        />
      </div>

      <div className="mb-5">
        <p className="mb-2">Rumpun Mata Kuliah</p>
        <input
          type="text"
          className="w-full border border-gray-400 rounded-md p-2 py-4 hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
          placeholder="Ex.A"
          value={rumpunMK}
          onChange={handleChangeRumpunMK}
        />
      </div>

      <div className="mb-5 grid grid-cols-2 gap-4">
        <div>
          <p className="mb-2">Bobot</p>
          <FormControl sx={{ minWidth: 120, width: "100%" }}>
            <Select
              value={bobot}
              onChange={handleBobot}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Pilih Bobot SKS</em>
              </MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <p className="mb-2">SKS</p>
          <input
            type="number"
            className="w-full border border-gray-400 rounded-md p-2 py-[15px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
            placeholder="Ex.3"
            value={sks}
            onChange={handleSks}
          />
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-4">
        <div>
          <p className="mb-2">Pararel</p>
          <input
            type="text"
            className="w-full border border-gray-400 rounded-md p-2 py-[15px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
            placeholder="Ex.A"
            value={pararel}
            onChange={handlePararel}
          />
        </div>

        <div>
          <p className="mb-2">Jadwal</p>
          <input
            type="text"
            className="w-full border border-gray-400 rounded-md p-2 py-[15px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
            placeholder="Ex. Rabu [8.40 - 12.00] at GK1-402"
            value={jadwal}
            onChange={handleJadwal}
          />
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-4">
        <div>
          <p className="mb-2">Semester</p>
          <FormControl sx={{ minWidth: 120, width: "100%" }}>
            <Select
              value={semester}
              onChange={handleSemester}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Pilih Semester</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <p className="mb-2">Direvisi</p>
          {/* set calendar */}
          <input
            type="date"
            className="w-full border border-gray-400 rounded-md p-2 py-[14px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
            value={direvisi}
            onChange={handleDirevisi}
          />
        </div>
      </div>
    </div>
  );
};
export default IdentitasMK;
