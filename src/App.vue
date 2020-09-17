<template>
  <div>
    <!--  <v-app>-->
    <!--    <NavBar />-->
    <!--    &lt;!&ndash; Sizes your content based upon application components &ndash;&gt;-->
    <!--    <v-main>-->
    <!--      &lt;!&ndash; Provides the application the proper gutter &ndash;&gt;-->
    <!--      <v-container fluid>-->
    <!--        &lt;!&ndash; If using vue-router &ndash;&gt;-->
    <router-view></router-view>
    <!--      </v-container>-->
    <!--    </v-main>-->

    <!--    <v-footer app>-->
    <!--      &lt;!&ndash; &ndash;&gt;-->
    <!--    </v-footer>-->
    <!--    <Notify />-->
    <!--  </v-app>-->
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html {
  overflow: auto !important;
}
</style>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";
import Notify from "@/components/Notify.vue";

@Component({
  components: { Notify, NavBar },
})
export default class App extends Vue {}
</script>
