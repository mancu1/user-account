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
        :value="timeFormatted"
        :label="label"
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
import { Vue, Component, Model, Prop } from "vue-property-decorator";
import Rules from "@/helpers/rules/RulesHelper";
import moment from "moment";

@Component({
  name: "DateSelector",
})
export default class DateSelector extends Vue {
  @Model("input", { type: Date }) readonly value!: Date;
  @Prop() label: string | undefined;

  preDate = this.value.toISOString().substr(0, 10);
  rules = Rules;
  menu = false;

  get timeFormatted(): string {
    return moment(this.preDate).format("DD MMM YYYY");
  }

  returnValue() {
    this.menu = false;
    this.$emit("input", moment(this.preDate).toDate());
  }
}
</script>

<style scoped></style>
