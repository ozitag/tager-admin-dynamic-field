<template>
  <BaseTable
    :column-defs="columnDefs"
    enumerable
    :row-data="rowData"
    class="repeated-field-table"
  >
    <template
      v-for="fieldConfig of visibleFields"
      :key="fieldConfig.name"
      #[getSlotName(fieldConfig)]="{ row, rowIndex }"
    >
      <td :style="{ width: columnWidth }">
        <DynamicField
          :field="row[fieldConfig.name]"
          is-label-hidden
          :name-suffix="nameSuffix + '__' + rowIndex"
        />
      </td>
    </template>

    <template #cell(actions)="{ row, rowIndex }">
      <td style="width: 140px; white-space: nowrap">
        <BaseButton
          variant="icon"
          :disabled="rowIndex === 0"
          @click="handleItemMove(rowIndex, 'up')"
        >
          <NorthIcon />
        </BaseButton>
        <BaseButton
          variant="icon"
          :disabled="rowIndex === field.value.length - 1"
          @click="handleItemMove(rowIndex, 'down')"
        >
          <SouthIcon />
        </BaseButton>
        <BaseButton
          variant="icon"
          :disabled="row.canBeDeleted ? !row.canBeDeleted.value : false"
          @click="handleItemRemove(rowIndex)"
        >
          <DeleteIcon />
        </BaseButton>
      </td>
    </template>
  </BaseTable>
</template>
<script lang="ts">
import {
  type Component,
  computed,
  defineAsyncComponent,
  defineComponent,
  type PropType,
} from "vue";
import kebabCase from "lodash.kebabcase";

import {
  BaseButton,
  type ColumnDefinition,
  BaseTable,
  NorthIcon,
  SouthIcon,
  DeleteIcon,
} from "@tager/admin-ui";

import type {
  FieldConfigUnion,
  FieldUnion,
  RepeaterField,
} from "../../../typings/model";

import { moveItem, removeItem } from "./RepeatedItem";

interface Props {
  field: RepeaterField;
  nameSuffix?: string;
}

export default defineComponent({
  name: "RepeatedItemTable",
  components: {
    BaseTable,
    BaseButton,
    NorthIcon,
    SouthIcon,
    DeleteIcon,
    DynamicField: defineAsyncComponent<Component>(
      () => import("../DynamicField.vue")
    ),
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
        (fieldConfig) => !fieldConfig.meta.hidden
      )
    );

    const columnDefs = computed<Array<ColumnDefinition<RowData>>>(() => {
      const definitions = visibleFields.value.map((fieldConfig, index) => ({
        id: index + 1,
        name: fieldConfig.label,
        field: fieldConfig.name,
        useCustomDataCell: true,
      }));

      definitions.push({
        id: definitions.length + 1,
        name: "Actions",
        field: "actions",
        useCustomDataCell: true,
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

    const columnWidth = computed(
      () => `calc(100% / ${visibleFields.value.length})`
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
      columnDefs,
      rowData,
      visibleFields,
      handleItemMove,
      handleItemRemove,
      getSlotName,
      columnWidth,
    };
  },
});
</script>
