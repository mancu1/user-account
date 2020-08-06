<template>
  <div class="d-flex align-center">
    <div v-if="isEditProp" class="d-flex flex-row align-center">
      <v-col cols="1">{{ property.id }})</v-col>
      <v-col class="d-flex" cols="9">
        <v-col cols="6">
          <v-text-field label="name" v-model="editProperty.name" />
        </v-col>
        <v-col cols="6">
          <v-text-field label="value" v-model="editProperty.value" />
        </v-col>
      </v-col>
      <v-col cols="2">
        <div class="d-flex flex-row">
          <v-btn class="mr-4" color="success" @click="saveProp">Save</v-btn>
          <v-btn color="error" @click="cancelEdit">Cancel</v-btn>
        </div>
      </v-col>
    </div>
    <v-btn v-else color="warning" @click="initEdit">Edit</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync } from "vue-property-decorator";
import { Property } from "@/helpers/api/usersData";

@Component({
  name: "EditProperty"
})
export default class EditProperty extends Vue {
  private editProperty: Property | null = null;

  @Prop({ required: true }) property!: Property;
  @PropSync("isEdit") isEditProp!: boolean;

  initEdit() {
    this.editProperty = this.property;
    this.isEditProp = true;
  }

  saveProp() {
    this.$store.dispatch("userPropertiesAction", {
      action: "edit",
      property: this.editProperty
    });
    this.cancelEdit();
  }

  cancelEdit() {
    this.isEditProp = false;
    this.editProperty = null;
  }
}
</script>

<style scoped></style>
