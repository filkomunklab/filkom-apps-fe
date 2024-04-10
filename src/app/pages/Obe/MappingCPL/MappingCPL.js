import { useParams } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Form, Formik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCplMapping, putSubjectCpl } from "app/api";
import * as yup from "yup";
import Swal from "sweetalert2";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const MappingCPL = () => {
  const { subjectId } = useParams();
  const queryClient = useQueryClient();
  const formik = useRef(null);
  const navigate = useNavigate();

  const subjectCplQuery = useQuery({
    queryKey: ["subjectCpl", subjectId],
    queryFn: () => getCplMapping({ subjectId, formik }),
  });
  const subjectCplMutation = useMutation({
    mutationFn: putSubjectCpl,
    onSuccess: () => {
      queryClient.invalidateQueries(["subjectCpl", subjectId]);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil disimpan",
      });
      navigate(-1);
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.message,
      });
    },
  });
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">
          Matriks Hubungan Capaian Pembelajaran Lulusan dengan Bahan kajian
        </h1>
      </div>
      <div className="flex items-center justify-center mb-8">
        <div className="bg-white max-w-[1200px] w-full rounded-2xl overflow-clip shadow-md">
          <div className="flex justify-between p-4 text-xl font-semibold text-white bg-primary">
            <span>Mata kuliah</span>
          </div>
          <div className="p-4 text-xl font-semibold text-center">
            <h1>{`${subjectCplQuery.data?.englishName} / ${subjectCplQuery.data?.indonesiaName}`}</h1>
            <p className="font-normal text-gray-500">
              Kode: {subjectCplQuery.data?.code}
            </p>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="grid grid-cols-10 p-4 m-0 font-bold bg-gray-200 border-b tet-xl">
          <div className="flex items-center col-span-1 justify-center">
            Kode CPL
          </div>
          <div className="flex items-center col-span-8">Deskripsi</div>
          <div className="flex items-center col-span-1">Action</div>
        </div>
        <div>
          <Formik
            innerRef={formik}
            initialValues={{
              cplIds: [],
            }}
            onSubmit={(values) => {
              subjectCplMutation.mutate({ values, subjectId });
            }}
            validationSchema={mappingCplSchema}
          >
            {({ values, setFieldValue, errors }) => (
              <Form>
                {subjectCplQuery.data?.Curriculum_Cpl.map((item, index) => {
                  return (
                    <div
                      className="grid grid-cols-10 p-2 border-b"
                      key={item.id}
                    >
                      <div className="flex items-center col-span-1 justify-center">
                        {item.code}
                      </div>
                      <div className="flex items-center col-span-8">
                        {item.description}
                      </div>
                      <div className="flex items-center col-span-1">
                        <Checkbox
                          value={item.id}
                          checked={values.cplIds.includes(item.id)}
                          onChange={(e) => {
                            const { checked, value } = e.target;
                            if (checked) {
                              setFieldValue("cplIds", [
                                ...values.cplIds,
                                value,
                              ]);
                            } else {
                              setFieldValue(
                                "cplIds",
                                values.cplIds.filter((id) => id !== value)
                              );
                            }
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-end gap-4 mt-2">
                  <LoadingButton
                    className="!rounded-full"
                    variant="contained"
                    color="primary"
                    type="submit"
                    loadingPosition="end"
                    endIcon={<UploadFileIcon />}
                    loading={subjectCplMutation.isPending}
                  >
                    Simpan
                  </LoadingButton>
                </div>
                <div className="flex justify-end text-red-500">
                  {errors.cplIds}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const mappingCplSchema = yup
  .object()
  .shape({
    cplIds: yup
      .array()
      .of(yup.string().required())
      .min(1, "Pilih setidaknya satu CPL")
      .required(),
  })
  .noUnknown();

export default MappingCPL;
