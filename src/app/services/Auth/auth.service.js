import jwtAuthAxios from "./jwtAuth";

const authService = {};

authService.signIn = async (formData) => {
  let endPoint;

  switch (formData.loginAs) {
    case "admin":
      endPoint = "/auth/signin-admin";
      break;
    case "student":
      endPoint = "/auth/signin-student";
      break;
    case "employee":
      endPoint = "/auth/signin-employee";
      break;
  }
  const { data } = await jwtAuthAxios.post(endPoint, formData);
  return data.data;
};

authService.getCurrentUser = async () => {
  // const { data } = await jwtAuthAxios.get("/auth/me");
  const data = {
    token: "hehe",
  };

  return data;
};

export default authService;
