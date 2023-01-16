<template>
  <FormField
    v-if="is('STRING', 'URL')"
    :value="field.value"
    :label="label"
    :name="name"
    @update:value="handleUpdate"
  />
  <FormField
    v-else-if="is('DATE')"
    :value="field.value"
    :label="label"
    :name="name"
    type="date"
    @update:value="handleUpdate"
  />
  <DateTimeInput
    v-else-if="is('DATETIME')"
    :value="field.value"
    :label="label"
    :name="name"
    @update:value="handleUpdate"
  />
  <FormField
    v-else-if="is('NUMBER')"
    type="number"
    :value="field.value"
    :label="label"
    :name="name"
    @update:value="handleUpdate"
  />
  <FormField
    v-else-if="is('TEXT')"
    :value="field.value"
    :label="label"
    :name="name"
    type="textarea"
    :rows="4"
    @update:value="handleUpdate"
  />
  <FormFieldRichTextInput
    v-else-if="is('HTML')"
    :value="field.value"
    :label="label"
    :name="name"
    @update:value="handleUpdate"
  />
  <FormFieldCheckbox
    v-else-if="is('TRUE_FALSE')"
    :checked="field.value"
    :label="label"
    :name="name"
    @update:checked="handleUpdate"
  />
  <FormFieldMinMax
    v-else-if="is('MIN_MAX')"
    :value="field.value"
    :label="label"
    :name="name"
    @update:value="handleUpdate"
  />
  <FormFieldSelect
    v-else-if="is('SELECT')"
    :value="field.value"
    :label="label"
    :name="name"
    :searchable="field.config.meta.searchable"
    :options="field.config.meta.options"
    @update:value="handleUpdate"
  />
  <AjaxSelect
    v-else-if="is('AJAX_SELECT')"
    :value="field.value"
    :request-url="field.config.meta.requestUrl"
    :value-field="field.config.meta.valueField"
    :label-field="field.config.meta.labelField"
    @update:value="handleUpdate"
  />
  <FormFieldMultiSelect
    v-else-if="is('MULTI_SELECT')"
    :selected-options="field.value"
    :label="label"
    :name="name"
    :max-selected-count="field.config.meta.maximumItemsCount"
    :options="field.config.meta.options"
    @update:selected-options="handleUpdate"
  />
  <FormFieldColorInput
    v-else-if="is('COLOR')"
    :value="field.value"
    :label="label"
    :name="name"
    @update:value="handleUpdate"
  />
  <ButtonField
    v-else-if="is('BUTTON')"
    :value="field.value"
    :label="label"
    :name="name"
    @update:value="handleUpdate"
  />
  <MapField
    v-else-if="is('MAP')"
    :value="field.value"
    :label="label"
    :name="name"
    @update:value="handleUpdate"
  />
  <FormFieldFileInput
    v-else-if="is('IMAGE')"
    :value="field.value"
    :label="label"
    :name="name"
    file-type="image"
    :scenario="field.config.meta.scenario"
    @update:value="handleUpdate"
  />
  <FormFieldFileInput
    v-else-if="is('GALLERY')"
    :value="field.value"
    :label="label"
    :name="name"
    file-type="image"
    multiple
    :scenario="field.config.meta.scenario"
    :with-captions="field.config.meta.withCaptions"
    @update:value="handleUpdate"
  />
  <FormFieldFileInput
    v-else-if="is('FILE')"
    :value="field.value"
    :label="label"
    :name="name"
    file-type="file"
    :scenario="field.config.meta.scenario"
    @update:value="handleUpdate"
  />
  <RepeaterField
    v-else-if="is('REPEATER')"
    :field="field"
    :name-suffix="nameSuffix"
    :name="name"
    :no-toggle="field.config.meta.noToggle"
    :add-label="field.config.meta.addLabel"
    :hide-count="field.config.meta.hideCount"
    :default-is-open="field.config.meta.defaultIsOpen"
    :max-items-count="field.config.meta.maximumItemsCount"
    :no-move-actions="field.config.meta.noMoveActions"
    :no-label="isLabelHidden"
  />
  <FieldGroup
    v-else-if="is('GROUP')"
    :field="field"
    :default-is-open="field.config.meta.defaultIsOpen"
    :no-toggle="field.config.meta.noToggle"
  />
  <div v-else>Unknown field with type: {{ field.config.type }}</div>
</template>
<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";

import {
  FormField,
  FormFieldFileInput,
  FormFieldRichTextInput,
  FormFieldCheckbox,
  FormFieldSelect,
  FormFieldMultiSelect,
  FormFieldColorInput,
  ButtonField,
  DateTimeInput,
  MapField,
  AjaxSelect,
  FormFieldMinMax,
} from "@tager/admin-ui";

import type { FieldUnion } from "../../typings/model";
import RepeaterField from "../RepeaterField";
import FieldGroup from "../GroupField";

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
    FormFieldCheckbox,
    FormFieldSelect,
    FormFieldMultiSelect,
    FormFieldColorInput,
    FormFieldMinMax,
    ButtonField,
    DateTimeInput,
    MapField,
    AjaxSelect,
    RepeaterField,
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
  emit: ["change"],
  setup(props: Props, { emit }) {
    const label = computed(() =>
      props.isLabelHidden ? null : props.field.config.label
    );

    const name = computed(() => props.field.config.name + props.nameSuffix);

    function is(...types: string[]): boolean {
      return types.includes(props.field.config.type);
    }

    function handleUpdate(newValue: unknown) {
      // eslint-disable-next-line vue/no-mutating-props
      props.field.value = newValue as FieldUnion["value"];
      emit("change", props.field.value);
    }

    return { label, name, is, handleUpdate };
  },
});
</script>
