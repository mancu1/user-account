import { ActionContext } from "vuex";
import { RootState } from "@/store";
import { Vue } from "vue-property-decorator";
import { loginHelper, registrationHelper } from "@/helpers/api/loginHelper.ts";
import router from "@/router";

export interface UserStateType {
  loginForm: {
    userName: string;
    password: string;
    repeatPassword: string;
  };
  loginStatus:
    | {
        status: false;
      }
    | {
        status: true;
        userName: string;
        id: number;
      };
  userData: {
    id: number;
    userName: string;
    properties: { name: string; value: string }[];
  } | null;
}

const state: UserStateType = {
  loginForm: {
    userName: "",
    password: "",
    repeatPassword: ""
  },
  loginStatus: {
    status: false
  },
  userData: null
};

const getters = {
  isLogin: (state: UserStateType) => state.loginStatus.status,
  getLoginForm: (state: UserStateType) => state.loginForm
};

const actions = {
  async login(
    context: ActionContext<UserStateType, RootState>,
    loginPayload: { userName: string; password: string }
  ) {
    return new Promise((resolve, reject) => {
      loginHelper(loginPayload.userName, loginPayload.password)
        .then(user => {
          context.commit("setUserStatus", user);
          resolve();
          router.push("/");
        })
        .catch(er => {
          context.commit("setUserStatus", { status: false });
          reject(er);
        });
    });
  },
  async registration(
    context: ActionContext<UserStateType, RootState>,
    loginPayload: { userName: string; password: string; repeatPassword: string }
  ) {
    return new Promise((resolve, reject) => {
      registrationHelper(
        loginPayload.userName,
        loginPayload.password,
        loginPayload.repeatPassword
      )
        .then(() => {
          context.dispatch("login", {
            userName: loginPayload.userName,
            password: loginPayload.password
          });
          resolve();
        })
        .catch(er => {
          reject(er);
        });
    });
  }
};

const mutations = {
  setFormData(
    state: UserStateType,
    formPayload: { name: string; value: string }
  ) {
    Vue.set(state.loginForm, formPayload.name, formPayload.value);
  },
  setUserStatus(
    state: UserStateType,
    userStatusPayload: { userName?: string; id?: number; status: boolean }
  ) {
    Vue.set(state, "loginStatus", userStatusPayload);
  }
};

export default {
  mutations,
  actions,
  state,
  getters
};
