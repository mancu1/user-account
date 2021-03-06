import Axios from "axios";

interface GetUserLogin {
  id: number;
  userName: string;
  password: string;
}

interface UserLogoutStatus {
  status: false;
}
interface UserLoginStatus {
  status: true;
  userName: string;
  id: number;
}
export type UserStatus = UserLoginStatus | UserLogoutStatus;

export async function loginHelper(userName: string, password: string) {
  return new Promise<UserLoginStatus>((resolve, reject) => {
    Axios.get<GetUserLogin[]>(`users?userName=${userName}`)
      .then(res => {
        if (res.data.length > 0) {
          const user: GetUserLogin = res.data[0];
          if (user.password == password) {
            resolve({
              userName: user.userName,
              id: user.id,
              status: true
            });
          } else {
            reject({ status: 401, text: "Incorrect name or password" });
          }
        } else {
          reject({ status: 403, text: "User not created" });
        }
      })
      .catch(er => {
        reject(er);
      });
  });
}

export async function registrationHelper(
  userName: string,
  password: string,
  repeatPassword: string
) {
  if (password === repeatPassword) {
    try {
      const users = await Axios.get<GetUserLogin[]>(
        `users?userName=${userName}`
      );
      if (users.data.length > 0) {
        return Promise.reject({ status: 500, text: "Users created" });
      } else {
        return Axios.post(
          // "http://localhost:3001/users",
          "users",
          {
            userName,
            password
          }
        );
      }
    } catch (e) {
      return Promise.reject(e);
    }
  } else {
    return Promise.reject({ status: 401, text: "Passwords not equals" });
  }
}
