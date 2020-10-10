<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12" md="4" lg="3" xl="2">
        <v-btn outlined rounded @click="setToday" class="mr-1">Сегодня</v-btn>
        <v-btn outlined rounded @click="setTomorrow">Завтра</v-btn>
      </v-col>
      <v-spacer />
      <v-col>
        <v-btn @click="openTodo">
          Todo list
        </v-btn>
      </v-col>
    </v-row>
    <calendar
      ref="tuiCalendar"
      style="height: 90vh;"
      :calendars="calendarList"
      :schedules="schedules"
      :view="view"
      :taskView="taskView"
      :scheduleView="scheduleView"
      :theme="theme"
      :week="week"
      :month="month"
      :timezones="timezones"
      :disableDblClick="disableDblClick"
      :isReadOnly="isReadOnly"
      :template="template"
      :useCreationPopup="useCreationPopup"
      :useDetailPopup="useDetailPopup"
      @afterRenderSchedule="onAfterRenderSchedule"
      @beforeCreateSchedule="onBeforeCreateSchedule"
      @beforeDeleteSchedule="onBeforeDeleteSchedule"
      @beforeUpdateSchedule="onBeforeUpdateSchedule"
      @clickDayname="onClickDayname"
      @clickSchedule="onClickSchedule"
      @clickTimezonesCollapseBtn="onClickTimezonesCollapseBtn"
    />
    <v-dialog width="480px" v-model="dialog">
      <v-card width="100%">
        <v-card-title>Задача</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-combobox
                  :return-object="false"
                  :items="usedTodoList"
                  item-text="listTitle"
                  item-value="title"
                  v-model="title"
                  label="Заголовок"
                >
                </v-combobox>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="body" label="Задача"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="cansel" color="error" outlined>Отмена</v-btn>
          <v-spacer />
          <v-btn @click="createTask" color="success">Готово</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog width="480px" v-model="todoDialog">
      <v-card width="100%">
        <v-card-title>Todo</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                v-for="(todo, index) in usedTodoList"
                cols="12"
                :key="index"
              >
                <!--                <div-->
                <!--                  :style="-->
                <!--                    todo.isUsed-->
                <!--                      ? `background-color: rgba(195,81,81,0.70)`-->
                <!--                      : `background-color: rgb(63,136,62)`-->
                <!--                  "-->
                <!--                >-->
                {{ todo.isUsed ? "запланированно" : "не запланированно" }} -
                {{ todo.title }}
                <!--                </div>-->
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="todoDialog = false" color="error" outlined
            >Закрыть</v-btn
          >
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Calendar } from "@toast-ui/vue-calendar";
import moment from "moment";

export default {
  name: "YourComponent",
  components: {
    calendar: Calendar,
  },
  data() {
    return {
      todoDialog: false,
      method: "",
      dialog: false,
      preCreateTask: null,
      title: "",
      body: "",
      calendarList: [
        {
          id: "0",
          name: "task",
        },
      ],
      view: "day",
      taskView: false,
      scheduleView: ["time", "allday"],
      theme: {
        "month.dayname.height": "30px",
        "month.dayname.borderLeft": "1px solid #ff0000",
        "month.dayname.textAlign": "center",
        "week.today.color": "#333",
        "week.daygridLeft.width": "100px",
        "week.timegridLeft.width": "100px",
      },
      week: {
        narrowWeekend: true,
        showTimezoneCollapseButton: true,
        timezonesCollapsed: false,
      },
      month: {
        visibleWeeksCount: 6,
        startDayOfWeek: 1,
      },
      timezones: [
        {
          timezoneOffset: 180,
          tooltip: "Moscow",
        },
      ],
      disableDblClick: false,
      isReadOnly: false,
      template: {
        milestone: function (schedule) {
          return `<span style="color:red;">${schedule.title}</span>`;
        },
        milestoneTitle: function () {
          return "MILESTONE";
        },
        timegridDisplayPrimayTime: function (time) {
          return time.hour + ":00";
        },
        timegridDisplayTime: function (time) {
          return time.hour + ":00";
        },
      },
      useCreationPopup: false,
      useDetailPopup: true,
    };
  },
  computed: {
    usedTodoList: {
      get() {
        return this.todoList.map((el) => {
          const reserv = !!this.schedules.find(
            (shed) => shed.title === el.title
          );
          return {
            ...el,
            isUsed: reserv,
            listTitle: `${el.title}${
              reserv ? " - запланированно" : " - не запланированно"
            }`,
          };
        });
      },
    },
    todoList: {
      get() {
        return this.$store.getters.getTodoTasks;
      },
    },
    schedules: {
      get() {
        return this.$store.getters.getSchedules;
      },
      set(newValue) {
        this.$store.commit("setSchedules", newValue);
      },
    },
  },
  methods: {
    openTodo() {
      this.todoDialog = true;
    },
    setToday() {
      this.$refs.tuiCalendar.invoke("today");
    },
    setTomorrow() {
      this.$refs.tuiCalendar.invoke(
        "setDate",
        moment().add(1, "days").toDate()
      );
    },
    cansel() {
      this.body = "";
      this.title = "";
      this.method = "";
      this.preCreateTask = null;
      this.dialog = false;
    },
    createTask() {
      if (this.method !== "editSchedules") {
        this.$store.commit(this.method, {
          ...this.preCreateTask,
          title: this.title,
          body: this.body,
        });
      } else {
        this.$store.commit(this.method, {
          schedule: { ...this.preCreateTask.schedule },
          changes: {
            ...this.preCreateTask.changes,
            title: this.title,
            body: this.body,
          },
        });
      }

      this.cansel();
    },
    onAfterRenderSchedule(e) {
      // implement your code
      console.log(e);
    },
    onBeforeCreateSchedule(e) {
      // implement your code
      console.log("befCrea", e);
      this.preCreateTask = e;
      this.method = "addSchedules";
      this.dialog = true;
      // this.$store.commit("addSchedules", e);
    },
    onBeforeDeleteSchedule(e) {
      // implement your code
      this.$store.commit("deleteSchedules", e);
      console.log(e);
    },
    onBeforeUpdateSchedule(e) {
      // implement your code
      this.preCreateTask = e;
      this.dialog = true;
      this.method = "editSchedules";
      this.title = e.schedule.title || "";
      this.body = e.schedule.body || "";
      console.log(e);
    },
    onClickDayname(e) {
      // implement your code
      console.log(e);
    },
    onClickSchedule(e) {
      // implement your code
      console.log(e);
    },
    onClickTimezonesCollapseBtn(e) {
      // implement your code
      console.log(e);
    },
  },
};
</script>

<style></style>
