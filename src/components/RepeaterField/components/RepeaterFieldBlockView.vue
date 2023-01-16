<template>
  <ul v-if="field.value && field.value.length" class="nested-element-list">
    <li v-for="(nestedElement, index) of field.value" :key="nestedElement.id">
      <RepeaterFieldBlockItem
        :item="nestedElement"
        :index="index"
        :parent-field="field"
        :name-suffix="nameSuffix"
        :disabled="disabled"
        :no-move-actions="noMoveActions"
      />
    </li>
  </ul>
</template>
<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";
import kebabCase from "lodash.kebabcase";

import type {
  FieldConfigUnion,
  FieldUnion,
  RepeaterField,
} from "../../../typings/model";
import { moveItem, removeItem } from "../RepeaterField.helpers";

import RepeaterFieldBlockItem from "./RepeaterFieldBlockItem.vue";

interface Props {
  field: RepeaterField;
  nameSuffix?: string;
}

export default defineComponent({
  name: "RepeatedItemTable",
  components: {
    RepeaterFieldBlockItem,
  },
  props: {
    field: {
      type: Object as PropType<Props["field"]>,
      required: true,
    },
    noMoveActions: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    nameSuffix: {
      type: String,
      default: "",
    },
  },
  setup(props: Props) {
    type RowData = Record<string, FieldUnion>;

    const visibleFields = computed(() =>
      props.field.config.fields.filter(
        (fieldConfig) => !fieldConfig.meta?.hidden
      )
    );

    const rowData = computed<Array<RowData>>(() =>
      props.field.value.map((entity) =>
        entity.value.reduce(
          (row, field) => ({ ...row, [field.config.name]: field }),
          {}
        )
      )
    );

    function handleItemRemove(index: number) {
      removeItem(props.field, index);
    }

    function handleItemMove(index: number, direction: "up" | "down") {
      moveItem(props.field, index, direction);
    }

    function getSlotName(fieldConfig: FieldConfigUnion) {
      return `cell(${kebabCase(fieldConfig.name)})`;
    }

    return {
      rowData,
      visibleFields,
      handleItemMove,
      handleItemRemove,
      getSlotName,
    };
  },
});
</script>
<style lang="scss" scoped>
.nested-element-list li {
  &:not(:first-child) {
    margin-top: 1rem;
  }
}
</style>
