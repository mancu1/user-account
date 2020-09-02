<template>
  <v-card>
    <v-card-title>
      <span class="headline">Создание задачи</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form style="width: 100%;" v-model="valid">
          <v-row>
            <v-col cols="12">
              <v-text-field
                :rules="[rules.required]"
                label="Название"
                required
                v-model="task.title"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                :rules="[rules.required]"
                label="Описание"
                v-model="task.task"
                required
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6">
              <DateSelector v-model="task.date" />
            </v-col>
            <v-col cols="12" sm="6">
              <TimeSelector v-bind:allowedMinutes="[0]" v-model="task.time" />
            </v-col>
          </v-row>
        </v-form>
      </v-container>
      <small>Обязательные поля</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close">Close</v-btn>
      <v-btn color="blue darken-1" :disabled="!valid" text @click="createTask"
        >Save</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from "vue-property-decorator";
import Rules from "@/helpers/rules/RulesHelper";
import TimeSelector from "@/components/InputFields/TimeSelector.vue";
import DateSelector from "@/components/InputFields/DateSelector.vue";
import { TaskType } from "@/store/modules/Tasks";
@Component({
  name: "FullForm",
  components: { DateSelector, TimeSelector },
})
export default class FullForm extends Vue {
  @PropSync("dialog", { type: Boolean }) propDialog!: boolean;

  private task: TaskType = {
    duration: "",
    date: new Date(),
    time: "",
    title: "",
    task: "",
  };

  rules = Rules;
  valid = false;

  close(): void {
    this.task = {
      duration: "",
      date: new Date(),
      time: "",
      title: "",
      task: "",
    };

    this.propDialog = false;
  }

  createTask(): void {
    this.$store.commit("addTaskToTime", {
      time: this.task.time,
      task: this.task,
    });
    this.close();
  }
}
</script>

<style scoped></style>
