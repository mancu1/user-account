import Vue from "vue";
import Vuex from "vuex";
import User, { UserStateType } from "@/store/modules/User";

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  modules: { User }
});

export interface RootState {
  User: UserStateType;
}
