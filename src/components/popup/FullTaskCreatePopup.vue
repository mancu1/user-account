<template>
  <div>
    <v-btn @click.stop="init" color="success">Создать задачу</v-btn>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <FullForm :dialog="dialog" @update:dialog="dialog = $event" />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import FullForm from "@/components/TaskForm/FullForm.vue";

@Component({
  name: "FullTaskCreatePopup",
  components: { FullForm },
})
export default class FullTaskCreatePopup extends Vue {
  dialog = false;
}
</script>

<style scoped></style>
