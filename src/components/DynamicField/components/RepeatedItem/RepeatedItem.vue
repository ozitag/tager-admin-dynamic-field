<template>
  <div class="menu-item">
    <div class="top">
      <button class="title-button" @click="toggleItem">
        <h4>{{ parentField.config.label }} - #{{ index + 1 }}</h4>
      </button>

      <div>
        <base-button variant="icon" title="Move up" @click="toggleItem">
          <svg-icon :name="isOpen ? 'expandLess' : 'expandMore'"/>
        </base-button>

        <base-button
            variant="icon"
            title="Move up"
            :disabled="index === 0"
            @click="handleItemMove('up')"
        >
          <svg-icon name="north"/>
        </base-button>

        <base-button
            variant="icon"
            title="Move down"
            :disabled="index === parentField.value.length - 1"
            @click="handleItemMove('down')"
        >
          <svg-icon name="south"/>
        </base-button>

        <base-button variant="icon" title="Delete" @click="handleItemRemove">
          <svg-icon name="delete"/>
        </base-button>
      </div>
    </div>
    <div v-show="isOpen" class="item-form">
      <fieldset>
        <component
            :is="components.DynamicField"
            v-for="field of item.value"
            :key="field.id"
            :field="field"
            :name-suffix='nameSuffix + "__" + index'
        />
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from '@vue/composition-api';

import {RepeaterField} from '../../../../typings/model';
import DynamicField from '../../DynamicField.vue';

import {moveItem, removeItem} from './RepeatedItem.helpers';

type Props = Readonly<{
  item: RepeaterField['value'][number];
  parentField: RepeaterField;
  index: number;
  nameSuffix: number;
  components: { DynamicField: typeof DynamicField };
}>;

export default defineComponent<Props>({
  name: 'RepeatedItem',
  props: {
    /**
     * Here we use hack: (https://github.com/vuejs/vue/issues/7492#issuecomment-369507267)
     * because vue don't understand functional component in "components" option
     */
    components: {
      type: Object,
      default() {
        return {
          DynamicField,
        };
      },
    },
    item: {
      type: Object,
      required: true,
    },
    parentField: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    nameSuffix: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const isOpen = ref<boolean>(false);

    function toggleItem() {
      isOpen.value = !isOpen.value;
    }

    function handleItemRemove() {
      removeItem(props.parentField, props.index);
    }

    function handleItemMove(direction: 'up' | 'down') {
      moveItem(props.parentField, props.index, direction);
    }

    return {handleItemRemove, handleItemMove, isOpen, toggleItem, nameSuffix: props.nameSuffix};
  },
});
</script>

<style scoped lang="scss">
.menu-item {
  border: 1px solid #ccc;
  border-radius: 3px;

  &:not(:last-child) {
    margin-bottom: 0.7rem;
  }

  .top {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background-color: #eee;

    .title-button {
      display: flex;
      flex-direction: column;
      justify-content: center;

      &:hover {
        color: #777;
      }
    }
  }

  .item-form {
    border-top: 1px solid #ccc;

    fieldset {
      padding: 1rem 1rem 0 1rem;
      border: 0;
    }

    .form-bottom {
      padding: 1rem;

      border-top: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
