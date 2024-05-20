import { Close } from "@mui/icons-material";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Modal } from "@mui/material";

const StatisticModal = ({
  mainData,
  comparisonData,
  open,
  onClose = () => {},
}) => {
  const data = mainData?.map((item, index) => ({
    ...item,
    comparison: comparisonData?.StudentGrade?.[index]?.average,
  }));
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white w-[55vw] rounded-3xl relative">
          <div className="absolute p-5 top-0 right-0">
            <button onClick={onClose}>
              <Close />
            </button>
          </div>

          <div className="flex flex-row items-center p-5">
            <div className="w-2/5 h-[40vh]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                  <PolarGrid />
                  <PolarAngleAxis
                    dataKey="code"
                    tick={({ payload, x, y, textAnchor }) => (
                      <text x={x} y={y} dy={5} textAnchor={textAnchor}>
                        {payload.value}
                      </text>
                    )}
                  />
                  <PolarRadiusAxis angle={90} ticks={[20, 40, 60, 80, 100]} />
                  <Radar
                    name="Representasi CPMK Kelas"
                    dataKey="average"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Representasi CPMK Mahasiswa"
                    dataKey="comparison"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.6}
                  />
                  <Legend align="left" iconType="circle" />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="w-3/5">
              <h2 className="text-xl font-semibold">
                Performasi CPMK Matakuliah
              </h2>
              <p className=" font-semibold">
                Berikut ini adalah kalulasi penilaian kekuatan serta kelemahan
                pada setiap poin penilaian.
              </p>
              <div className="flex items-start my-10">
                <div className="flex flex-col items-center p-5 bg-secondary  border-[0.5px] rounded-l-2xl border-stone-500">
                  <h2 className="text-xl font-semibold">CPMK TERTINGGI</h2>
                  <h1 className="text-2xl font-bold my-2 text-green-700">
                    {comparisonData?.maxGrade?.average.toFixed(2)}
                  </h1>
                  <h2 className="text-xl font-semibold text-stone-400">
                    DIPOSISI {comparisonData?.maxGrade?.code}
                  </h2>
                </div>
                <div className="flex flex-col items-center p-5 bg-secondary border-[0.5px] rounded-r-2xl border-stone-500">
                  <h2 className="text-xl font-semibold">CPMK TERENDAH</h2>
                  <h1 className="text-2xl font-bold my-2 text-red-700">
                    {comparisonData?.minGrade?.average.toFixed(2)}
                  </h1>
                  <h2 className="text-xl font-semibold text-stone-400">
                    DIPOSISI {comparisonData?.minGrade?.code}
                  </h2>
                </div>
              </div>
              <p className="text-lg font-semibold text-stone-700">Informasi:</p>
              <p className="text-stone-500">
                Batas Lulus CPMK adalah 70.50 unutuk setiap CPMK-nya
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StatisticModal;
