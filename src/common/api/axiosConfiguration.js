import Axios from "axios"
/* global sessionStorage */

export default () => {
  let headers = {}
  const token = sessionStorage.getItem("token")
  if (token !== null) {
    headers = { Authorization: `Bearer ${token}` }
  }
  return Axios.create({
    baseURL: process.env.REACT_APP_API,
    headers,
  })
}
