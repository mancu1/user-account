<template>
  <div>
    <v-form v-model="valid">
      <v-text-field
        outlined
        :value="form.userName"
        @input="setFormData('userName', $event)"
        label="Login"
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        outlined
        :rules="[rules.required, rules.password]"
        :value="form.password"
        @input="setFormData('password', $event)"
        label="password"
        :append-icon="passwordVisibility ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="() => (passwordVisibility = !passwordVisibility)"
        :type="passwordVisibility ? 'text' : 'password'"
      ></v-text-field>
      <div>
        <v-btn :disabled="!valid" color="success" @click="login">login</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Rules from "@/helpers/rules/RulesHelper.ts";

@Component
export default class LoginForm extends Vue {
  private passwordVisibility = false;
  private valid = false;
  private rules = Rules;

  get form() {
    return this.$store.getters.getLoginForm;
  }

  setFormData(name: string, value: string) {
    this.$store.commit("setFormData", { name, value });
  }

  private login() {
    this.$store.dispatch("login", {
      userName: this.form.userName,
      password: this.form.password
    });
  }
}
</script>

<style scoped></style>
