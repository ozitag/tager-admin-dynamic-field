<template>
  <FormField
    v-if="is('STRING', 'URL')"
    v-model:value="field.value"
    :label="label"
    :name="name"
  />
  <FormField
    v-else-if="is('DATE')"
    v-model:value="field.value"
    :label="label"
    :name="name"
    type="date"
  />
  <DateTimeInput
    v-else-if="is('DATETIME')"
    v-model:value="field.value"
    :label="label"
    :name="name"
  />
  <FormFieldNumberInput
    v-else-if="is('NUMBER')"
    v-model:value="field.value"
    :label="label"
    :name="name"
  />
  <FormField
    v-else-if="is('TEXT')"
    v-model:value="field.value"
    :label="label"
    :name="name"
    type="textarea"
    :rows="4"
  />
  <FormFieldRichTextInput
    v-else-if="is('HTML')"
    v-model:value="field.value"
    :label="label"
    :name="name"
  />
  <FormFieldCheckbox
    v-else-if="is('TRUE_FALSE')"
    v-model:checked="field.value"
    :label="label"
    :name="name"
  />
  <FormFieldSelect
    v-else-if="is('SELECT')"
    v-model:value="field.value"
    :label="label"
    :name="name"
    :searchable="field.config.meta.searchable"
    :options="field.config.meta.options"
  />
  <AjaxSelect
    v-else-if="is('AJAX_SELECT')"
    v-model:value="field.value"
    :request-url="field.config.meta.requestUrl"
    :value-field="field.config.meta.valueField"
    :label-field="field.config.meta.labelField"
  />
  <FormFieldMultiSelect
    v-else-if="is('MULTI_SELECT')"
    v-model:selected-options="field.value"
    :label="label"
    :name="name"
    :max-selected-count="field.config.meta.maximumItemsCount"
    :options="field.config.meta.options"
  />
  <FormFieldColorInput
    v-else-if="is('COLOR')"
    v-model:value="field.value"
    :label="label"
    :name="name"
  />
  <ButtonField
    v-else-if="is('BUTTON')"
    v-model:value="field.value"
    :label="label"
    :name="name"
  />
  <MapField
    v-else-if="is('MAP')"
    v-model:value="field.value"
    :label="label"
    :name="name"
  />
  <FormFieldFileInput
    v-else-if="is('IMAGE')"
    v-model:value="field.value"
    :label="label"
    :name="name"
    file-type="image"
    :scenario="field.config.meta.scenario"
  />
  <FormFieldFileInput
    v-else-if="is('GALLERY')"
    v-model:value="field.value"
    :label="label"
    :name="name"
    file-type="image"
    multiple
    :scenario="field.config.meta.scenario"
    :with-captions="field.config.meta.withCaptions"
  />
  <FormFieldFileInput
    v-else-if="is('FILE')"
    v-model:value="field.value"
    :label="label"
    :name="name"
    file-type="file"
    :scenario="field.config.meta.scenario"
  />
  <RepeatedItemTree
    v-else-if="is('REPEATER')"
    :field="field"
    :name-suffix="nameSuffix"
    :name="name"
    :default-is-open="field.config.meta.defaultIsOpen"
    :max-items-count="field.config.meta.maximumItemsCount"
  />
  <FieldGroup
    v-else-if="is('GROUP')"
    :field="field"
    :default-is-open="field.config.meta.defaultIsOpen"
  />
  <div v-else>Unknown field with type: {{ field.config.type }}</div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

import {
  FormField,
  FormFieldFileInput,
  FormFieldRichTextInput,
  FormFieldNumberInput,
  FormFieldCheckbox,
  FormFieldSelect,
  FormFieldMultiSelect,
  FormFieldColorInput,
  ButtonField,
  DateTimeInput,
  MapField,
  AjaxSelect,
} from "@tager/admin-ui";

import { FieldUnion } from "../../typings/model";

import RepeatedItemTree from "./components/RepeatedItemTree";
import FieldGroup from "./components/FieldGroup";

interface Props {
  field: FieldUnion;
  isLabelHidden?: boolean;
  nameSuffix?: string;
}

export default defineComponent({
  name: "DynamicField",
  components: {
    FormField,
    FormFieldFileInput,
    FormFieldRichTextInput,
    FormFieldNumberInput,
    FormFieldCheckbox,
    FormFieldSelect,
    FormFieldMultiSelect,
    FormFieldColorInput,
    ButtonField,
    DateTimeInput,
    MapField,
    AjaxSelect,
    RepeatedItemTree,
    FieldGroup,
  },
  props: {
    field: {
      type: Object as PropType<Props["field"]>,
      required: true,
    },
    isLabelHidden: {
      type: Boolean,
      default: false,
    },
    nameSuffix: {
      type: String,
      default: "",
    },
  },
  setup(props: Props) {
    const label = computed(() =>
      props.isLabelHidden ? null : props.field.config.label
    );

    const name = computed(() => props.field.config.name + props.nameSuffix);

    function is(...types: string[]): boolean {
      return types.includes(props.field.config.type);
    }

    return { label, name, is };
  },
});
</script>

<style scoped></style>
