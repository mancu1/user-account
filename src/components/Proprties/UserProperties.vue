<template>
  <v-col cols="12">
    <v-row v-for="(prop, index) in userProperties" v-bind:key="index">
      <v-spacer />
      <v-col cols="7">
        <PropertyViewer v-bind:property="prop" />
      </v-col>
      <v-spacer />
    </v-row>
    <v-row>
      <v-spacer />
      <v-col cols="7">
        <AddProperty />
      </v-col>
      <v-spacer />
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Property } from "@/helpers/api/usersData";
import AddProperty from "@/components/Proprties/AddProperty.vue";
import PropertyViewer from "@/components/Proprties/PropertyViewer.vue";

@Component({
  name: "UserProperties",
  components: { PropertyViewer, AddProperty }
})
export default class UserProperties extends Vue {
  @Prop({ required: true }) userProperties!: Property[];
}
</script>

<style scoped></style>
