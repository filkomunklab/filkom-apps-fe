import jwtAuthAxios from "./jwtAuth";

const authService = {};

authService.signIn = async (formData) => {
  // const {data} = await jwtAuthAxios.post('/auth/sign-in', formData)
  const data = {
    code: 200,
    message: "Sign-in Success",
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJlMjBjOGJkZS1mMzRmLTQzN2QtYjg4Ni0wOTUwYmVmMTAzZDIiLCJpYXQiOjE2ODM4NjcwODIsImV4cCI6MTY4Mzk1MzQ4Mn0.AN7i-iBW6sd5JF3YSkt_1xKw3nY3Z5foR9gk-HrGtmo",
    expiresIn: 86400,
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJlMjBjOGJkZS1mMzRmLTQzN2QtYjg4Ni0wOTUwYmVmMTAzZDIiLCJpYXQiOjE2ODM4NjcwODIsImV4cCI6MTY4NDQ3MTg4Mn0.q9jrZ0QYZAbLUHgrYDjoy4m7IJbqt_efYHIOkxxQmi4",
    tokenType: "Bearer",
    user: {
      uid: "e20c8bde-f34f-437d-b886-0950bef103d2",
    },
  };
  return data;
};

authService.getCurrentUser = async () => {
  // const { data } = await jwtAuthAxios.get("/auth/me");
  const data = {
    token: "hehe",
  };

  return data;
};

export default authService;
