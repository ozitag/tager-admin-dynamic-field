<script lang="ts">
import Vue from 'vue';
import kebabCase from 'lodash.kebabcase';
import { ScopedSlot } from 'vue/types/vnode';

import {
  BaseButton,
  ColumnDefinition,
  SvgIcon,
  BaseTable,
} from '@tager/admin-ui';

import { FieldUnion, RepeaterField } from '../../../typings/model';
import DynamicField from '../DynamicField.vue';

import { moveItem, removeItem } from './RepeatedItem';

type Props = Readonly<{
  field: RepeaterField;
}>;

export default Vue.extend<Props>({
  name: 'RepeatedItemTable',
  functional: true,
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
  render(h, context) {
    const repeaterField = context.props.field;

    type RowData = Record<string, FieldUnion>;

    const columnDefs: Array<ColumnDefinition<
      RowData
    >> = repeaterField.config.fields.map((fieldConfig, index) => ({
      id: index + 1,
      name: fieldConfig.label,
      field: fieldConfig.name,
      useCustomDataCell: true,
    }));

    columnDefs.push({
      id: columnDefs.length + 1,
      name: 'Actions',
      field: 'actions',
      useCustomDataCell: true,
    });

    const rowData: Array<RowData> = repeaterField.value.map((entity) =>
      entity.value.reduce(
        (row, field) => ({ ...row, [field.config.name]: field }),
        {}
      )
    );

    const columnWidth = `calc(100% / ${repeaterField.config.fields.length})`;

    const scopedSlots: Record<
      string,
      ScopedSlot
    > = repeaterField.config.fields.reduce((scopedSlots, fieldConfig) => {
      const slotName = `cell(${kebabCase(fieldConfig.name)})`;

      return {
        ...scopedSlots,
        [slotName]: (props: {
          row: RowData;
          column: ColumnDefinition<RowData>;
        }) =>
          h('td', { style: { width: columnWidth } }, [
            h(DynamicField, {
              props: {
                field: props.row[fieldConfig.name],
                isLabelHidden: true,
              },
            }),
          ]),
      };
    }, {});

    function handleItemRemove(index: number) {
      removeItem(context.props.field, index);
    }

    function handleItemMove(index: number, direction: 'up' | 'down') {
      moveItem(context.props.field, index, direction);
    }

    return h(BaseTable, {
      props: { columnDefs, enumerable: true, rowData: rowData },
      class: 'repeated-field-table',
      scopedSlots: {
        ...scopedSlots,
        'cell(actions)': ({ rowIndex }) =>
          h('td', { style: { width: '140px', whiteSpace: 'nowrap' } }, [
            h(
              BaseButton,
              {
                props: { variant: 'icon', disabled: rowIndex === 0 },
                on: { click: () => handleItemMove(rowIndex, 'up') },
              },
              [h(SvgIcon, { props: { name: 'north' } })]
            ),
            h(
              BaseButton,
              {
                props: {
                  variant: 'icon',
                  disabled: rowIndex === repeaterField.value.length - 1,
                },
                on: { click: () => handleItemMove(rowIndex, 'down') },
              },
              [h(SvgIcon, { props: { name: 'south' } })]
            ),
            h(
              BaseButton,
              {
                props: { variant: 'icon' },
                on: { click: () => handleItemRemove(rowIndex) },
              },
              [h(SvgIcon, { props: { name: 'delete' } })]
            ),
          ]),
      },
    });
  },
});
</script>
