import { obeClient } from "./client";

export default async function getRpsList(payload) {
  const { major, curriculumId } = payload;
  const queryParams = new URLSearchParams();
  major && queryParams.append("major", major);
  curriculumId && queryParams.append("curriculumId", curriculumId);

  const { data } = await obeClient.get(
    `/rps/list/all${queryParams.toString() && `?${queryParams}`}`
  );
  console.log(data.data);
  return data.data;
}
