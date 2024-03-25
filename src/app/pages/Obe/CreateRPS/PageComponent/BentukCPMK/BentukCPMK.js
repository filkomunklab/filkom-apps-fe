import React from "react";
import { useState, useEffect } from "react";
import BentukConfig from "./component/BentukConfig";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const BentukCPMK = () => {
  const [listBentuk, setListBentuk] = useState([]);

  useEffect(() => {
    const defaultBentuk = {
      id: 1,
    };
    setListBentuk([defaultBentuk]);
  }, []);
  const handleAddBentuk = () => {
    const newBentuk = {
      id: listBentuk.length + 1,
    };
    setListBentuk([...listBentuk, newBentuk]);
  };

  const handleDeleteBentuk = (idToDelete) => {
    setListBentuk((prevList) =>
      prevList.filter((bentuk) => bentuk.id !== idToDelete)
    );
  };

  return (
    <div className="bg-white rounded-sm p-5">
      <h1 className="text-base font-semibold mb-5">
        Bentuk Penilaian Pada Tiap CPMK
      </h1>

      {listBentuk.map((bentuk) => (
        <BentukConfig
          key={bentuk.id}
          id={bentuk.id}
          onDeleteBentuk={handleDeleteBentuk}
        />
      ))}
      <button
        onClick={handleAddBentuk}
        className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center hover:bg-blue-800 transition-colors duration-300"
      >
        Tambah Bentuk
        <AddCircleOutlineIcon style={{ fontSize: 16, marginLeft: 5 }} />
      </button>
    </div>
  );
};

export default BentukCPMK;
