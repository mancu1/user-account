<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :rules="[rules.required]"
        v-bind:value="value"
        @change="$emit('input', $event)"
        :label="label"
        prepend-icon="mdi-timelapse"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      :allowed-hours="allowedHours"
      :allowed-minutes="allowedMinutes"
      v-if="menu"
      v-model="preTime"
      format="24hr"
      full-width
      @click:minute="returnValue"
    ></v-time-picker>
  </v-menu>
</template>

<script lang="ts">
import { Vue, Component, Model, Prop } from "vue-property-decorator";
import Rules from "@/helpers/rules/RulesHelper";

@Component({
  name: "TimeSelector",
})
export default class TimeSelector extends Vue {
  @Model("input", { type: String }) readonly value!: string;
  @Prop({ required: false, type: Array }) allowedHours: Array<any> | undefined;
  @Prop({ required: false, type: Array }) allowedMinutes:
    | Array<any>
    | undefined;
  @Prop() label: string | undefined;

  preTime = this.value;
  rules = Rules;
  menu = false;

  returnValue() {
    this.menu = false;
    this.$emit("input", this.preTime);
  }
}
</script>

<style scoped></style>
