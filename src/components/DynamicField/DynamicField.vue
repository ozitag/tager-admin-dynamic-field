<script lang="ts">
import Vue, { VNode } from 'vue';

import {
  FormField,
  FormFieldFileInput,
  FormFieldRichTextInput,
  FormFieldNumberInput,
  FormFieldCheckbox,
  FormFieldSelect,
  FormFieldColorInput,
} from '@tager/admin-ui';

import { FieldUnion } from '../../typings/model';

import RepeatedItemTree from './components/RepeatedItemTree';

type Props = Readonly<{
  field: FieldUnion;
  isLabelHidden?: boolean;
}>;

export default Vue.extend<Props>({
  name: 'DynamicField',
  functional: true,
  props: {
    field: {
      type: Object,
      required: true,
    },
    isLabelHidden: {
      type: Boolean,
      default: false,
    },
  },
  render(h, context) {
    const isLabelHidden = context.props.isLabelHidden;

    function renderField(field: FieldUnion): VNode {
      const commonProps = {
        label: isLabelHidden ? null : field.config.label,
        name: field.config.name,
        value: field.value,
      };

      function handleChange(event: FieldUnion['value']) {
        field.value = event;
      }

      switch (field.config.type) {
        case 'URL':
        case 'STRING':
          return h(FormField, {
            props: {
              ...commonProps,
            },
            on: {
              ...context.listeners,
              input: handleChange,
            },
          });
        case 'DATE':
        case 'DATETIME':
          return h(FormField, {
            props: {
              ...commonProps,
              type: 'date',
            },
            on: {
              ...context.listeners,
              input: handleChange,
            },
          });
        case 'NUMBER':
          return h(FormFieldNumberInput, {
            props: {
              ...commonProps,
            },
            on: {
              ...context.listeners,
              input: handleChange,
            },
          });
        case 'TEXT':
          return h(FormField, {
            props: {
              ...commonProps,
              type: 'textarea',
              rows: 4,
            },
            on: {
              ...context.listeners,
              input: handleChange,
            },
          });
        case 'HTML':
          return h(FormFieldRichTextInput, {
            props: {
              ...commonProps,
            },
            on: {
              ...context.listeners,
              input: handleChange,
            },
          });
        case 'TRUE_FALSE':
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
        case 'SELECT':
          return h(FormFieldSelect, {
            props: {
              label: commonProps.label,
              name: commonProps.name,
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
        case 'COLOR':
          return h(FormFieldColorInput, {
            props: {
              ...commonProps,
            },
            on: {
              ...context.listeners,
              change: handleChange,
            },
          });
        case 'IMAGE':
          return h(FormFieldFileInput, {
            props: {
              ...commonProps,
            },
            attrs: {
              fileType: 'image',
              scenario: field.config.meta.scenario,
            },
            on: {
              ...context.listeners,
              change: handleChange,
            },
          });
        case 'GALLERY':
          return h(FormFieldFileInput, {
            props: {
              label: isLabelHidden ? null : field.config.label,
              name: field.config.name,
              value: field.value,
            },
            attrs: {
              fileType: 'image',
              multiple: true,
              scenario: field.config.meta.scenario,
              withCaptions: field.config.meta.withCaptions,
            },
            on: {
              ...context.listeners,
              change: handleChange,
            },
          });
        case 'FILE':
          return h(FormFieldFileInput, {
            props: {
              ...commonProps,
            },
            on: {
              ...context.listeners,
              change: handleChange,
            },
          });
        case 'REPEATER':
          return h(RepeatedItemTree, { props: { field } });

        default: {
          const unknownFieldType = field.config.type;
          console.warn('Cannot render Component for field', field.config);
          return h('div', `Unknown field with type: ${unknownFieldType}`);
        }
      }
    }

    return renderField(context.props.field);
  },
});
</script>

<style scoped></style>
