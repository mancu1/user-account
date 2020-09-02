<template>
  <v-card class="mt-1">
    <v-card-title>{{ ind + 1 }}. {{ task.title }}</v-card-title>
    <v-card-title>{{ task.task }}</v-card-title>
    <v-card-actions>
      <FullTaskInfo :task="task" :ind="ind" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { TaskType } from "@/store/modules/Tasks";
import FullTaskInfo from "@/components/popup/FullTaskInfo.vue";

@Component({
  name: "ShortTask",
  components: { FullTaskInfo },
})
export default class ShortTask extends Vue {
  @Prop({ type: Object, required: true }) task!: TaskType;
  @Prop({ type: Number, required: true }) ind!: number;
}
</script>

<style scoped></style>
