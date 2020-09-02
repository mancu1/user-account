<template>
  <div
    v-click-outside="
      () => {
        if (toggle) toggle = false;
      }
    "
    tabindex="0"
  >
    <v-card v-if="toggle">
      <v-container>
        <v-form style="width: 100%;">
          <v-row>
            <v-col cols="12" md="8">
              <v-text-field v-model="task" label="Описание задачи" />
            </v-col>
            <!--          <v-col cols="12" md="3">-->
            <!--            <TimeSelector v-model="time" />-->
            <!--          </v-col>-->
            <v-col cols="12" md="4">
              <v-btn @click="createTask" color="success"
                >Создать задачу +
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
    <div
      v-else
      @click="toggle = true"
      class="d-flex align-center justify-center"
    >
      <v-btn text class="ma-2" large> Создать задачу +</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import TimeSelector from "@/components/InputFields/TimeSelector.vue";
import { TimeTasksType } from "@/store/modules/Tasks";

@Component({
  name: "ShortTaskForm",
  components: { TimeSelector },
})
export default class ShortTaskForm extends Vue {
  toggle = false;

  @Prop() time!: TimeTasksType;
  date = new Date();
  title = "Задача";
  task = "";

  close() {
    this.toggle = false;
    this.task = "";
  }

  createTask() {
    this.$store.commit("addTaskToTime", {
      time: this.time.time,
      task: {
        time: this.time.time,
        date: this.date,
        task: this.task,
        title: this.title,
        duration: "00:00",
      },
    });
    this.close();
  }
}
</script>

<style scoped></style>
