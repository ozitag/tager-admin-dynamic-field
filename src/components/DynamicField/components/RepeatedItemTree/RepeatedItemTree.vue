<template>
  <ToggleSection
    v-model:isOpen="isOpen"
    :label="`${field.config.label}${
      !hideCount ? ' (' + field.value.length + ')' : ''
    }`"
    @toggle="setIsOpen"
  >
    <div class="repeated-field-inner">
      <RepeatedItemTable
        v-if="isTable"
        :field="field"
        :name-suffix="nameSuffixValue"
      />
      <ul v-else class="nested-element-list">
        <li
          v-for="(nestedElement, index) of field.value"
          :key="nestedElement.id"
          class="nested-element-container"
        >
          <RepeatedItem
            :item="nestedElement"
            :index="index"
            :parent-field="field"
            :name-suffix="nameSuffixValue"
          />
        </li>
      </ul>
      <div class="button-row">
        <BaseButton
          variant="outline-primary"
          :disabled="maxItemsCount > 0 && field.value.length >= maxItemsCount"
          @click="addElement"
        >
          {{ addLabel || i18n.t("dynamic-field:Add") }}
        </BaseButton>
        <span v-if="maxItemsCount > 0 && field.value.length >= maxItemsCount">
          {{ i18n.t("dynamic-field:MaximumItemsCount") }}:
          <b>{{ maxItemsCount }}</b>
        </span>
      </div>
    </div>
  </ToggleSection>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { createId, useI18n } from "@tager/admin-services";
import { useLocalStorage, BaseButton, ToggleSection } from "@tager/admin-ui";

import type { RepeaterField } from "../../../../typings/model";
import { universalFieldUtils } from "../../../../services/fields";
import RepeatedItem from "../RepeatedItem/RepeatedItem.vue";
import RepeatedItemTable from "../RepeatedItemTable.vue";

interface Props {
  field: RepeaterField;
  defaultIsOpen: boolean;
  maxItemsCount: number;
  nameSuffix: string;
  hideCount: boolean;
  addLabel?: string;
}

export default defineComponent({
  name: "RepeatedItemTree",
  components: { RepeatedItem, RepeatedItemTable, BaseButton, ToggleSection },
  props: {
    field: {
      type: Object as PropType<Props["field"]>,
      required: true,
    },
    defaultIsOpen: {
      type: Boolean,
      default: false,
    },
    maxItemsCount: {
      type: Number,
      default: 0,
    },
    nameSuffix: {
      type: String,
      default: "",
    },
    hideCount: {
      type: Boolean,
      default: false,
    },
    addLabel: {
      type: String,
      default: null,
    },
  },
  setup(props: Props) {
    const i18n = useI18n();
    const pseudoUniqueKey = props.field.config.fields
      .map((field) => field.name)
      .join("").length;

    const [isOpen, setIsOpen] = useLocalStorage<boolean>(
      `is_${props.field.config.name}_${pseudoUniqueKey}_open`,
      props.defaultIsOpen
    );

    function addElement() {
      const newNestedField = {
        id: createId(),
        value: props.field.config.fields.map((nestedFieldConfig) =>
          universalFieldUtils.createFormField(nestedFieldConfig, null)
        ),
      };

      // eslint-disable-next-line vue/no-mutating-props
      props.field.value.push(newNestedField);
    }

    return {
      i18n,
      isOpen,
      setIsOpen,
      addElement,
      nameSuffixValue: props.nameSuffix,
      isTable: props.field.config.meta.view === "TABLE",
    };
  },
});
</script>

<style scoped lang="scss">
.repeated-field-table {
  :deep(.form-group) {
    margin-bottom: 0;
  }
}

.repeated-field-inner {
  .title-button {
    display: inline-flex;
    align-items: center;
    color: inherit;
    margin-left: -0.375rem;
    transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    &:hover {
      cursor: pointer;
    }

    &.collapse {
      color: var(--primary);

      .icon-expand-more {
        color: var(--primary);
      }
    }
  }

  .icon-chevron-right {
    margin-right: 0.375rem;
    color: var(--secondary);
    transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    svg {
      display: block;
      fill: currentColor;
      will-change: transform;
      transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 0.24s;
    }

    &.icon-expand-more {
      svg {
        transform: rotate(90deg);
      }
    }
  }

  .content {
    margin: 1rem 0 2rem 0;
    padding: 0 1.5rem;
  }

  .nested-element-container {
    margin-bottom: 0.7rem;
  }

  .button-row {
    display: flex;
    align-items: center;

    > button {
      min-width: 150px;
    }

    span {
      display: inline-block;
      margin-left: 10px;
    }
  }
}
</style>
