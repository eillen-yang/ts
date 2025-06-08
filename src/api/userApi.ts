import axios from "axios";

export interface User {
  id: number;
  name: string;
}

export async function fetchUsers(): Promise<User[]> {
  const response = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  return response.data;
}
