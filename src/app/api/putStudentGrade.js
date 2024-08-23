import { obeClient } from "./client";

export default function putStudentGrade(data) {
  const { file, gradingSystemId } = data;
  const formData = new FormData();
  formData.append("file", file);
  return obeClient.put(`/student-grade/${gradingSystemId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
