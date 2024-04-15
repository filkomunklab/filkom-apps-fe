import { obeClient } from "./client";

export default async function patchRpsStatus(payload) {
  const { rpsId, status } = payload;
  const { data } = await obeClient.patch(`/rps/${rpsId}`, { status });
  return data.data;
}
