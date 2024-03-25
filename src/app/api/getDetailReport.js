import { obeClient } from "./client";

export default async function getDetailReport(rpsId) {
  const { data } = await obeClient.get(`/report-detail/${rpsId}`);
  return data.data;
}
