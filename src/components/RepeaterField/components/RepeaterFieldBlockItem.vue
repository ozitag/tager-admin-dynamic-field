<template>
  <div class="menu-item">
    <div class="top">
      <button class="title-button" @click="toggleItem">
        <span class="title-button__index">
          {{ index + 1 }}
        </span>
        <span class="title-button__title">
          {{ title }}
        </span>
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
          @change="onChange"
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
  onMounted,
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

import type { RepeaterField } from "../../../typings/model";
import { moveItem, removeItem } from "../RepeaterField.helpers";

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
      () => import("../../DynamicField/DynamicField.vue")
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
    const title = ref<string>(props.parentField.config.label);

    function toggleItem() {
      isOpen.value = !isOpen.value;
    }

    function handleItemRemove() {
      removeItem(props.parentField, props.index);
    }

    function handleItemMove(direction: "up" | "down") {
      moveItem(props.parentField, props.index, direction);
    }

    const updateValue = () => {
      if (props.parentField.config.meta?.titleFormatter) {
        const newValue = props.parentField.config.meta.titleFormatter(
          props.item.value
        );

        title.value =
          newValue === null ? props.parentField.config.label : newValue;
      } else {
        title.value = props.parentField.config.label;
      }
    };

    onMounted(() => {
      updateValue();
    });

    const onChange = () => {
      updateValue();
    };

    return {
      handleItemRemove,
      handleItemMove,
      isOpen,
      toggleItem,
      title,
      onChange,
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
      justify-content: center;
      align-items: center;

      &__title {
        display: block;
        font-weight: bold;
        transition: 0.3s all ease;
      }

      &__index {
        border: 1px solid #aaa;
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;
      }

      &:hover {
        .title-button__title {
          color: #777;
        }
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
