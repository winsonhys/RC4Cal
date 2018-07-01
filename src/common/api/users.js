import axiosInstance from "./axiosConfiguration";

export const get = async (username, password) => {
  const api = await axiosInstance();
  return api
    .get("/user", {
      params: {
        username,
        password
      }
    })
    .then(r => r.data);
};
