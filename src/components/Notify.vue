<template>
  <v-snackbar
    style="white-space: pre-wrap"
    v-model="notifyStatus"
    :color="type"
    multi-line
    bottom
    right
    :timeout="5000"
  >
    <v-col cols="12" class="py-0 my-0">
      <div class="title">{{ title }}</div>
      <div>{{ text }}</div>
      <v-row>
        <v-spacer />
        <v-btn small @click="notifyStatus = false">Закрыть</v-btn>
      </v-row>
    </v-col>
  </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { MutationPayload } from "vuex";
@Component({
  name: "Notify"
})
export default class Notify extends Vue {
  notifyStatus = false;
  title = "";
  text = "";
  type: "error" | "info" = "error";

  created() {
    this.$store.subscribe((mutation: MutationPayload) => {
      switch (mutation.type) {
        case "setNotifyMessage": {
          this.notifyStatus = false;
          const notify = mutation.payload as {
            title: string;
            message: string;
            error: boolean;
          };
          this.title = notify.title;
          this.text = notify.message;
          this.type = notify.error ? "error" : "info";
          this.notifyStatus = true;
        }
      }
    });
  }
}
</script>

<style scoped></style>
