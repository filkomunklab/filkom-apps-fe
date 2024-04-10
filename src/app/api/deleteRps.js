import { obeClient } from "./client";

export default async function deleteRps(rpsId) {
  const { data } = await obeClient.delete(`/rps/${rpsId}`);
  return data.data;
}
