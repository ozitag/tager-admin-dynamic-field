<script lang="ts">
import Vue, { VNode } from 'vue';

import {
  FormField,
  FormFieldFileInput,
  FormFieldRichTextInput,
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
        case 'IMAGE':
          return h(FormFieldFileInput, {
            props: {
              ...commonProps,
            },
            attrs: {
              fileType: 'image',
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

        default:
          return h('div', `Unknown field with type: ${field.config.type}`);
      }
    }

    return renderField(context.props.field);
  },
});
</script>

<style scoped></style>
