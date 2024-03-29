import { defineComponent, ref } from "vue";
import type { Story } from "@storybook/vue3";

import { createId } from "@tager/admin-services";
import { BaseCheckbox } from "@tager/admin-ui";

import type {
  AjaxSelectField,
  BooleanField,
  ButtonField,
  ColorField,
  DateField,
  DateTimeField,
  FileField,
  GalleryField,
  GroupField,
  HtmlField,
  ImageField,
  MapField,
  MinMaxField,
  MultiSelectField,
  NumberField,
  RepeaterField,
  SelectField,
  StringField,
  TextField,
  UrlField,
} from "../../typings/model";
import {brandOptions, selectedBrandOptions} from "../../msw/fixtures/brand-options";

import DynamicField from "./DynamicField.vue";

export default { title: "DynamicField" };

const stringField: StringField = {
  id: createId(),
  config: {
    name: "user-name",
    label: "User name",
    type: "STRING",
    meta: {},
  },
  value: "Ivan",
};

export const STRING: Story = () =>
  defineComponent({
    components: { DynamicField },
    setup() {
      const field = ref<StringField>(stringField);
      return { field };
    },
    template: `
          <DynamicField :field="field"/>`,
  });

const urlField: UrlField = {
  id: createId(),
  config: {
    name: "site-url",
    label: "Website url",
    type: "URL",
    meta: {},
  },
  value: "http://google.com",
};

export const URL: Story = () =>
  defineComponent({
    components: { DynamicField },
    setup() {
      const field = ref<UrlField>(urlField);
      return { field };
    },
    template: `
          <DynamicField :field="field"/>`,
  });

const dateField: DateField = {
  id: createId(),
  config: {
    name: "creation-date",
    label: "Creation date",
    type: "DATE",
    meta: {},
  },
  value: "2022-12-07",
};

export const DATE: Story = () =>
  defineComponent({
    components: { DynamicField },
    setup() {
      const field = ref<DateField>(dateField);
      return { field };
    },
    template: `
          <DynamicField :field="field"/>`,
  });

const dateTimeField: DateTimeField = {
  id: createId(),
  config: {
    name: "creation-date",
    label: "Creation date",
    type: "DATETIME",
    meta: {},
  },
  value: "2022-07-25T19:33",
};

export const DATETIME: Story = () =>
  defineComponent({
    components: { DynamicField },
    setup() {
      const field = ref<DateTimeField>(dateTimeField);
      return { field };
    },
    template: `
          <DynamicField :field="field"/>`,
  });

const numberField: NumberField = {
  id: createId(),
  config: {
    name: "age",
    label: "Age",
    type: "NUMBER",
    meta: {},
  },
  value: "18",
};

export const NUMBER: Story = () =>
  defineComponent({
    components: { DynamicField },
    setup() {
      const field = ref<NumberField>(numberField);
      return { field };
    },
    template: `
          <DynamicField :field="field"/>`,
  });

const textField: TextField = {
  id: createId(),
  config: {
    name: "description",
    label: "Description",
    type: "TEXT",
    meta: {},
    checkVisible: (values): boolean => {
      return values["user-name"] !== "hide";
    },
  },
  value:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
};

export const TEXT: Story = () =>
  defineComponent({
    components: { DynamicField },
    setup() {
      const field = ref<TextField>(textField);
      return { field };
    },
    template: `
          <DynamicField :field="field"/>`,
  });

const htmlField: HtmlField = {
  id: createId(),
  config: {
    name: "content",
    label: "Content",
    type: "HTML",
    meta: {},
  },
  value:
    "<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>",
};

export const HTML: Story = () =>
  defineComponent({
    components: { DynamicField },
    setup() {
      const field = ref<HtmlField>(htmlField);
      return { field };
    },
    template: `
          <DynamicField :field="field"/>`,
  });

const booleanField: BooleanField = {
  id: createId(),
  config: {
    name: "enabled",
    label: "Is enabled?",
    type: "TRUE_FALSE",
    meta: {},
  },
  value: true,
};

export const TRUE_FALSE: Story = () =>
  defineComponent({
    components: { DynamicField },
    setup() {
      const field = ref<BooleanField>(booleanField);
      return { field };
    },
    template: `
          <DynamicField :field="field"/>`,
  });

const minMaxField: MinMaxField = {
  id: createId(),
  config: {
    name: "min_max",
    label: "Car Price",
    type: "MIN_MAX",
    meta: {},
  },
  value: { min: 0, max: 1000 },
};

export const MIN_MAX: Story = () =>
  defineComponent({
    components: { DynamicField },
    setup() {
      const field = ref<MinMaxField>(minMaxField);
      return { field };
    },
    template: `
          <DynamicField :field="field"/>`,
  });

const selectField: SelectField = {
  id: createId(),
  config: {
    name: "brand",
    label: "Brand",
    type: "SELECT",
    meta: { searchable: true, options: brandOptions },
  },
  value: brandOptions[1],
};

export const SELECT: Story = () =>
  defineComponent({
    components: { DynamicField },
    setup() {
      const field = ref<SelectField>(selectField);
      return { field };
    },
    template: `
          <DynamicField :field="field"/>`,
  });

const ajaxSelectField: AjaxSelectField = {
  id: createId(),
  config: {
    name: "brand",
    label: "Brand",
    type: "AJAX_SELECT",
    meta: { requestUrl: "http://localhost:7001/api/games/ajax-search", valueField: "value", labelField: "label" },
  },
  value: {
      "value": "1",
      "label": "Hello"
  },
};

export const AJAX_SELECT: Story = () =>
  defineComponent({
    components: { DynamicField },
    setup() {
      const field = ref<AjaxSelectField>(ajaxSelectField);
      return { field };
    },
    template: `
          <DynamicField :field="field"/>`,
  });

const multiSelectField: MultiSelectField = {
  id: createId(),
  config: {
    name: "brands",
    label: "Brands",
    type: "MULTI_SELECT",
    meta: { maximumItemsCount: 5, options: brandOptions },
  },
  value: selectedBrandOptions,
};

export const MULTI_SELECT: Story = () =>
  defineComponent({
    components: { DynamicField },
    setup() {
      const field = ref<MultiSelectField>(multiSelectField);
      return { field };
    },
    template: `
          <DynamicField :field="field"/>`,
  });

const colorField: ColorField = {
  id: createId(),
  config: {
    name: "color",
    label: "Color",
    type: "COLOR",
    meta: {},
  },
  value: "#000000",
};

export const COLOR: Story = () =>
  defineComponent({
    components: { DynamicField },
    setup() {
      const field = ref<ColorField>(colorField);
      return { field };
    },
    template: `
          <DynamicField :field="field"/>`,
  });

const buttonField: ButtonField = {
  id: createId(),
  config: {
    name: "cta-button",
    label: "CTA button",
    type: "BUTTON",
    meta: {},
  },
  value: null,
};

export const BUTTON: Story = () =>
  defineComponent({
    components: { DynamicField },
    setup() {
      const field = ref<ButtonField>(buttonField);
      return { field };
    },
    template: `
          <DynamicField :field="field"/>`,
  });

const mapField: MapField = {
  id: createId(),
  config: {
    name: "location",
    label: "Our location",
    type: "MAP",
    meta: {},
  },
  value: null,
};

export const MAP: Story = () =>
  defineComponent({
    components: { DynamicField },
    setup() {
      const field = ref<MapField>(mapField);
      return { field };
    },
    template: `
          <DynamicField :field="field"/>`,
  });

const imageField: ImageField = {
  id: createId(),
  config: {
    name: "avatar",
    label: "Avatar",
    type: "IMAGE",
    meta: { scenario: null },
  },
  value: null,
};

export const IMAGE: Story = () =>
  defineComponent({
    components: { DynamicField },
    setup() {
      const field = ref<ImageField>(imageField);
      return { field };
    },
    template: `
          <DynamicField :field="field"/>`,
  });

const galleryField: GalleryField = {
  id: createId(),
  config: {
    name: "images",
    label: "Gallery",
    type: "GALLERY",
    meta: { scenario: null, withCaptions: true },
  },
  value: [],
};

export const GALLERY: Story = () =>
  defineComponent({
    components: { DynamicField },
    setup() {
      const field = ref<GalleryField>(galleryField);
      return { field };
    },
    template: `
          <DynamicField :field="field"/>`,
  });

const fileField: FileField = {
  id: createId(),
  config: {
    name: "archive",
    label: "Archive",
    type: "FILE",
    meta: { scenario: null },
  },
  value: null,
};

export const FILE: Story = () =>
  defineComponent({
    components: { DynamicField },
    setup() {
      const field = ref<FileField>(fileField);
      return { field };
    },
    template: `
          <DynamicField :field="field"/>`,
  });

const repeaterField: RepeaterField = {
  id: createId(),
  config: {
    name: "users",
    label: "Users",
    type: "REPEATER",
    fields: [stringField.config, textField.config],
    meta: {
      defaultIsOpen: true,
      maximumItemsCount: 5,
      addLabel: "New Element",
      isEmptyHidden: true,
    },
  },
  value: [],
};

export const REPEATER_AS_BLOCK: Story = (args) =>
  defineComponent({
    components: { DynamicField, BaseCheckbox },
    setup() {
      const disabled = ref<boolean>(false);

      const field = ref<RepeaterField>({
        ...repeaterField,
        config: {
          ...repeaterField.config,
          meta: {
            ...repeaterField.config.meta,
            view: args.isTable ? "TABLE" : "BLOCK",
            titleFormatter: (values) => {
              if (!values[0].value) return null;
              return `${values[0].value} - ${values[1].value}`;
            },
          },
        },
      });

      return { field, disabled };
    },
    template: `
          <div>
          <DynamicField :field="field" :disabled="disabled"/>
          <div>
            Disabled:&nbsp;&nbsp;<BaseCheckbox v-model:checked="disabled"/>
          </div>
          </div>`,
  });

const repeaterAsTableField: RepeaterField = {
  id: createId(),
  config: {
    name: "users",
    label: "Users",
    type: "REPEATER",
    fields: [
      {
        name: "type",
        type: "SELECT",
        label: "Type",
        meta: {
          options: [
            { label: "Skip", value: "skip" },
            { label: "Ok", value: "ok" },
          ],
        },
        width: "200px",
      },
      {
        name: "event",
        type: "STRING",
        label: "Event Name",
        width: "250px",
      },
      {
        name: "params",
        type: "REPEATER",
        label: "Params",
        meta: {
          view: "TABLE",
          noToggle: true,
          noMoveActions: true,
        },
        fields: [
          {
            name: "param",
            type: "STRING",
            label: "Param",
          },
          {
            name: "value",
            type: "STRING",
            label: "Value",
          },
        ],
      },
    ],
    meta: {
      defaultIsOpen: false,
      noMoveActions: true,
      maximumItemsCount: 5,
      view: "TABLE",
      hideCount: true,
      noToggle: false,
      isEmptyHidden: true,
    },
  },
  value: [],
};

export const REPEATER_AS_TABLE: Story = () =>
  defineComponent({
    components: { DynamicField, BaseCheckbox },
    setup() {
      const disabled = ref<boolean>(false);

      const field = ref<RepeaterField>(repeaterAsTableField);

      return { field, disabled };
    },
    template: `
          <div>
          <DynamicField :field="field" :disabled="disabled"/>
          <div>
            Disabled:&nbsp;&nbsp;<BaseCheckbox v-model:checked="disabled"/>
          </div>
          </div>`,
  });

const groupField: GroupField = {
  id: createId(),
  config: {
    name: "user",
    label: "User",
    type: "GROUP",
    fields: [stringField.config, textField.config],
    meta: { defaultIsOpen: false },
  },
  value: [stringField, textField],
};

export const GROUP: Story = () =>
  defineComponent({
    components: { DynamicField },
    setup() {
      const field = ref<GroupField>(groupField);
      return { field };
    },
    template: `
          <DynamicField :field="field"/>`,
  });
