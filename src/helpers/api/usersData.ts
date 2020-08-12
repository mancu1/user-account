import Axios from "axios";

export interface Property {
  name: string;
  value: string;
  id: number;
}

export interface GetUserData {
  properties: Property[];
  id: number;
}

export async function getUserData(id: number) {
  return new Promise<GetUserData>((resolve, reject) => {
    Axios.get<GetUserData>(`usersData/${id}`)
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
    await Axios.put<GetUserData>(`usersData/${id}`, {
      properties: userProperties
    })
  ).data;
}
