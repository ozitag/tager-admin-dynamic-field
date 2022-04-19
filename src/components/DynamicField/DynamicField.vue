<script lang="ts">
import { defineComponent, VNode } from "vue";

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
  props: {
    field: {
      type: Object,
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
  render(h, context) {
    const isLabelHidden = context.props.isLabelHidden;

    function renderField(field: FieldUnion): VNode {
      const commonProps = {
        label: isLabelHidden ? null : field.config.label,
        name: field.config.name + context.props.nameSuffix,
        value: field.value,
      };

      function handleChange(event: FieldUnion["value"]) {
        field.value = event;
      }

      switch (field.config.type) {
        case "URL":
        case "STRING":
          return h(FormField, {
            props: {
              ...commonProps,
            },
            on: {
              ...context.listeners,
              input: handleChange,
            },
          });
        case "DATE":
          return h(FormField, {
            props: {
              ...commonProps,
              type: "date",
            },
            on: {
              ...context.listeners,
              input: handleChange,
            },
          });
        case "DATETIME":
          return h(DateTimeInput, {
            props: {
              ...commonProps,
            },
            on: {
              ...context.listeners,
              change: handleChange,
            },
          });
        case "NUMBER":
          return h(FormFieldNumberInput, {
            props: {
              ...commonProps,
            },
            on: {
              ...context.listeners,
              input: handleChange,
            },
          });
        case "TEXT":
          return h(FormField, {
            props: {
              ...commonProps,
              type: "textarea",
              rows: 4,
            },
            on: {
              ...context.listeners,
              input: handleChange,
            },
          });
        case "HTML":
          return h(FormFieldRichTextInput, {
            props: {
              ...commonProps,
            },
            on: {
              ...context.listeners,
              input: handleChange,
            },
          });
        case "TRUE_FALSE":
          return h(FormFieldCheckbox, {
            props: {
              label: commonProps.label,
              name: commonProps.name,
              checked: field.value,
            },
            on: {
              ...context.listeners,
              change: handleChange,
            },
          });
        case "SELECT":
          return h(FormFieldSelect, {
            props: {
              label: commonProps.label,
              name: commonProps.name,
              searchable: field.config.meta.searchable,
            },
            attrs: {
              value: commonProps.value,
              options: field.config.meta.options,
            },
            on: {
              ...context.listeners,
              change: handleChange,
            },
          });
        case "AJAX_SELECT":
          return h(AjaxSelect, {
            props: {
              requestUrl: field.config.meta.requestUrl,
              valueField: field.config.meta.valueField,
              labelField: field.config.meta.labelField,
            },
            attrs: {
              value: commonProps.value,
            },
            on: {
              ...context.listeners,
              change: handleChange,
            },
          });
        case "MULTI_SELECT":
          return h(FormFieldMultiSelect, {
            props: {
              label: commonProps.label,
              name: commonProps.name,
              maxSelectedCount: field.config.meta.maximumItemsCount,
            },
            attrs: {
              selectedOptions: commonProps.value,
              options: field.config.meta.options,
            },
            on: {
              ...context.listeners,
              change: handleChange,
            },
          });
        case "COLOR":
          return h(FormFieldColorInput, {
            props: {
              ...commonProps,
            },
            on: {
              ...context.listeners,
              change: handleChange,
            },
          });
        case "BUTTON":
          return h(ButtonField, {
            props: {
              ...commonProps,
            },
            on: {
              ...context.listeners,
              change: handleChange,
            },
          });
        case "MAP":
          return h(MapField, {
            props: {
              ...commonProps,
            },
            on: {
              ...context.listeners,
              change: handleChange,
            },
          });
        case "IMAGE":
          return h(FormFieldFileInput, {
            props: {
              ...commonProps,
            },
            attrs: {
              fileType: "image",
              scenario: field.config.meta.scenario,
            },
            on: {
              ...context.listeners,
              change: handleChange,
            },
          });
        case "GALLERY":
          return h(FormFieldFileInput, {
            props: {
              label: isLabelHidden ? null : field.config.label,
              name: field.config.name,
              value: field.value,
            },
            attrs: {
              fileType: "image",
              multiple: true,
              scenario: field.config.meta.scenario,
              withCaptions: field.config.meta.withCaptions,
            },
            on: {
              ...context.listeners,
              change: handleChange,
            },
          });
        case "FILE":
          return h(FormFieldFileInput, {
            props: {
              ...commonProps,
            },
            attrs: {
              fileType: "file",
              scenario: field.config.meta.scenario,
            },
            on: {
              ...context.listeners,
              change: handleChange,
            },
          });
        case "REPEATER":
          return h(RepeatedItemTree, {
            props: {
              field,
              nameSuffix: context.props.nameSuffix,
              defaultIsOpen: field.config.meta.defaultIsOpen,
              maxItemsCount: field.config.meta.maximumItemsCount,
            },
          });
        case "GROUP":
          return h(FieldGroup, {
            props: { field, defaultIsOpen: field.config.meta.defaultIsOpen },
          });

        default: {
          const unknownFieldType = field.config.type;
          console.warn("Cannot render Component for field", field.config);
          return h("div", `Unknown field with type: ${unknownFieldType}`);
        }
      }
    }

    return renderField(context.props.field);
  },
});
</script>

<style scoped></style>
