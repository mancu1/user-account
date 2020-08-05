import Axios from "axios";

interface GetUserLogin {
  id: number;
  userName: string;
  password: string;
}

export async function loginHelper(userName: string, password: string) {
  return new Promise<GetUserLogin>((resolve, reject) => {
    Axios.get<GetUserLogin[]>(
      `http://localhost:3001/users?userName=${userName}`
    )
      .then(res => {
        if (res.data.length > 0) {
          const user: GetUserLogin = res.data[0];
          if (user.password == password) {
            resolve(user);
          } else {
            console.log(user);
            reject();
          }
        } else {
          reject();
        }
      })
      .catch(er => {
        reject(er);
      });
  });
}
