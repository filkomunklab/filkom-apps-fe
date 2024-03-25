import React, { useState, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CPMKConfig from "./component/CPMKConfig";

const CPMK = () => {
  const [cpmkList, setCpmkList] = useState([]);

  useEffect(() => {
    // Tambahkan CPMK default saat komponen pertama kali dirender
    const defaultCpmk = {
      id: 1,
    };
    setCpmkList([defaultCpmk]);
  }, []);

  const handleAddCpmk = () => {
    const newCpmk = {
      id: cpmkList.length + 1,
    };
    setCpmkList([...cpmkList, newCpmk]);
  };

  const handleDeleteCpmk = (idToDelete) => {
    setCpmkList((prevList) =>
      prevList.filter((cpmk) => cpmk.id !== idToDelete)
    );
  };

  return (
    <div className="bg-white rounded-sm p-5">
      <h1 className="text-base font-semibold mb-5">
        Capaian Pembelajaran Mata Kuliah
      </h1>

      {cpmkList.map((cpmk) => (
        <CPMKConfig
          key={cpmk.id}
          id={cpmk.id}
          onDeleteCpmk={handleDeleteCpmk}
        />
      ))}

      <button
        onClick={handleAddCpmk}
        className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center hover:bg-blue-800 transition-colors duration-300"
      >
        Tambah CPMK
        <AddCircleOutlineIcon style={{ fontSize: 16, marginLeft: 5 }} />
      </button>
    </div>
  );
};

export default CPMK;
