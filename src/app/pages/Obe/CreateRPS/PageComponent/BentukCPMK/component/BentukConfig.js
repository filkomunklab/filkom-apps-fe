import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const BentukConfig = ({ id, onDeleteBentuk }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value !== "" && Number(value) > 0) {
      setInputValue(value);
    } else {
      setInputValue("");
    }
  };
  return (
    <div className="grid grid-cols-2 gap-3 border-b-2 mb-8 pb-5 relative">
      <div>
        <p className="mb-2">Bentuk Penilaian</p>
        <input
          type="text"
          className="border border-gray-300 p-2 w-full rounded-md"
        />
      </div>

      <div>
        <p className="mb-2">Total Per Penilaian</p>
        <input
          type="number"
          inputMode="numeric"
          value={inputValue}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 w-[95%] rounded-md"
        />
      </div>

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <DeleteIcon
          style={{ cursor: "pointer", color: "red" }}
          onClick={() => onDeleteBentuk(id)}
        />
      </div>
    </div>
  );
};

export default BentukConfig;
