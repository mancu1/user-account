<template>
  <v-col>
    <v-row>
      <v-spacer />
      <v-icon>mdi-calendar</v-icon>
      <FullTaskCreatePopup />
    </v-row>
    <v-timeline dense>
      <v-timeline-item right v-for="time in timesArr" :key="time">
        <v-row class="pt-1">
          <v-col
            xl="1"
            lg="1"
            md="2"
            sm="2"
            cols="3"
            class="d-flex align-center"
          >
            <strong>{{ time }}</strong>
          </v-col>
          <v-col>
            <v-card>
              <v-card v-for="y in getRandomInt(5)" :key="y">
                <v-card-title>Зачада № {{ y }}</v-card-title>
                <v-card-text>Описание задачи {{ y }}</v-card-text>
              </v-card>
              <ShortTaskForm :time="time" />
            </v-card>
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GetUserData } from "@/helpers/api/usersData";
import { UserStatus } from "@/helpers/api/loginHelper";
import UserProperties from "@/components/Proprties/UserProperties.vue";
import FullTaskCreatePopup from "@/components/popup/FullTaskCreatePopup.vue";
import Rules from "@/helpers/rules/RulesHelper";
import ShortTaskForm from "@/components/TaskForm/ShortTaskForm.vue";

@Component({
  name: "UserData",
  components: { ShortTaskForm, FullTaskCreatePopup, UserProperties },
})
export default class UserData extends Vue {
  menu2 = false;
  time = "";

  rules = Rules;

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  get userId(): number | undefined {
    return this.$store.getters.getUserId;
  }

  get userData(): GetUserData | null {
    return this.$store.getters.getUserData;
  }

  get userStatus(): UserStatus {
    return this.$store.getters.getUserStatus;
  }

  private created() {
    if (this.userId) {
      this.$store.dispatch("getUserData", this.userId);
    }
  }

  timesArr = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];
}
</script>
