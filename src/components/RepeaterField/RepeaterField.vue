<template>
  <div v-if="noToggle" class="repeater-field">
    <InputLabel v-if="!noLabel && label">{{ label }}</InputLabel>
    <RepeatedItemTreeInner
      :field="field"
      :max-items-count="maxItemsCount"
      :name-suffix="nameSuffix"
      :hide-count="hideCount"
      :add-label="addLabel"
      :disabled="disabled"
      :no-move-actions="noMoveActions"
      :is-empty-hidden="isEmptyHidden"
    />
  </div>
  <ToggleSection
    v-else
    v-model:isOpen="isOpen"
    :label="label"
    @toggle="setIsOpen"
  >
    <RepeatedItemTreeInner
      :field="field"
      :max-items-count="maxItemsCount"
      :name-suffix="nameSuffix"
      :hide-count="hideCount"
      :add-label="addLabel"
      :disabled="disabled"
      :no-move-actions="noMoveActions"
      :is-empty-hidden="isEmptyHidden"
    />
  </ToggleSection>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";

import { createId, useI18n } from "@tager/admin-services";
import { useLocalStorage, ToggleSection, InputLabel } from "@tager/admin-ui";

import type { RepeaterField } from "../../typings/model";
import { universalFieldUtils } from "../../services/fields";

import RepeatedItemTreeInner from "./RepeaterFieldInner.vue";

interface Props {
  field: RepeaterField;
  defaultIsOpen: boolean;
  noMoveActions: boolean;
  maxItemsCount: number;
  nameSuffix: string;
  hideCount: boolean;
  noLabel: boolean;
  addLabel?: string;
}

export default defineComponent({
  name: "RepeatedItemTree",
  components: {
    RepeatedItemTreeInner,
    ToggleSection,
    InputLabel,
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
    noMoveActions: {
      type: Boolean,
      default: false,
    },
    noLabel: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    noToggle: {
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
    isEmptyHidden: {
      type: Boolean,
      default: false,
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

    const label = computed<string>(() => {
      return props.field.config.label
        ? `${props.field.config.label}${
            !props.hideCount ? " (" + props.field.value.length + ")" : ""
          }`
        : "";
    });

    return {
      i18n,
      label,
      isOpen,
      setIsOpen,
      addElement,
      nameSuffixValue: props.nameSuffix,
      isTable: props.field.config.meta?.view === "TABLE",
    };
  },
});
</script>

<style scoped>
.repeater-field:not(:last-child){
  margin-bottom: 1.5rem;
}
</style>
