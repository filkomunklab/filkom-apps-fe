import { USE_IMAGE_PLACEHOLDERS } from "./constants/paths";

export const getAssetPath = (url, size) => {
  if (USE_IMAGE_PLACEHOLDERS) {
    return `https://via.placeholder.com/${size}.png`;
  }

  return url;
};

const ACTION = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

// export const permissionCheck = (url) => {
//     try {
//         const programs = JSON.parse(localStorage.getItem('user')).role
//     } catch (error) {

//     }
// }
