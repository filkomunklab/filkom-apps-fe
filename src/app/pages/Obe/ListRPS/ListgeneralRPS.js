import React from "react";
import CardProdi from "./card-prodi";

const prodi = [
  {
    prodi: "Informatika",
    totalRPS: 54 + " RPS",
    totalDosen: 8 + " Dosen",
    kepalaProdi: "Green Mandias, SKom, MCs",
    major: "IF",
  },
  {
    prodi: "Sistem Informasi",
    totalRPS: 54 + " RPS",
    totalDosen: 8 + " Dosen",
    kepalaProdi: "Stenly R. Pungus, MT, PhD",
    major: "SI",
  },
  {
    prodi: "Teknologi Informasi",
    totalRPS: 44 + " RPS",
    totalDosen: 8 + " Dosen",
    kepalaProdi: "Oktoverano H. Lengkong, MDs",
    major: "DKV",
  },
];

const ListGeneralRPS = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center text-3xl font-semibold">
        <h1 className="">RANCANGAN PEMBELAJARAN SEMESTER</h1>
        <h1 className="">FAKULTAS ILMU KOMPUTER</h1>
      </div>

      <div className="mt-16">
        {/* card */}
        <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {prodi.map((item, index) => (
            <CardProdi
              key={index}
              prodi={item.prodi}
              totalRPS={item.totalRPS}
              totalDosen={item.totalDosen}
              kepalaProdi={item.kepalaProdi}
              major={item.major}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListGeneralRPS;
