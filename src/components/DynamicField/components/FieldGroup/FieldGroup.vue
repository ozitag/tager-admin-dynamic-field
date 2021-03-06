<template>
  <div class="group-field">
    <button
      type="button"
      :class="['title-button', isOpen ? 'collapse' : 'expand']"
      :title="isOpen ? 'Collapse' : 'Expand'"
      @click="handleToggleClick"
    >
      <span
        role="img"
        :class="['icon-chevron-right', { 'icon-expand-more': isOpen }]"
      >
        <svg-icon name="chevronRight" />
      </span>

      <span class="title">
        {{ field.config.label }}
      </span>
    </button>

    <div v-show="isOpen" class="content">
      <DynamicField
        v-for="field in field.value"
        :key="field.config.name"
        :field="field"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { useLocalStorage } from '@tager/admin-ui';

import { GroupField } from '../../../../typings/model';

interface Props {
  field: GroupField;
  defaultIsOpen: boolean;
}

export default defineComponent<Props>({
  name: 'FieldGroup',
  components: {
    DynamicField: async () => (await import('../../DynamicField.vue')).default,
  },
  props: {
    field: {
      type: Object,
      required: true,
    },
    defaultIsOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: Props) {
    const pseudoUniqueKey = props.field.config.fields
      .map((field) => field.name)
      .join('').length;

    const [isOpen, setIsOpen] = useLocalStorage<boolean>(
      `is_${props.field.config.name}_${pseudoUniqueKey}_open`,
      props.defaultIsOpen
    );

    function handleToggleClick() {
      setIsOpen(!isOpen.value);
    }

    return {
      isOpen,
      handleToggleClick,
    };
  },
});
</script>

<style scoped lang="scss">
.group-field {
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
</style>
