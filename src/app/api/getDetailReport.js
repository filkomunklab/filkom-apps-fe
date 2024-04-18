import { obeClient } from "./client";

export default async function getDetailReport(rpsId) {
  const { data } = await obeClient.get(`/report-detail/${rpsId}`);
  data.data.studentGrade = JSON.parse(data.data.studentGrade);
  return data.data;
}
