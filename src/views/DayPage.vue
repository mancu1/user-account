<template>
  <calendar
    style="height: 99vh;"
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
</template>

<script>
import { Calendar } from "@toast-ui/vue-calendar";

export default {
  name: "YourComponent",
  components: {
    calendar: Calendar,
  },
  data() {
    return {
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
      useDetailPopup: false,
    };
  },
  computed: {
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
    onAfterRenderSchedule(e) {
      // implement your code
      console.log(e);
    },
    onBeforeCreateSchedule(e) {
      // implement your code
      console.log("befCrea", e);
      // this.$store.commit("addSchedules", e);
    },
    onBeforeDeleteSchedule(e) {
      // implement your code
      this.$store.commit("deleteSchedules", e);
      console.log(e);
    },
    onBeforeUpdateSchedule(e) {
      // implement your code
      this.$store.commit("editSchedules", e);
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
