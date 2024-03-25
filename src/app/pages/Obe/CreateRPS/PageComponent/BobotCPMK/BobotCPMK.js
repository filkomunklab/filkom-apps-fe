import React from "react";
import { useState, useEffect } from "react";
import BobotListCPMK from "./component/BobotPenilaianCPMK";

const BobotCPMK = () => {
  const [listBobot, setListBobot] = useState([]);

  useEffect(() => {
    const defaultBobots = [
      { id: 1 },
      { id: 2 }, // id:2 for testing
    ];
    setListBobot(defaultBobots);
  }, []);

  return (
    <div className="">
      <h1 className="bg-white rounded-sm p-5 text-base font-semibold">
        Bobot per Bentuk Penilaian Pada Tiap CPMK
      </h1>

      {listBobot.map((bobot) => (
        <div className="bg-white rounded-sm p-5 mt-5">
          <BobotListCPMK key={bobot.id} id={bobot.id} />
        </div>
      ))}
    </div>
  );
};

export default BobotCPMK;
