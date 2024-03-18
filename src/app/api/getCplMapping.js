import { OBE_BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

export default async function getCplMapping(payload) {
  const { subjectId, formik } = payload;
  const { data } = await axios.get(
    `${OBE_BASE_URL_API}/api/subject/${subjectId}/cpl-mapping`
  );
  data.data.Curriculum_Cpl = data.data.Curriculum_Subject.flatMap(
    (item) => item.curriculum.Cpl
  );
  data.data.Subject_Cpl = data.data.Subject_Cpl.flatMap((item) => item.cpl.id);
  delete data.data.Curriculum_Subject;
  formik.current?.setValues({
    cplIds: data.data?.Subject_Cpl ?? [],
  });
  return data.data;
}
