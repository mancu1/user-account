import { ActionTree, GetterTree, Module, ModuleTree, MutationTree } from "vuex";
import { RootState } from "@/store";
import moment from "moment";

export interface TaskType {
  time: string;
  date: Date;
  title: string;
  task: string;
  duration: string;
}
export interface TimeTasksType {
  time: string;
  tasks: TaskType[];
}

export interface TodoTask {
  title: string;
}

export interface TaskStateType {
  schedules: any[];
  timeTasks: TimeTasksType[];
  createTask: TaskType;
  todoTasks: TodoTask[];
}

const state: TaskStateType = {
  todoTasks: [{ title: "Задача №1" }, { title: "Задача №2" }],
  schedules: [],
  timeTasks: [
    { time: "00:00", tasks: [] },
    { time: "01:00", tasks: [] },
    { time: "02:00", tasks: [] },
    { time: "03:00", tasks: [] },
    { time: "04:00", tasks: [] },
    { time: "05:00", tasks: [] },
    { time: "06:00", tasks: [] },
    { time: "07:00", tasks: [] },
    { time: "08:00", tasks: [] },
    { time: "09:00", tasks: [] },
    { time: "10:00", tasks: [] },
    { time: "11:00", tasks: [] },
    { time: "12:00", tasks: [] },
    { time: "13:00", tasks: [] },
    { time: "14:00", tasks: [] },
    { time: "15:00", tasks: [] },
    { time: "16:00", tasks: [] },
    { time: "17:00", tasks: [] },
    { time: "18:00", tasks: [] },
    { time: "19:00", tasks: [] },
    { time: "20:00", tasks: [] },
    { time: "21:00", tasks: [] },
    { time: "22:00", tasks: [] },
    { time: "23:00", tasks: [] },
  ],
  createTask: {
    task: "",
    date: new Date(),
    title: "",
    time: "",
    duration: "",
  },
};

const getters: GetterTree<TaskStateType, RootState> = {
  getTodoTasks: (state1) => state1.todoTasks,
  getTimeTasks: (state1) => state1.timeTasks,
  getCreateTask: (state1) => state1.createTask,
  getSchedules: (state1) => state1.schedules,
};

const actions: ActionTree<TaskStateType, RootState> = {};

const mutations: MutationTree<TaskStateType> = {
  setTodoTasks: (state1, payload) => {
    state1.todoTasks = payload;
  },
  setSchedules: (state1, payload) => {
    state1.schedules = payload;
  },
  addSchedules: (state1, payload) => {
    const obj = {
      body: payload.body,
      bgColor: "#ff5e03",
      id: `${state1.schedules.length + 1}`,
      calendarId: payload.calendarId,
      title: payload.title,
      category: "time",
      dueDateClass: "",
      start: payload.start,
      end: payload.end,
      isReadOnly: false,
    };
    state1.schedules.push(obj);
  },
  editSchedules(state, payload) {
    const index = state.schedules.findIndex(
      (el) => el.id === payload.schedule.id
    );
    if (index >= 0)
      state.schedules.splice(index, 1, {
        ...payload.schedule,
        ...payload.changes,
      });
  },
  deleteSchedules(state, payload) {
    const index = state.schedules.findIndex(
      (el) => el.id === payload.schedule.id
    );
    if (index >= 0) state.schedules.splice(index, 1);
  },
  setCreateTask: (state1, payload: { field: keyof TaskType; value: any }) => {
    state1.createTask[payload.field] = payload.value;
  },
  addTaskToTime: (state1, payload: { time: string; task: TaskType }) => {
    const index = state1.timeTasks.findIndex((el) => el.time === payload.time);
    if (index >= 0) {
      state1.timeTasks[index].tasks.push(payload.task);
    }
  },
  removeTaskFromTime: (
    state1,
    payload: { time: string; taskIndex: number }
  ) => {
    const index = state1.timeTasks.findIndex((el) => el.time === payload.time);
    if (index >= 0) {
      state1.timeTasks[index].tasks.splice(payload.taskIndex, 1);
    }
  },
  editTaskToTime: (
    state1,
    payload: { time: string; taskIndex: number; task: TaskType }
  ) => {
    const index = state1.timeTasks.findIndex((el) => el.time === payload.time);
    if (index >= 0) {
      state1.timeTasks[index].tasks.splice(payload.taskIndex, 1, payload.task);
    }
  },
};

const TaskModule: Module<TaskStateType, RootState> = {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
};

export default TaskModule;
