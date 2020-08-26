<template>
  <v-card>
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
            <v-btn @click="createTask" color="success">Создать задачу + </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import TimeSelector from "@/components/InputFields/TimeSelector.vue";

@Component({
  name: "ShortTaskForm",
  components: { TimeSelector },
})
export default class ShortTaskForm extends Vue {
  @Prop() time!: string;
  date = new Date().toISOString().substr(0, 10);
  title = "Задача";
  task = "";

  createTask() {
    console.log(this.task);
  }
}
</script>

<style scoped></style>
