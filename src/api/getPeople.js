import axios from "axios";

export default async function getPeople() {
  //production
  //const response = await axios.get("http://127.0.0.1:5000/api/get");
  //development
  const response = await axios.get("http://localhost:3000/people");
  return response.data;
}
