import axiosInstance from "./axiosConfiguration"

export const get = async (id) => {
  const api = await axiosInstance()
  return api
    .get("/events", {
      params: {
        userId: id,
      },
    })
    .then((r) => r.data)
}

export const create = async (
  title,
  start,
  end,
  userId,
  type,
  allDay,
  location
) => {
  const api = await axiosInstance()
  return api
    .post("./events", {
      title,
      start,
      end,
      userId,
      type,
      allDay,
      location,
    })
    .then((r) => r.data)
}

export const destroy = async (id) => {
  const api = await axiosInstance()
  return api
    .delete("./events", {
      params: { id: id },
    })
    .then((r) => r.data)
}

export const update = async (updatedEventObject) => {
  const { id, title, start, end, allDay, type, location } = updatedEventObject
  const api = await axiosInstance()
  return api.patch("./events", {
    id,
    title,
    start,
    end,
    allDay,
    type,
    location,
  })
}

export const requestSwap = async (eventIdFrom, eventIdTo) => {
  const api = await axiosInstance()
  return api.post("./events/swapRequest", { eventIdFrom, eventIdTo })
}

export const eventSwap = async (eventIdFrom, eventIdTo) => {
  const api = await axiosInstance()
  return api.post("./events/eventSwap", { eventIdFrom, eventIdTo })
}
