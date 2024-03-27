import React, { useRef, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IdentitasMK from "./PageComponent/IdentitasMK/IdentitasMK";
import Otoritas from "./PageComponent/Otoritas/Otoritas";
import DeskripsiMK from "./PageComponent/DeskripsiMK/DeskripsiMK";
import CPLProdi from "./PageComponent/CPLProdi/CPLProdi";
import CPMK from "./PageComponent/CPMK/CPMK";
import BentukCPMK from "./PageComponent/BentukCPMK/BentukCPMK";
import BobotCPMK from "./PageComponent/BobotCPMK/BobotCPMK";
import Pustaka from "./PageComponent/Pustaka/Pustaka";
import MediaPembelajaran from "./PageComponent/MediaPembelajaran/MediaPembelajaran";
import RencanaPertemuan from "./PageComponent/RencanaPertemuan/RencanaPertemuan";
import RencanaTugas from "./PageComponent/RencanaTugas/RencanaTugas";
import { Form, Formik } from "formik";
import { Persist } from "formik-persist";

const initialValues = {
  teacherId: "",
  subjectId: "",
  subjectFamily: "",
  subjectDescription: "",
  parallel: "",
  semester: 0,
  schedule: "",
  rpsDeveloper: "",
  headOfExpertise: "",
  headOfProgramStudy: "",
  cpmk: [
    {
      description: "",
      code: "",
      supportedCplIds: [],
    },
  ],
  gradingSystem: [
    {
      label: "",
      value: 0,
    },
  ],
  cpmkGrading: [
    {
      code: "",
      totalGradingWeight: 0,
      gradingSystem: [
        {
          gradingName: "",
          gradingWeight: 0,
        },
      ],
    },
  ],
  mainReferences: [""],
  supportingReferences: [""],
  software: "",
  hardware: "",
  teamTeaching: [""],
  minPassStudents: "",
  minPassGrade: "",
  meetingPlan: [
    {
      week: "",
      cpmkList: [""],
      subCpmkDescription: "",
      achievementIndicators: "",
      assessmentModel: "",
      material: "",
      method: "",
      offlineActivity: "",
      onlineActivity: "",
    },
  ],
  studentAssignmentPlan: [
    {
      title: "",
      assignmentModel: "",
      references: "",
      subLearningOutcomes: "",
      assignmentDescription: "",
      icbValuation: "",
      dueSchedule: "",
      others: "",
      referenceList: "",
    },
  ],
};

const CreateRPS = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <IdentitasMK />;
      case 2:
        return <Otoritas />;
      case 3:
        return <DeskripsiMK />;
      case 4:
        return <CPLProdi />;
      case 5:
        return <CPMK />;
      case 6:
        return <BentukCPMK />;
      case 7:
        return <BobotCPMK />;
      case 8:
        return <Pustaka />;
      case 9:
        return <MediaPembelajaran />;
      case 10:
        return <RencanaPertemuan />;
      case 11:
        return <RencanaTugas />;
      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className="flex flex-row justify-between text-2xl font-semibold mb-5">
        <h1 className="">RANCANGAN PEMBELAJARAN SEMESTER</h1>
        <p>{`${currentStep}/11`}</p>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({}) => (
          <Form>
            {renderStepContent()}
            <div className="bg-white p-5 rounded-sm flex flex-row justify-between items-center my-5">
              <div>
                <h4>Halaman dari 11</h4>
              </div>
              <div>
                {currentStep !== 1 && (
                  <button
                    onClick={handleBack}
                    className="border border-blue-500 text-blue-500 p-2 px-3 rounded-xl mx-2  hover:bg-blue-500 transition-colors duration-300 hover:text-white shadow-md"
                  >
                    <ArrowBackIosNewIcon fontSize="small" />
                  </button>
                )}
                {currentStep !== 11 ? (
                  <button
                    onClick={handleNext}
                    className="bg-blue-500 text-white p-2 rounded-xl mx-2 hover:bg-blue-700 transition-colors duration-300 shadow-md"
                  >
                    <span className="mx-2">BERIKUTNYA</span>
                    <ArrowForwardIosIcon fontSize="small" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="bg-blue-500 text-white p-2 rounded-xl mx-2 hover:bg-blue-700 transition-colors duration-300 shadow-md"
                    disabled
                  >
                    <span className="mx-2">SELESAI</span>
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-xl mx-2 hover:bg-blue-700 transition-colors duration-300 shadow-md"
                >
                  <span className="mx-2">SELESAI</span>
                </button>
                <button
                  type="reset"
                  className="bg-blue-500 text-white p-2 rounded-xl mx-2 hover:bg-blue-700 transition-colors duration-300 shadow-md"
                >
                  <span className="mx-2">Reset</span>
                </button>
              </div>
            </div>
            <Persist debounce={500} name="rps-form" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateRPS;
