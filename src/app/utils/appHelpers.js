import { USE_IMAGE_PLACEHOLDERS } from "./constants/paths";

export const getAssetPath = (url, size) => {
  if (USE_IMAGE_PLACEHOLDERS) {
    return `https://via.placeholder.com/${size}.png`;
  }

  return url;
};

export const convertShortMajor = (major) => {
  switch (major) {
    case "IF":
      return "Informatika";
    case "SI":
      return "Sistem Informasi";
    case "TI":
      return "Teknologi Informasi";
    default:
      return major;
  }
};

export const normalizeGrading = (grade) => {
  const groupedData = {};
  grade.forEach((item) => {
    item.GradingSystem.forEach((grading) => {
      const { gradingName } = grading;
      if (!groupedData[gradingName]) {
        groupedData[gradingName] = 0;
      }
      groupedData[gradingName] += grading.gradingWeight;
    });
  });

  const gradingSys = Object.entries(groupedData).map(([label, value]) => ({
    label,
    value,
  }));

  const total = gradingSys.reduce((acc, item) => acc + item.value, 0);

  const cpmkGrades = grade.map((item) => {
    const grades = gradingSys.map((grading) => {
      const grade = item.GradingSystem.find(
        (grade) => grade.gradingName === grading.label
      );
      if (grade) {
        return grade.gradingWeight;
      }
      return 0;
    });
    return {
      code: item.code,
      totalGradingWeight: item.totalGradingWeight,
      grades,
    };
  });
  return { gradingSys, cpmkGrades, total };
};

export const downloadFile = (response) => {
  console.log("fire");
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Curriculum.xlsx"); // or any other filename you want
  document.body.appendChild(link);
  link.click();
};

export const getColor = (status) => {
  switch (status) {
    case "WAITING":
      return "warning";
    case "APPROVED":
      return "success";
    case "REJECTED":
      return "error";
    default:
      return "default";
  }
};
