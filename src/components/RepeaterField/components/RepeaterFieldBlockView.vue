<template>
  <ul v-if="field.value && field.value.length" class="nested-element-list">
    <li v-for="(nestedElement, index) of field.value" :key="nestedElement.id">
      <RepeaterFieldBlockItem
        :item="nestedElement"
        :index="index"
        :parent-field="field"
        :name-suffix="nameSuffix"
      />
    </li>
  </ul>
</template>
<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";
import kebabCase from "lodash.kebabcase";

import { type ColumnDefinition } from "@tager/admin-ui";

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

    const columnDefs = computed<Array<ColumnDefinition<RowData>>>(() => {
      const columnWidth = visibleFields.value.find((item) => item.width)
        ? "auto"
        : `calc(100% / ${visibleFields.value.length})`;

      const definitions: Array<ColumnDefinition<RowData>> =
        visibleFields.value.map((fieldConfig, index) => ({
          id: index + 1,
          name: fieldConfig.label || "",
          field: fieldConfig.name,
          style: { width: fieldConfig.width || columnWidth },
          headStyle: { width: fieldConfig.width || columnWidth },
        }));

      definitions.push({
        id: definitions.length + 1,
        name: "",
        field: "actions",
        style: {
          width: "139px",
          whiteSpace: "nowrap",
        },
        headStyle: {
          width: "139px",
        },
      });

      return definitions;
    });

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

    const checkVisible = (index: number): boolean => {
      const result: Array<{
        field: string;
        value: any;
      }> = [];

      props.field.value[index].value.forEach((item) => {
        result.push({
          field: item.config.name,
          value: item.value,
        });
      });

      const rowField = props.field.value[index];
      // console.log(props.field.config.fields[index]?.checkVisible);
      /*
      if(item.config.checkVisible){

      }*/

      // console.log(props.field);

      return true;
    };

    return {
      checkVisible,
      columnDefs,
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
