import { obeClient } from "./client";

export default function postCpl(payload) {
  const { file, curriculumId } = payload;
  const formData = new FormData();
  formData.append("curriculumCpl", file);

  return obeClient.post(`/curriculum/${curriculumId}/cpl`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
