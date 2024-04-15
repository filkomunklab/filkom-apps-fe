import React from "react";
import { Button } from "@mui/material";
import { ASSET_IMAGES } from "../../../utils/constants/paths";
import { useNavigate } from "react-router-dom";
import { convertShortMajor } from "app/utils/appHelpers";

export default function CardProdi({ item }) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/obe/all-list-rps/${item.major}`);
  };
  return (
    <div className="relative shadow-xl flex flex-col justify-between rounded-3xl h-[500px] mx-5">
      <div
        className=" h-1/2 bg-primary text-center text-white flex flex-col justify-center items-center rounded-t-3xl"
        style={{
          backgroundImage: `url(${ASSET_IMAGES}/logo-filkom.svg)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left -100px center",
          backgroundSize: "contain",
        }}
      >
        <h3 className="text-lg font-medium">Program Studi</h3>
        <h1 className="text-3xl font-semibold">
          {convertShortMajor(item.major)}
        </h1>
      </div>
      <div className="h-1/2 bg-white flex flex-col justify-around px-5 rounded-b-3xl">
        <div className="">
          <table className="w-full">
            <tbody className>
              <tr>
                <td className="text-lg w-32">Total RPS</td>
                <td className="text-lg font-semibold">
                  : {item.totalRps ?? "-"}
                </td>
              </tr>
              {/* <tr>
                <td className="text-lg w-32">Total Dosen</td>
                <td className="text-lg font-semibold">: {totalDosen}</td>
              </tr> */}
              <tr>
                <td className="text-lg w-32">Kepala Prodi</td>
                <td className="text-lg font-semibold">
                  :{" "}
                  {item.headOfProgramStudy
                    ? `${item.headOfProgramStudy.firstName} ${item.headOfProgramStudy.lastName}`
                    : "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="">
          <Button
            className="!rounded-xl w-full py-5"
            variant="contained"
            color="primary"
            onClick={handleNavigate}
          >
            Masuk
          </Button>
        </div>
      </div>
    </div>
  );
}
