<template>
  <v-col>
    <v-row>
      <v-spacer />
      <v-card width="400px">
        <div class="d-flex">
          <v-tabs v-model="currentTab" centered>
            <v-tab>Login</v-tab>
            <v-tab>Sign up</v-tab>
          </v-tabs>
        </div>
        <div class="ma-2">
          <LoginForm v-if="!currentTab" />
          <SignUpForm v-else />
        </div>
      </v-card>
      <v-spacer />
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginForm from "@/components/Auth/LoginForm.vue";
import SignUpForm from "@/components/Auth/SignUpForm.vue";

@Component({
  name: "Auth",
  components: { SignUpForm, LoginForm }
})
export default class Auth extends Vue {
  private currentTab = null;

  get isLogin(): boolean {
    return this.$store.getters.isLogin;
  }

  private created() {
    if (this.isLogin) this.$router.push("/");
  }
}
</script>
