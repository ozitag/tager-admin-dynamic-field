<template>
  <div class="menu-item">
    <div class="top">
      <button class="title-button" @click="toggleItem">
        <h4>{{ parentField.config.label }} - #{{ index + 1 }}</h4>
      </button>

      <div>
        <BaseButton variant="icon" title="Move up" @click="toggleItem">
          <ExpandLessIcon v-if="isOpen" />
          <ExpandMoreIcon v-else />
        </BaseButton>

        <BaseButton
          variant="icon"
          title="Move up"
          :disabled="index === 0"
          @click="handleItemMove('up')"
        >
          <NorthIcon />
        </BaseButton>

        <BaseButton
          variant="icon"
          title="Move down"
          :disabled="index === parentField.value.length - 1"
          @click="handleItemMove('down')"
        >
          <SouthIcon />
        </BaseButton>

        <BaseButton variant="icon" title="Delete" @click="handleItemRemove">
          <DeleteIcon />
        </BaseButton>
      </div>
    </div>
    <div v-show="isOpen" class="item-form">
      <fieldset>
        <DynamicField
          v-for="field of item.value"
          :key="field.id"
          :field="field"
          :name-suffix="nameSuffix + '__' + index"
        />
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts">
import {
  type Component,
  defineAsyncComponent,
  defineComponent,
  type PropType,
  ref,
} from "vue";

import {
  ExpandMoreIcon,
  ExpandLessIcon,
  BaseButton,
  NorthIcon,
  SouthIcon,
  DeleteIcon,
} from "@tager/admin-ui";

import type { RepeaterField } from "../../../../typings/model";

import { moveItem, removeItem } from "./RepeatedItem.helpers";

interface Props {
  item: RepeaterField["value"][number];
  parentField: RepeaterField;
  index: number;
  nameSuffix: string;
}

export default defineComponent({
  name: "RepeatedItem",
  components: {
    ExpandMoreIcon,
    ExpandLessIcon,
    BaseButton,
    NorthIcon,
    SouthIcon,
    DeleteIcon,
    DynamicField: defineAsyncComponent<Component>(
      () => import("../../DynamicField.vue")
    ),
  },
  props: {
    item: {
      type: Object as PropType<Props["item"]>,
      required: true,
    },
    parentField: {
      type: Object as PropType<Props["parentField"]>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    nameSuffix: {
      type: String,
      default: "",
    },
  },
  setup(props: Props) {
    const isOpen = ref<boolean>(false);

    function toggleItem() {
      isOpen.value = !isOpen.value;
    }

    function handleItemRemove() {
      removeItem(props.parentField, props.index);
    }

    function handleItemMove(direction: "up" | "down") {
      moveItem(props.parentField, props.index, direction);
    }

    return {
      handleItemRemove,
      handleItemMove,
      isOpen,
      toggleItem,
    };
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
