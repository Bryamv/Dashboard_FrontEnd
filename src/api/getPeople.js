import axios from "axios";

export default async function getPeople() {
  const response = await axios.get("http://127.0.0.1:5000/api/get");
  return response.data;
}
