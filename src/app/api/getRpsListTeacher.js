import { OBE_BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

export default async function getRpsListTeacher(payload) {
  const { teacherId } = payload;
  const { data } = await axios.get(
    `${OBE_BASE_URL_API}/api/rps/list/teacher/${teacherId}/`
  );
  console.log(data.data);
  return data.data;
}
