<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :rules="[rules.required]"
        v-bind:value="value"
        label="Picker in menu"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="preDate" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="returnValue">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import { Vue, Component, Model } from "vue-property-decorator";
import Rules from "@/helpers/rules/RulesHelper";

@Component({
  name: "DateSelector",
})
export default class DateSelector extends Vue {
  @Model("input", { type: String }) readonly value!: string;

  preDate = this.value;
  rules = Rules;
  menu = false;

  returnValue() {
    this.menu = false;
    this.$emit("input", this.preDate);
  }
}
</script>

<style scoped></style>
