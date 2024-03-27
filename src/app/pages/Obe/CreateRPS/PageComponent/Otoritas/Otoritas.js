import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useQuery } from "@tanstack/react-query";
import { getTeacher } from "app/api";
import { useFormikContext } from "formik";

const Otoritas = () => {
  const { handleChange, values } = useFormikContext();
  const [Pengembang, setPengembang] = React.useState("");

  const [Kaprodi, setKaprodi] = React.useState("");

  const handleChangePengembang = (event) => {
    setPengembang(event.target.value);
  };

  const handleChangeKaprodi = (event) => {
    setKaprodi(event.target.value);
  };

  const employee = useQuery({
    queryKey: ["employee"],
    queryFn: getTeacher,
  });

  return (
    <div className="bg-white rounded-sm p-5">
      <h1 className="text-base font-semibold mb-5">Otoritas</h1>
      <div className="mb-5">
        <p className="mb-2">Pengembangan RPS</p>
        <FormControl sx={{ minWidth: 120, width: "100%" }}>
          <Select
            value={Pengembang}
            onChange={handleChangePengembang}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>Pilih Pengembang</em>
            </MenuItem>
            {employee.data?.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="mb-5">
        <p className="mb-2">Ketua Kelompok Keahlian</p>
        <input
          name="headOfExpretise"
          type="text"
          className="w-full border border-gray-400 rounded-md p-2 py-4 hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
          placeholder="Ex.Andrew Tanny Liem, SSi., MT., PhD"
          value={values.headOfExpretise}
          onChange={handleChange}
        />
      </div>

      <div className="">
        <p className="mb-2">Kaprodi</p>
        <FormControl sx={{ minWidth: 120, width: "100%" }}>
          <Select
            value={Kaprodi}
            onChange={handleChangeKaprodi}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>Pilih Kaprodi</em>
            </MenuItem>
            <MenuItem value={10}>Andrew Tanny Liem, SSi., MT., PhD</MenuItem>
            <MenuItem value={20}>Stenly R. Pungus, MT, PhD</MenuItem>
            <MenuItem value={30}>
              Oktoverano H. Lengkong, SKom, MDs, MM
            </MenuItem>
            <MenuItem value={40}>Green Mandias, SKom, MCs</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
export default Otoritas;
