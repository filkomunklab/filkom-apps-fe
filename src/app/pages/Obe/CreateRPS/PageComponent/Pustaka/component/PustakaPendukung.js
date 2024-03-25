import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const PustakaPendukung = () => {
  const [pustakaList, setPustakaList] = useState([{ id: 1, text: "" }]);

  const handleAddPustaka = () => {
    const newPustakaList = [
      ...pustakaList,
      { id: pustakaList.length + 1, text: "" },
    ];
    setPustakaList(newPustakaList);
  };

  const handleDeletePustaka = (id) => {
    const filteredList = pustakaList.filter((pustaka) => pustaka.id !== id);
    setPustakaList(filteredList);
  };

  const handlePustakaChange = (id, newText) => {
    const updatedList = pustakaList.map((pustaka) =>
      pustaka.id === id ? { ...pustaka, text: newText } : pustaka
    );
    setPustakaList(updatedList);
  };

  return (
    <div className="">
      <h1 className="font-semibold">Pustaka Pendukung :</h1>
      {pustakaList.map((pustaka) => (
        <div
          key={pustaka.id}
          className="flex justify-center items-center px-5 py-2 mb-5"
        >
          <p>{pustaka.id}. </p>
          <textarea
            className="border-2 border-gray-300 rounded-md w-full mx-5 p-2"
            rows="2"
            value={pustaka.text}
            onChange={(e) => handlePustakaChange(pustaka.id, e.target.value)}
          ></textarea>
          <DeleteIcon
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleDeletePustaka(pustaka.id)}
          />
        </div>
      ))}
      <div>
        <button
          className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center hover:bg-blue-800 transition-colors duration-300"
          onClick={handleAddPustaka}
        >
          Tambah Pustaka Pendukung
          <AddCircleOutlineIcon style={{ fontSize: 16, marginLeft: 5 }} />
        </button>
      </div>
    </div>
  );
};

export default PustakaPendukung;
