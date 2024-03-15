import { BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

export default async function getTeacher() {
  const { data } = await axios.get(`${BASE_URL_API}/employee`);
  const normalize = data.data.map((item) => ({
    label: `${item.firstName} ${item.lastName}`,
    value: item.id,
  }));
  return normalize;
}
