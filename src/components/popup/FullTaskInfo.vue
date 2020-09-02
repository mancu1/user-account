<template>
  <div>
    <v-btn @click.stop="init" color="success">Подробно</v-btn>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Подробно</span>
        </v-card-title>
        <v-card-text
          v-if="!isEdit"
          class="d-flex flex-column text-h6"
          style="text-align: start;"
        >
          <div>Название: {{ task.title }}</div>
          <div>Описание задачи: {{ task.task }}</div>
          <div>дата: {{ formattedDate }}</div>
          <div>время начала: {{ task.time }}</div>
          <div>Длительность: {{ task.duration }}</div>
        </v-card-text>

        <v-card-text v-else>
          <v-container>
            <v-form style="width: 100%;" v-model="valid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    :rules="[rules.required]"
                    label="Название"
                    required
                    v-model="editTask.title"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    :rules="[rules.required]"
                    label="Описание"
                    v-model="editTask.task"
                    required
                  ></v-textarea>
                </v-col>

                <v-col cols="12">
                  <TimeSelector
                    label="Длительность"
                    v-bind:allowedHours="[0, 1]"
                    v-model="editTask.duration"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <DateSelector label="Дата задачи" v-model="editTask.date" />
                </v-col>
                <v-col cols="12" sm="6">
                  <TimeSelector
                    label="Время начала"
                    v-bind:allowedMinutes="[0]"
                    v-model="editTask.time"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small>Обязательные поля</small>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="!isEdit" text @click="startEdit" color="info"
            >Изменить</v-btn
          >
          <v-btn v-if="isEdit" text @click="saveEdit" color="info"
            >Сохранить</v-btn
          >
          <v-btn v-if="isEdit" text @click="deleteTask" color="error"
            >Удалить</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn text @click="close">Close</v-btn>
          <!--          <v-btn color="blue darken-1">Save</v-btn>-->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { TaskType } from "@/store/modules/Tasks";
import TimeSelector from "@/components/InputFields/TimeSelector.vue";
import DateSelector from "@/components/InputFields/DateSelector.vue";
import Rules from "@/helpers/rules/RulesHelper.ts";
import moment from "moment";

@Component({
  name: "FullTaskInfo",
  components: { DateSelector, TimeSelector },
})
export default class FullTaskInfo extends Vue {
  valid = false;
  isEdit = false;
  dialog = false;

  rules = Rules;

  editTask: TaskType | null = null;

  @Prop({ type: Object, required: true }) task!: TaskType;
  @Prop({ type: Number, required: true }) ind!: number;

  get formattedDate() {
    return moment(this.task.date).format("DD MMM YYYY");
  }

  startEdit() {
    this.isEdit = true;
    this.editTask = Object.assign({}, this.task);
  }

  saveEdit() {
    if (this.editTask)
      this.$store.commit("editTaskToTime", {
        time: this.editTask.time,
        taskIndex: this.ind,
        task: this.editTask,
      });
  }

  deleteTask() {
    this.$store.commit("removeTaskFromTime", {
      time: this.task.time,
      taskIndex: this.ind,
    });
  }

  init() {
    this.dialog = true;
  }

  close() {
    this.editTask = null;
    this.isEdit = false;
    this.dialog = false;
  }
}
</script>

<style scoped></style>
