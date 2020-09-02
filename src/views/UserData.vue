<template>
  <v-col>
    <v-row>
      <v-spacer />
      <v-icon>mdi-calendar</v-icon>
      <FullTaskCreatePopup />
    </v-row>
    <v-timeline dense>
      <v-timeline-item right v-for="time in timeTasks" :key="time.time">
        <v-row class="pt-1">
          <v-col
            xl="1"
            lg="1"
            md="2"
            sm="2"
            cols="3"
            class="d-flex align-center"
          >
            <strong>{{ time.time }}</strong>
          </v-col>
          <v-col>
            <v-card>
              <div v-for="(task, ind) in time.tasks" :key="ind">
                <ShortTask v-bind:task="task" :ind="ind" />
              </div>
              <ShortTaskForm class="mt-1" :time="time" />
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
import { TimeTasksType } from "@/store/modules/Tasks";
import ShortTask from "@/components/Tasks/ShortTask.vue";

@Component({
  name: "UserData",
  components: { ShortTask, ShortTaskForm, FullTaskCreatePopup, UserProperties },
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

  get timeTasks(): TimeTasksType[] {
    return this.$store.getters.getTimeTasks;
  }
}
</script>
