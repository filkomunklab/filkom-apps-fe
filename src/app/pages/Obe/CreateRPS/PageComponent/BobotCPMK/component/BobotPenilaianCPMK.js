import React from "react";
import { useState, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BentukPenilaian from "./BentukPenilaian";

const BobotPenilaianCPMK = () => {
  const [listBentukPenilaian, setListBentukPenilaian] = useState([]);

  useEffect(() => {
    const defaultBentukPenilaian = {
      id: 1,
    };
    setListBentukPenilaian([defaultBentukPenilaian]);
  }, []);

  const handleAddBentukPenilaian = () => {
    const newBentukPenilaian = {
      id: listBentukPenilaian.length + 1,
    };
    setListBentukPenilaian([...listBentukPenilaian, newBentukPenilaian]);
  };

  return (
    <div className="">
      <div className="flex justify-between mb-5 border-b-[1px] pb-2">
        <h1 className="text-xl font-semibold">CPMK 1</h1>
        <p className="text-base font-semibold">
          Total bobot : <span>11</span>
        </p>
      </div>

      {listBentukPenilaian.map((bentukPenilaian) => (
        <BentukPenilaian key={bentukPenilaian.id} id={bentukPenilaian.id} />
      ))}

      <div>
        <button
          onClick={handleAddBentukPenilaian}
          className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center hover:bg-blue-800 transition-colors duration-300"
        >
          Tambah Bentuk
          <AddCircleOutlineIcon style={{ fontSize: 16, marginLeft: 5 }} />
        </button>
      </div>
    </div>
  );
};

export default BobotPenilaianCPMK;
