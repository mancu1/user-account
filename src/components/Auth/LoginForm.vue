<template>
  <div>
    <v-form>
      <v-text-field outlined label="Login"></v-text-field>
      <v-text-field
        outlined
        label="password"
        :append-icon="passwordVisibility ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="() => (passwordVisibility = !passwordVisibility)"
        :type="passwordVisibility ? 'text' : 'password'"
      ></v-text-field>
      <div>
        <v-btn color="success">login</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LoginForm extends Vue {
  private passwordVisibility = false;
}
</script>

<style scoped></style>
