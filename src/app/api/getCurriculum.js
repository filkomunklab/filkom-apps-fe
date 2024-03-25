import { obeClient } from "./client";

export default async function getCurriculum(major) {
  const query = !major ? "" : `?major=${major}`;
  const { data } = await obeClient.get(`/curriculum${query}`);
  return data.data;
}
