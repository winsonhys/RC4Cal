import Axios from "axios";

export default () => {
  return Axios.create({
    baseURL: "https://back2rc4.herokuapp.com"
  });
};
