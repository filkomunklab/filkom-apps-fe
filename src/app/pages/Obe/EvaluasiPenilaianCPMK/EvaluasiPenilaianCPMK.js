import { useState } from "react";
import { Button, ButtonGroup, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UpdateIcon from "@mui/icons-material/Update";
import AccordionContent from "./AccordionContent";
import { UploadModal } from "./Components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDetailReport, putReportDetail } from "app/api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { convertShortMajor } from "app/utils/appHelpers";
import moment from "moment";
import NotfoundAnimation from "app/shared/NotfoundAnimation";

const EvaluasiPenilaianCPMK = () => {
  const [open, setOpen] = useState(false);
  const { rpsId } = useParams();
  const queryClient = useQueryClient();

  const reportDetailQuery = useQuery({
    queryFn: () => getDetailReport(rpsId),
    queryKey: ["reportDetail", rpsId],
  });

  const reportDetailMutation = useMutation({
    mutationFn: putReportDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reportDetail", rpsId] });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Report detail has been updated",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    },
  });

  if (reportDetailQuery.status === "pending" && !reportDetailQuery.data) {
    return <CircularProgress color="info" />;
  }

  return (
    <div className="">
      <UploadModal open={open} setOpen={setOpen} />
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-semibold">
          {`${reportDetailQuery.data?.subjectName}`}
        </h1>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
          size="small"
        >
          <Button endIcon={<AddIcon />} onClick={() => setOpen(true)}>
            Upload Students
          </Button>
          <Button
            endIcon={<UpdateIcon />}
            onClick={() => reportDetailMutation.mutate(rpsId)}
          >
            Update Data
          </Button>
        </ButtonGroup>
      </div>

      {reportDetailQuery.data ? (
        <>
          <div className="bg-secondary rounded-lg p-5 flex flex-row mb-10">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="text-lg font-semibold w-40">Program Studi</td>
                  <td className="text-lg">{`: ${convertShortMajor(
                    reportDetailQuery.data?.major
                  )}`}</td>
                </tr>
                <tr>
                  <td className="text-lg font-semibold w-40">SKS/Parallel</td>
                  <td className="text-lg">{`: ${reportDetailQuery.data?.credits} / ${reportDetailQuery.data?.parallel}`}</td>
                </tr>
              </tbody>
            </table>

            <table className="w-full">
              <tbody>
                <tr>
                  <td className="text-lg font-semibold w-40">Dosen</td>
                  <td className="text-lg">{`: ${reportDetailQuery.data?.teacher}`}</td>
                </tr>

                <tr>
                  <td className="text-lg font-semibold w-40">Jadwal</td>
                  <td className="text-lg">{`: ${reportDetailQuery.data?.schedule}`}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-semibold mb-10">
                Daftar Data Nilai Mahasiwa (CPMK)
              </h1>
              <div className="text-lg">
                <p className="font-semibold mr-2">
                  LAST EDIT:{" "}
                  <span className="mr-5 font-normal">
                    {moment(reportDetailQuery.data?.updateAt).format(
                      "MM/DD/YYYY, h:mm A"
                    )}
                  </span>
                </p>
              </div>
            </div>

            {reportDetailQuery.data?.studentGrade.map((item, index) => {
              return (
                <div className="mb-5" key={index}>
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <div className="flex flex-row justify-between w-full">
                        <h1 className="text-lg font-semibold">
                          {item.code}
                          {": "}
                          <span className="text-red-600 font-normal">
                            *Click on Grading header to submit student Grade
                          </span>
                        </h1>
                      </div>
                    </AccordionSummary>

                    <AccordionDetails>
                      <AccordionContent
                        item={item}
                        cpmkGrading={reportDetailQuery.data?.Rps.CpmkGrading}
                      />
                    </AccordionDetails>
                  </Accordion>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <NotfoundAnimation message={"Consider upload student first"} />
      )}
    </div>
  );
};

export default EvaluasiPenilaianCPMK;
