import { obeClient } from "./client";

export default function postCurriculum(data) {
  const formData = new FormData();
  formData.append("major", data.major);
  formData.append("year", data.year);
  formData.append("headOfProgramStudyId", data.headOfProgramStudyId);
  formData.append("curriculumFile", data.curriculumFile);
  return obeClient.post(`/curriculum`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
