import Vue from "vue";
import Vuex from "vuex";
import User, { UserStateType } from "@/store/modules/User";
import Tasks, { TaskStateType } from "@/store/modules/Tasks";

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  modules: { User, Tasks },
});

export interface RootState {
  User: UserStateType;
  Tasks: TaskStateType;
}
