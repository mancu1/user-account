<template>
  <v-col>
    <v-row>
      <v-spacer />
      <v-col cols="4" v-if="userStatus.status">
        <h1>{{ userStatus.userName }}</h1>
      </v-col>
      <v-spacer />
    </v-row>
    <v-row v-if="userData">
      <UserProperties v-bind:user-properties="userData.properties" />
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GetUserData } from "@/helpers/api/usersData";
import { UserStatus } from "@/helpers/api/loginHelper";
import UserProperties from "@/components/Proprties/UserProperties.vue";

@Component({
  name: "UserData",
  components: { UserProperties }
})
export default class UserData extends Vue {
  get userId(): number | undefined {
    return this.$store.getters.getUserId;
  }

  get userData(): GetUserData | null {
    return this.$store.getters.getUserData;
  }

  get userStatus(): UserStatus {
    return this.$store.getters.getUserStatus;
  }

  private created() {
    if (this.userId) {
      this.$store.dispatch("getUserData", this.userId);
    }
  }
}
</script>
