import React, { useState } from "react";
import RencanaPertemuanAccordion from "./component/RencanaPertemuanAccordion";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const RencanaPertemuan = () => {
  const [jumlahPertemuan, setJumlahPertemuan] = useState(1);

  const tambahPertemuan = () => {
    setJumlahPertemuan(jumlahPertemuan + 1);
  };

  const renderPertemuanAccordions = () => {
    let pertemuanArray = [];
    for (let i = 0; i < jumlahPertemuan; i++) {
      pertemuanArray.push(<RencanaPertemuanAccordion key={i} />);
    }
    return pertemuanArray;
  };

  return (
    <div className="bg-white rounded-sm p-5">
      <h1 className="text-lg font-semibold mb-10">Rencana Pertemuan</h1>

      {renderPertemuanAccordions()}

      <div>
        <button
          className="mt-5 bg-blue-600 text-white px-3 py-2 rounded-md flex items-center hover:bg-blue-800 transition-colors duration-300"
          onClick={tambahPertemuan}
        >
          Tambah Pertemuan
          <AddCircleOutlineIcon style={{ fontSize: 16, marginLeft: 5 }} />
        </button>
      </div>
    </div>
  );
};

export default RencanaPertemuan;
