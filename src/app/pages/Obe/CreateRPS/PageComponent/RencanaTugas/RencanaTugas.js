import React, { useState } from "react";
import TugasMahasiswa from "./component/TugasMahasiswa";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const RencanaTugas = () => {
  const [jumlahTugas, setJumlahTugas] = useState(1);

  const tambahTugas = () => {
    setJumlahTugas(jumlahTugas + 1);
  };

  const renderTugas = () => {
    let tugasArray = [];
    for (let i = 0; i < jumlahTugas; i++) {
      tugasArray.push(<TugasMahasiswa key={i} />);
    }
    return tugasArray;
  };

  return (
    <div className="bg-white rounded-sm p-5">
      <h1 className="text-lg font-semibold mb-10">Rencana Tugas Mahasiswa</h1>

      <div className="mb-5">{renderTugas()}</div>

      <div>
        <button
          className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center hover:bg-blue-800 transition-colors duration-300"
          onClick={tambahTugas}
        >
          Tambah Rencana Tugas
          <AddCircleOutlineIcon style={{ fontSize: 16, marginLeft: 5 }} />
        </button>
      </div>
    </div>
  );
};

export default RencanaTugas;
