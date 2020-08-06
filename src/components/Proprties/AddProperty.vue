<template>
  <div class="d-flex flex-row align-center">
    <v-form class="col-10 d-flex flex-row align-center" v-model="valid">
      <v-col cols="1">{{ propertyList.length + 1 }})</v-col>
      <v-col class="d-flex" cols="9">
        <v-col cols="6">
          <v-text-field
            label="name"
            :rules="[rules.required]"
            v-model="property.name"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="value"
            :rules="[rules.required]"
            v-model="property.value"
          />
        </v-col>
      </v-col>
      <v-col cols="2">
        <div class="d-flex flex-row">
          <v-btn color="success" :disabled="!valid" @click="createProp"
            >Create</v-btn
          >
        </div>
      </v-col>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Property } from "@/helpers/api/usersData";
import Rules from "@/helpers/rules/RulesHelper";

@Component({
  name: "AddProperty"
})
export default class AddProperty extends Vue {
  private valid = false;
  private property = { name: "", value: "" };
  private rules = Rules;

  get propertyList(): Property[] {
    return this.$store.getters.getUserData.properties;
  }

  private createProp() {
    const createProperty: Property = {
      ...this.property,
      id: this.propertyList.length + 1
    };
    this.$store.dispatch("userPropertiesAction", {
      action: "add",
      property: createProperty
    });
    this.property = { name: "", value: "" };
  }
}
</script>

<style scoped></style>
