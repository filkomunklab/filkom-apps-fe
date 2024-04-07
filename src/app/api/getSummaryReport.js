import { obeClient } from "./client";

export default async function getSummaryReport(rpsId) {
  const { data } = await obeClient.get(`/report-summary/${rpsId}`);
  return data.data;
}
