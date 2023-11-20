import axios from "axios";

export default async function getLog() {
  //production
  const response = await axios.get("http://127.0.0.1:5001/api/log");
  return response.data;
}
