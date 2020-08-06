<template>
  <div class="d-flex flex-row align-center justify-start">
    <ReadonlyProperty
      :class="!isEdit ? 'col-10' : ''"
      v-if="!isEdit"
      v-bind:property="property"
    />
    <EditProperty
      :class="!isEdit ? 'col-2' : 'col-10'"
      @update:isEdit="isEdit = $event"
      v-bind:is-edit="isEdit"
      v-bind:property="property"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Property } from "@/helpers/api/usersData";
import ReadonlyProperty from "@/components/Proprties/ReadonlyProperty.vue";
import EditProperty from "@/components/Proprties/EditProperty.vue";

@Component({
  name: "PropertyViewer",
  components: { EditProperty, ReadonlyProperty }
})
export default class PropertyViewer extends Vue {
  private isEdit = false;

  @Prop({ required: true }) property!: Property;
}
</script>

<style scoped></style>
