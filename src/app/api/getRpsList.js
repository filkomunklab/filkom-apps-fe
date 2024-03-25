import { obeClient } from "./client";

export default async function getRpsList(payload) {
  const { major } = payload;
  const queryParams = new URLSearchParams();
  major && queryParams.append("major", major);
  const { data } = await obeClient.get(
    `/rps/list/all${queryParams.toString() && `?${queryParams}`}`
  );
  return data.data;
}
