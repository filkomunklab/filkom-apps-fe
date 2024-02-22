import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import ErrorIcon from "@mui/icons-material/Error";
import AccordionContent from "./AccordionContent";

const EvaluasiPenilaianCPMK = () => {
  const [open, setOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
      // Call your backend API endpoint to upload files
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white rounded-lg p-10">
            <h1 className="text-3xl font-semibold mb-5">Upload Data Siswa</h1>
            <div className="bg-secondary rounded-md p-5 mb-10">
              <h1 className="text-lg font-medium">
                <span className="text-blue-600 mr-2">
                  <ErrorIcon />
                </span>
                Persiapkan file CSV
              </h1>
              <div className="pl-8">
                <ul className="list-disc text-lg font-medium text-gray-500 py-5 pl-[18px]">
                  <li>Pastikan file yang anda upload harus berbentuk .csv</li>
                  <li>Periksa kembali jika ada data yang sama.</li>
                  <li>500 baris data maksimal dalam satu file .csv</li>
                </ul>
                <p className="text-xl font-medium text-blue-700">
                  DOWNLOAD TAMPLATE CSV{" "}
                  <span>
                    <DownloadIcon />
                  </span>
                </p>
              </div>
            </div>
            <div
              className="border-dashed border-2 border-primary rounded-lg p-10 flex justify-center items-center mb-10"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <p>Drag and drop files here or click to browse.</p>
              <ul>
                {uploadedFiles.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-row-reverse gap-3 p-3">
              <Button variant="contained">Simpan</Button>
              <Button
                variant="outlined"
                className="!border-gray-400"
                onClick={handleClose}
              >
                <span className="text-gray-400">Batal</span>
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="flex flex-row justify-between items-center mb-10">
        <h1 className="text-3xl font-semibold">
          Business Process Reengineering / Rekayasa Proses Bisnis
        </h1>
        <Button
          variant="contained"
          className="!rounded-2xl bg-primary text-white"
          size="large"
          endIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Upload Data Siswa
        </Button>
      </div>

      <div className="bg-secondary rounded-lg p-5 flex flex-row mb-10">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="text-lg font-semibold w-40">Program Studi</td>
              <td className="text-lg">: Informatika</td>
            </tr>
            <tr>
              <td className="text-lg font-semibold w-40">SKS/Parallel</td>
              <td className="text-lg">: 2 SKS / A</td>
            </tr>
          </tbody>
        </table>

        <table className="w-full">
          <tbody>
            <tr>
              <td className="text-lg font-semibold w-40">Dosen</td>
              <td className="text-lg">: Andrew Tanny Liem, SSi., MT., PhD</td>
            </tr>

            <tr>
              <td className="text-lg font-semibold w-40">Jadwal</td>
              <td className="text-lg">: Rabu [10.10 - 12.00] at GK1-401</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h1 className="text-2xl font-semibold mb-10">
          Daftar Data Nilai Mahasiwa (CPMK)
        </h1>

        <div>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className="flex flex-row justify-between w-full">
                <h1 className="text-lg font-semibold">CPMK 1</h1>
                <div className="flex flex-row text-lg">
                  <p className="font-semibold mr-2">LAST EDIT: </p>
                  <p className="mr-5">12/12/2023, 10.30 PM</p>
                </div>
              </div>
            </AccordionSummary>

            <AccordionDetails>
              <AccordionContent />
            </AccordionDetails>
          </Accordion>
        </div>
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <div className="flex flex-row justify-between w-full">
                <h1 className="text-lg font-semibold">CPMK 2</h1>
                <div className="flex flex-row text-lg">
                  <p className="font-semibold mr-2">LAST EDIT: </p>
                  <p className="mr-5">12/12/2023, 10.30 PM</p>
                </div>
              </div>
            </AccordionSummary>

            <AccordionDetails>
              <AccordionContent />
            </AccordionDetails>
          </Accordion>
        </div>
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <div className="flex flex-row justify-between w-full">
                <h1 className="text-lg font-semibold">CPMK 3</h1>
                <div className="flex flex-row text-lg">
                  <p className="font-semibold mr-2">LAST EDIT: </p>
                  <p className="mr-5">12/12/2023, 10.30 PM</p>
                </div>
              </div>
            </AccordionSummary>

            <AccordionDetails>
              <AccordionContent />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default EvaluasiPenilaianCPMK;
