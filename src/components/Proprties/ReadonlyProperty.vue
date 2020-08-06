<template>
  <div class="d-flex flex-row align-center">
    <v-col cols="1">{{ property.id }})</v-col>
    <v-col class="d-flex" cols="9">
      <v-col cols="6">
        <v-text-field label="name" readonly :value="property.name" />
      </v-col>
      <v-col cols="6">
        <v-text-field label="value" readonly :value="property.value" />
      </v-col>
    </v-col>
    <v-col cols="2">
      <div class="d-flex flex-row">
        <v-btn color="error" @click="deleteProp">Delete</v-btn>
      </div>
    </v-col>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Property } from "@/helpers/api/usersData";

@Component({
  name: "ReadonlyProperty"
})
export default class ReadonlyProperty extends Vue {
  @Prop({ required: true }) property!: Property;

  deleteProp() {
    this.$store.dispatch("userPropertiesAction", {
      action: "delete",
      property: this.property
    });
  }
}
</script>

<style scoped></style>
