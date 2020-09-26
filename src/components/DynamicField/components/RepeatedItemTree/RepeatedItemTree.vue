<template>
  <div class="repeated-field">
    <div class="title-row" @click="toggleChildren">
      <span class="title">
        {{ field.config.label }} ({{ field.value.length }})
      </span>
      <base-button variant="icon" :title="isOpen ? 'Collapse' : 'Expand'">
        <svg-icon :name="isOpen ? 'expandLess' : 'expandMore'" />
      </base-button>
    </div>

    <div v-show="isOpen" class="content">
      <RepeatedItemTable v-if="isTable" :field="field" />
      <ul v-else class="nested-element-list">
        <li
          v-for="(nestedElement, index) of field.value"
          :key="nestedElement.id"
          class="nested-element-container"
        >
          <RepeatedItem
            :item="nestedElement"
            :index="index"
            :parent-field="field"
            v-on="$listeners"
          />
        </li>
      </ul>
      <base-button
        variant="outline-primary"
        title="Add item"
        @click="addElement"
      >
        Add item
      </base-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

import { createId } from '@tager/admin-services';

import { RepeaterField } from '../../../../typings/model';
import { universalFieldUtils } from '../../../../services/fields';
import RepeatedItem from '../RepeatedItem/RepeatedItem.vue';
import RepeatedItemTable from '../RepeatedItemTable.vue';

type Props = Readonly<{
  field: RepeaterField;
}>;

export default defineComponent<Props>({
  name: 'RepeatedItemTree',
  components: { RepeatedItem, RepeatedItemTable },
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const isOpen = ref<boolean>(false);

    function toggleChildren() {
      isOpen.value = !isOpen.value;
    }

    function addElement() {
      const newNestedField = {
        id: createId(),
        value: props.field.config.fields.map((nestedFieldConfig) =>
          universalFieldUtils.createFormField(nestedFieldConfig, null)
        ),
      };

      props.field.value.push(newNestedField);
    }

    return {
      addElement,
      toggleChildren,
      isOpen,
      isTable: props.field.config.meta.view === 'TABLE',
    };
  },
});
</script>

<style scoped lang="scss">
.repeated-field-table {
  ::v-deep .form-group {
    margin-bottom: 0;
  }
}

.repeated-field {
  .title-row {
    display: inline-flex;
    align-items: center;

    &:hover {
      cursor: pointer;
    }
  }

  .title {
    font-size: 1.2rem;

    &:hover {
      color: #888;
    }
  }

  .content {
    margin-top: 0.2rem;
    margin-bottom: 1rem;
  }
}

.nested-element-list {
  padding-left: 2rem;
}

.nested-element-container {
  margin-bottom: 0.7rem;
}
</style>
