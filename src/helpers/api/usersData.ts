import Axios from "axios";

export interface Property {
  name: string;
  value: string;
}

export interface GetUserData {
  properties: Property[];
  id: number;
}

export async function getUserData(id: number) {
  return new Promise<GetUserData>((resolve, reject) => {
    Axios.get<GetUserData>(`https://localhost:3001/usersData/${id}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(er => {
        reject(er);
      });
  });
}

export async function setUserData(id: number, userProperties: Property[]) {
  return (
    await Axios.put<GetUserData>(`https://localhost:3001/usersData/${id}`, {
      properties: userProperties
    })
  ).data;
}
