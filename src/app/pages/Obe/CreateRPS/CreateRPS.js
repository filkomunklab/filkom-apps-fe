import { useEffect, useRef, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IdentitasMK from "./PageComponent/IdentitasMK/IdentitasMK";
import Otoritas from "./PageComponent/Otoritas/Otoritas";
import CPMK from "./PageComponent/CPMK/CPMK";
import BentukCPMK from "./PageComponent/BentukCPMK/BentukCPMK";
import BobotCPMK from "./PageComponent/BobotCPMK/BobotCPMK";
import Pustaka from "./PageComponent/Pustaka/Pustaka";
import MediaPembelajaran from "./PageComponent/MediaPembelajaran/MediaPembelajaran";
import RencanaPertemuan from "./PageComponent/RencanaPertemuan/RencanaPertemuan";
import RencanaTugas from "./PageComponent/RencanaTugas/RencanaTugas";
import { Form, Formik } from "formik";
import { Persist } from "formik-persist";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { postRps } from "app/api";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { UploadFile } from "@mui/icons-material";

const initialValues = {
  teacherId: "",
  subjectId: "",
  subjectFamily: "",
  subjectDescription: "",
  parallel: "",
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
      left: 0,
    },
  ],
  cpmkGrading: [],
  mainReferences: [""],
  supportingReferences: [""],
  software: "",
  hardware: "",
  teamTeaching: [],
  minPassStudents: "",
  minPassGrade: "",
  meetingPlan: [
    {
      week: "",
      cpmkList: [],
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
  const formik = useRef(null);
  const navigate = useNavigate();

  const handleNext = (event) => {
    event.preventDefault();
    setCurrentStep(currentStep + 1);
  };

  const handleBack = (event) => {
    event.preventDefault();
    setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <IdentitasMK />;
      case 2:
        return <Otoritas />;
      case 3:
        return <CPMK />;
      case 4:
        return <BentukCPMK />;
      case 5:
        return <BobotCPMK />;
      case 6:
        return <Pustaka />;
      case 7:
        return <MediaPembelajaran />;
      case 8:
        return <RencanaPertemuan />;
      case 9:
        return <RencanaTugas />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    formik.current?.setFieldValue("teacherId", user.id);
  }, []);

  const rpsMutation = useMutation({
    mutationFn: postRps,
    onSuccess: () => {
      localStorage.removeItem("rps-form");
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "RPS berhasil dibuat",
      });
      navigate("/obe/list-rps");
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Gagal membuat RPS",
        text: error.response.data.message,
      });
      console.error(error);
    },
  });

  return (
    <div className="">
      <div className="flex flex-row justify-between text-2xl font-semibold mb-5">
        <h1 className="">RANCANGAN PEMBELAJARAN SEMESTER</h1>
        <p>{`${currentStep}/9`}</p>
      </div>

      <Formik
        onReset={() => setCurrentStep(1)}
        innerRef={formik}
        initialValues={initialValues}
        onSubmit={(values) => {
          rpsMutation.mutate(values);
        }}
        validationSchema={createRpsSchema}
        validateOnMount={true}
      >
        {({ isValid }) => (
          <Form>
            {renderStepContent()}
            <div className="bg-white p-5 rounded-sm flex flex-row justify-between items-center my-5">
              <div>
                <h4>{`Halaman ${currentStep} dari 9`}</h4>
              </div>
              <div>
                {currentStep !== 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="border border-blue-500 text-blue-500 p-2 px-3 rounded-xl mx-2  hover:bg-blue-500 transition-colors duration-300 hover:text-white shadow-md"
                  >
                    <ArrowBackIosNewIcon fontSize="small" />
                  </button>
                )}
                {currentStep !== 9 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-blue-500 text-white p-2 rounded-xl mx-2 hover:bg-blue-700 transition-colors duration-300 shadow-md disabled:bg-blue-300"
                  >
                    <span className="mx-2">BERIKUTNYA</span>
                    <ArrowForwardIosIcon fontSize="small" />
                  </button>
                ) : (
                  <LoadingButton
                    className="rounded-xl"
                    variant="contained"
                    type="submit"
                    loadingPosition="end"
                    endIcon={<UploadFile />}
                    loading={rpsMutation.isPending}
                    disabled={!isValid}
                  >
                    Simpan
                  </LoadingButton>
                )}
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

const calculateTotalGradingWeight = function (value) {
  const gradingWeight = this.parent.gradingSystem.map(
    (grading) => grading.gradingWeight
  );
  return gradingWeight.reduce((a, b) => a + b, 0) === value;
};

const createRpsSchema = yup
  .object()
  .shape({
    teacherId: yup.string().required(),
    subjectId: yup.string().required("Required"),
    subjectFamily: yup.string().required("Required"),
    subjectDescription: yup.string().required("Required"),
    parallel: yup
      .string()
      .length(1, "Must be a single alphabetical character")
      .matches(/^[A-Za-z]$/, "Must be a single alphabetical character")
      .required("Required"),
    schedule: yup.string().required("Required"),
    rpsDeveloper: yup.string().required("Required"),
    headOfExpertise: yup.string().required("Required"),
    headOfProgramStudy: yup.string().required("Required"),
    gradingSystem: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required("Required"),
          value: yup
            .number()
            .positive("Must be a positive number")
            .max(100, "Must be less than or equal to 100")
            .required("Required"),
        })
      )
      .test("is-valid-total", "Total weight must be 100", (value) => {
        const total = value.reduce((a, b) => a + b.value, 0);
        if (total !== 100) {
          throw new yup.ValidationError(
            "Total weight must be 100",
            value,
            "customValidation.gradingSystem"
          );
        }
        return true;
      })
      .min(1, "Must have at least one grading system"),
    cpmk: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            description: yup.string().required("Required"),
            code: yup
              .string()
              .required("Required")
              .matches(/^\S+$/, "No spaces allowed"),
            supportedCplIds: yup
              .array()
              .of(yup.string())
              .min(1, "Must have at least one CPL")
              .required(),
          })
          .noUnknown()
      )
      .min(1, "Must have at least one CPMK")
      .required(),
    cpmkGrading: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            code: yup.string().required(),
            // this total height must same with sum of gradingWeight
            totalGradingWeight: yup
              .number()
              .required()
              .test(
                "is-valid-total-weight",
                "Total weight must same with sum of gradingWeight ",
                calculateTotalGradingWeight
              ),
            gradingSystem: yup
              .array()
              .of(
                yup
                  .object()
                  .shape({
                    gradingName: yup.string().required("Required"),
                    gradingWeight: yup
                      .number()
                      .positive("Must be a positive number")
                      .max(100, "Must be less than or equal to 100")
                      .required("Required"),
                  })
                  .noUnknown()
              )
              .min(1, "Must have at least one grading system")
              .required(),
          })
          .noUnknown()
      )
      .test("is-valid-sum", "Total weight must be 100", (value) => {
        const total = value.reduce((a, b) => a + b.totalGradingWeight, 0);
        if (total !== 100) {
          throw new yup.ValidationError(
            "Total weight must be 100",
            value,
            "customValidation.cpmkGrading"
          );
        }
        return true;
      })
      .min(1, "Must have at least one CPMK grading"),
    mainReferences: yup
      .array()
      .of(yup.string().required("Required"))
      .min(1, "Must have at least one main reference"),
    supportingReferences: yup
      .array()
      .of(yup.string().required("Required"))
      .min(1, "Must have at least one supporting reference"),
    software: yup.string().required("Required"),
    hardware: yup.string().required("Required"),
    teamTeaching: yup
      .array()
      .of(yup.string())
      .min(1, "Must have at least one team teaching")
      .required(),
    minPassStudents: yup.string().required("Required"),
    minPassGrade: yup.string().required("Required"),
    meetingPlan: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            week: yup.string().required("Required"),
            cpmkList: yup
              .array()
              .of(yup.string().required("Required"))
              .min(1, "Must have at least one CPMK")
              .required("Required"),
            subCpmkDescription: yup.string().required("Required"),
            achievementIndicators: yup.string().required("Required"),
            assessmentModel: yup.string().required("Required"),
            material: yup.string().required("Required"),
            method: yup.string().required("Required"),
            offlineActivity: yup.string().required("Required"),
            onlineActivity: yup.string().required("Required"),
          })
          .noUnknown()
      )
      .min(1, "Must have at least one meeting plan")
      .required(),
    studentAssignmentPlan: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            assignmentModel: yup.string().required("Required"),
            references: yup.string().required("Required"),
            subLearningOutcomes: yup.string().required("Required"),
            assignmentDescription: yup.string().required("Required"),
            icbValuation: yup.string().required("Required"),
            dueSchedule: yup.string().required("Required"),
            others: yup.string().required("Required"),
            referenceList: yup.string().required("Required"),
          })
          .noUnknown()
      )
      .min(1, "Must have at least one assignment plan")
      .required(),
  })
  .noUnknown();

export default CreateRPS;
