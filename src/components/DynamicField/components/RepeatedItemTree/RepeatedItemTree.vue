<template>
  <div class='repeated-field'>
    <button
      type='button'
      :class="['title-button', isOpen ? 'collapse' : 'expand']"
      :title="isOpen ? 'Collapse' : 'Expand'"
      @click='toggleChildren'
    >
      <span
        role='img'
        :class="['icon-chevron-right', { 'icon-expand-more': isOpen }]"
      >
        <svg-icon name='chevronRight' />
      </span>

      <span class='title'>
        {{ field.config.label }} ({{ field.value.length }})
      </span>
    </button>

    <div v-show='isOpen' class='content'>
      <RepeatedItemTable v-if='isTable' :field='field' />
      <ul v-else class='nested-element-list'>
        <li
          v-for='(nestedElement, index) of field.value'
          :key='nestedElement.id'
          class='nested-element-container'
        >
          <RepeatedItem
            :item='nestedElement'
            :index='index'
            :parent-field='field'
            v-on='$listeners'
          />
        </li>
      </ul>
      <div class='button-row'>
        <base-button
          variant='outline-primary'
          title='Add item'
          :disabled='maxItemsCount && field.value.length >= maxItemsCount'
          @click='addElement'
        >
          Add item
        </base-button>
        <span v-if='maxItemsCount && field.value.length >= maxItemsCount'>
          Maximum items count: <b>{{ maxItemsCount }}</b>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@vue/composition-api';

import { createId } from '@tager/admin-services';
import { useLocalStorage } from '@tager/admin-ui';

import { RepeaterField } from '../../../../typings/model';
import { universalFieldUtils } from '../../../../services/fields';
import RepeatedItem from '../RepeatedItem/RepeatedItem.vue';
import RepeatedItemTable from '../RepeatedItemTable.vue';

type Props = Readonly<{
  field: RepeaterField;
  defaultIsOpen: boolean;
  maxItemsCount?: number;
}>;

export default defineComponent<Props>({
  name: 'RepeatedItemTree',
  components: { RepeatedItem, RepeatedItemTable },
  props: {
    field: {
      type: Object,
      required: true
    },
    defaultIsOpen: {
      type: Boolean,
      default: false
    },
    maxItemsCount: {
      type: Number,
      required: false
    }
  },
  setup(props) {
    const pseudoUniqueKey = props.field.config.fields
      .map((field) => field.name)
      .join('').length;

    const [isOpen, setIsOpen] = useLocalStorage<boolean>(
      `is_${props.field.config.name}_${pseudoUniqueKey}_open`,
      props.defaultIsOpen
    );

    function toggleChildren() {
      setIsOpen(!isOpen.value);
    }

    function addElement() {
      const newNestedField = {
        id: createId(),
        value: props.field.config.fields.map((nestedFieldConfig) =>
          universalFieldUtils.createFormField(nestedFieldConfig, null)
        )
      };

      props.field.value.push(newNestedField);
    }

    return {
      addElement,
      toggleChildren,
      isOpen,
      isTable: props.field.config.meta.view === 'TABLE'
    };
  }
});
</script>

<style scoped lang='scss'>
.repeated-field-table {
  ::v-deep .form-group {
    margin-bottom: 0;
  }
}

.repeated-field {
  margin-bottom: 1rem;

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
}

.nested-element-container {
  margin-bottom: 0.7rem;
}

.button-row {
  display: flex;
  align-items: center;

  span {
    display: inline-block;
    margin-left: 10px;
  }
}

</style>
