import Axios from "axios"

export default () => {
  return Axios.create({
    baseURL: process.env.REACT_APP_API,
  })
}
