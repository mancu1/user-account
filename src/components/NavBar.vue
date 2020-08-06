<template>
  <v-app-bar app>
    <!-- -->
    <v-col>
      <v-row class="align-center">
        <v-col cols="3" class="d-flex justify-start">
          <h2>mancu1</h2>
        </v-col>
        <v-col class="d-flex justify-center" cols="6">
          <v-img contain height="60" alt="Vue logo" src="../assets/logo.png" />
        </v-col>
        <v-col cols="3">
          <v-btn v-if="isLogin" @click="logout">
            Выход
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "NavBar"
})
export default class NavBar extends Vue {
  get isLogin() {
    return this.$store.getters.isLogin;
  }

  logout() {
    this.$store.dispatch("logout");
  }
}
</script>

<style scoped></style>
