<template>
  <div>
    <v-form v-model="valid">
      <v-text-field
        outlined
        :value="form.userName"
        @input="setFormData('userName', $event)"
        label="Login"
      ></v-text-field>
      <v-text-field
        outlined
        label="password"
        :rules="[rules.required, rules.password]"
        :value="form.password"
        @input="setFormData('password', $event)"
        :append-icon="passwordVisibility ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="() => (passwordVisibility = !passwordVisibility)"
        :type="passwordVisibility ? 'text' : 'password'"
      ></v-text-field>
      <v-text-field
        outlined
        :value="form.repeatPassword"
        @input="setFormData('repeatPassword', $event)"
        label="repeat password"
        :rules="[rules.required, rules.password, passwordCheck]"
        :append-icon="repeatPasswordVisibility ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="
          () => (repeatPasswordVisibility = !repeatPasswordVisibility)
        "
        :type="repeatPasswordVisibility ? 'text' : 'password'"
      ></v-text-field>
    </v-form>
    <div>
      <v-btn :disabled="!valid" @click="registration" color="success"
        >Sing up</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Rules from "@/helpers/rules/RulesHelper";

@Component({
  name: "SignUpForm"
})
export default class SignUpForm extends Vue {
  private passwordVisibility = false;
  private repeatPasswordVisibility = false;
  private valid = false;
  private rules = Rules;

  passwordCheck(value: string) {
    return this.rules.passwordCheck(value, this.form.password);
  }

  get form() {
    return this.$store.getters.getLoginForm;
  }

  setFormData(name: string, value: string) {
    this.$store.commit("setFormData", { name, value });
  }

  private registration() {
    this.$store.dispatch("registration", {
      userName: this.form.userName,
      password: this.form.password,
      repeatPassword: this.form.repeatPassword
    });
  }
}
</script>

<style scoped></style>
