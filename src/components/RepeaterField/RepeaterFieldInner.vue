<template>
  <div class="repeated-field-inner">
    <RepeatedItemTableView
      v-if="isTable"
      :field="field"
      :name-suffix="nameSuffixValue"
    />
    <RepeaterFieldBlockView
      v-else
      :field="field"
      :name-suffix="nameSuffixValue"
    />
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
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { createId, useI18n } from "@tager/admin-services";
import { BaseButton } from "@tager/admin-ui";

import type { RepeaterField } from "../../typings/model";
import { universalFieldUtils } from "../../services/fields";

import RepeatedItemTableView from "./components/RepeaterFieldTableView.vue";
import RepeaterFieldBlockView from "./components/RepeaterFieldBlockView.vue";

interface Props {
  field: RepeaterField;
  maxItemsCount: number;
  nameSuffix: string;
  hideCount: boolean;
  addLabel?: string;
}

export default defineComponent({
  name: "RepeatedItemTreeInner",
  components: { RepeatedItemTableView, RepeaterFieldBlockView, BaseButton },
  props: {
    field: {
      type: Object as PropType<Props["field"]>,
      required: true,
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
      addElement,
      nameSuffixValue: props.nameSuffix,
      isTable: props.field.config.meta?.view === "TABLE",
    };
  },
});
</script>

<style scoped lang="scss">
.button-row {
  &:not(:first-child) {
    margin-top: 1rem;
  }

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

.repeated-field-table {
  :deep(.form-group) {
    margin-bottom: 0;
  }
}
</style>
