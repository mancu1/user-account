<template>
  <div class="schedule" @click="hello">{{ schedule.title }}</div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: ["schedule"],

  methods: {
    hello() {
      alert(this.schedule.title);
    },
  },
});
</script>

<style scoped>
.schedule {
  width: 100%;
  height: 100%;
}
</style>
