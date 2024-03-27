import { obeClient } from "./client";

export default class GetSubjects {
  static async byCurriculum(curriculumId) {
    const { data } = await obeClient.get(`/curriculum/${curriculumId}`);
    console.log(data.data);
    return data.data;
  }

  static async all() {
    const { data } = await obeClient.get("/subject");
    const normalize = data.data
      .sort((a, b) => {
        return a.englishName.localeCompare(b.englishName);
      })
      .map((item) => ({
        label: `[${item.code}] ${item.englishName} / ${item.indonesiaName}`,
        value: item.id,
      }));
    console.log(normalize);
    return normalize;
  }

  static async cpl(id) {
    const { data } = await obeClient.get(`/subject/${id}/cpl`);

    const normalize = data.data.Subject_Cpl.map((item) => ({
      ...item.cpl,
    }));

    console.log(data.data, normalize);
    return normalize;
  }
}
