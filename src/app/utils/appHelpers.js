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
    case "DKV":
      return "Teknologi Informasi";
    default:
      return major;
  }
};
