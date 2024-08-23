import { obeClient } from "./client";

export default function postStudents(data) {
  const formData = new FormData();
  formData.append("file", data.file);
  return obeClient.post(`/rps/${data.rpsId}/member`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
