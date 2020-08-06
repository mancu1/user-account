import { ActionContext } from "vuex";
import { RootState } from "@/store";
import { Vue } from "vue-property-decorator";
import {
  loginHelper,
  registrationHelper,
  UserStatus
} from "@/helpers/api/loginHelper.ts";
import router from "@/router";
import {
  getUserData,
  GetUserData,
  Property,
  setUserData
} from "@/helpers/api/usersData";

export interface UserStateType {
  loginForm: {
    userName: string;
    password: string;
    repeatPassword: string;
  };
  loginStatus: UserStatus;
  userData: GetUserData | null;
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
  getLoginForm: (state: UserStateType) => state.loginForm,
  getUserId: (state: UserStateType) =>
    "id" in state.loginStatus ? state.loginStatus.id : undefined,
  getUserData: (state: UserStateType) => state.userData,
  getUserStatus: (state: UserStateType) => state.loginStatus
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
  async logout(context: ActionContext<UserStateType, RootState>) {
    context.commit("setUserStatus", { status: false });
    context.commit("setUsersData", null);
    router.push("/login");
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
  },
  async getUserData(
    context: ActionContext<UserStateType, RootState>,
    id: number
  ) {
    return new Promise((resolve, reject) => {
      getUserData(id)
        .then(userData => {
          context.commit("setUsersData", userData);
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  },
  async userPropertiesAction(
    context: ActionContext<UserStateType, RootState>,
    propertiesActionPayload: {
      action: "edit" | "delete" | "add";
      property: Property;
    }
  ) {
    switch (propertiesActionPayload.action) {
      case "add": {
        context.commit("addUserDataProperty", propertiesActionPayload.property);
        break;
      }
      case "delete": {
        context.commit(
          "deleteUserDataProperty",
          propertiesActionPayload.property
        );
        break;
      }
      case "edit": {
        context.commit(
          "editUserDataProperty",
          propertiesActionPayload.property
        );
        break;
      }
    }
    const userData: GetUserData | null = context.state.userData;
    if (userData) {
      return setUserData(userData.id, userData.properties);
    } else {
      return Promise.reject();
    }
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
  },
  setUsersData(store: UserStateType, userData: GetUserData) {
    Vue.set(store, "userData", userData);
  },
  setUserDataProperties(store: UserStateType, properties: Property[]) {
    if (store.userData) Vue.set(store.userData, "properties", properties);
  },
  addUserDataProperty(store: UserStateType, property: Property) {
    if (store.userData)
      Vue.set(store.userData.properties, property.id - 1, property);
  },
  editUserDataProperty(store: UserStateType, property: Property) {
    if (store.userData)
      Vue.set(store.userData.properties, property.id - 1, property);
  },
  deleteUserDataProperty(store: UserStateType, property: Property) {
    if (store.userData) {
      Vue.set(
        store.userData,
        "properties",
        store.userData.properties.reduce((arr: Property[], prop) => {
          if (prop.id < property.id) {
            arr.push(prop);
          } else if (prop.id > property.id) {
            arr.push({ ...prop, id: prop.id - 1 });
          }
          return arr;
        }, [])
      );
    }
  }
};

export default {
  mutations,
  actions,
  state,
  getters
};
