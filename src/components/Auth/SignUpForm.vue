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
      <v-text-field
        outlined
        label="repeat pass"
        :append-icon="repeatPasswordVisibility ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="() => (repeatPasswordVisibility = !passwordVisibility)"
        :type="repeatPasswordVisibility ? 'text' : 'password'"
      ></v-text-field>
    </v-form>
    <div>
      <v-btn color="success">Sing up</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "SignUpForm"
})
export default class SignUpForm extends Vue {
  private passwordVisibility = false;
  private repeatPasswordVisibility = false;
}
</script>

<style scoped></style>
