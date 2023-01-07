<template>
  <ToggleSection
    v-model:isOpen="isOpen"
    :label="field.config.label"
    @toggle="setIsOpen"
  >
    <DynamicField
      v-for="nestedField in field.value"
      :key="nestedField.config.name"
      :field="nestedField"
    />
  </ToggleSection>
</template>

<script lang="ts">
import {
  type Component,
  defineAsyncComponent,
  defineComponent,
  type PropType,
} from "vue";

import { useLocalStorage, ToggleSection } from "@tager/admin-ui";

import type { GroupField } from "../../../../typings/model";

interface Props {
  field: GroupField;
  defaultIsOpen: boolean;
}

export default defineComponent({
  name: "FieldGroup",
  components: {
    ToggleSection,
    DynamicField: defineAsyncComponent<Component>(
      () => import("../../DynamicField.vue")
    ),
  },
  props: {
    field: {
      type: Object as PropType<Props["field"]>,
      required: true,
    },
    defaultIsOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: Props) {
    const pseudoUniqueKey = props.field.config.fields
      .map((field) => field.name)
      .join("").length;

    const [isOpen, setIsOpen] = useLocalStorage(
      `is_${props.field.config.name}_${pseudoUniqueKey}_open`,
      props.defaultIsOpen
    );

    return {
      isOpen,
      setIsOpen,
    };
  },
});
</script>
