import axiosInstance from "./axiosConfiguration";

export const get = async id => {
  const api = await axiosInstance();
  return api
    .get("/events", {
      params: {
        userId: id
      }
    })
    .then(r => r.data);
};

export const create = async (title, start, end, userId) => {
  const api = await axiosInstance();
  return api
    .post("./events", {
      title,
      start,
      end,
      userId
    })
    .then(r => r.data);
};

export const destroy = async id => {
  const api = await axiosInstance();
  return api
    .delete("./events", {
      params: { id: id }
    })
    .then(r => r.data);
};
