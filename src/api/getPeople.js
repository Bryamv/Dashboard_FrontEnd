import axios from "axios";

export default async function getPeople() {
  const response = await axios.get("http://localhost:3000/people");
  return response.data;
}
