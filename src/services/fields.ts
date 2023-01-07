import { createId, isNotNullish, type Nullish } from "@tager/admin-services";

import type {
  DateField,
  DateFieldConfig,
  DateIncomingValue,
  DateOutgoingValue,
  DateTimeField,
  DateTimeFieldConfig,
  DateTimeIncomingValue,
  DateTimeOutgoingValue,
  UnknownField,
  UnknownFieldConfig,
  UnknownIncomingValue,
  UnknownOutgoingValue,
  Field,
  FieldConfig,
  FieldConfigUnion,
  FieldUnion,
  FileField,
  FileFieldConfig,
  FileIncomingValue,
  FileOutgoingValue,
  GalleryField,
  GalleryFieldConfig,
  GalleryIncomingValue,
  GalleryOutgoingValue,
  HtmlField,
  HtmlFieldConfig,
  HtmlIncomingValue,
  HtmlOutgoingValue,
  ImageField,
  ImageFieldConfig,
  ImageIncomingValue,
  ImageOutgoingValue,
  IncomingValueUnion,
  OutgoingValueUnion,
  RepeaterField,
  RepeaterFieldConfig,
  RepeaterIncomingValue,
  RepeaterOutgoingValue,
  StringField,
  StringFieldConfig,
  StringIncomingValue,
  StringOutgoingValue,
  TextField,
  TextFieldConfig,
  TextIncomingValue,
  TextOutgoingValue,
  UrlField,
  UrlFieldConfig,
  UrlIncomingValue,
  UrlOutgoingValue,
  NumberIncomingValue,
  NumberFieldConfig,
  NumberField,
  NumberOutgoingValue,
  BooleanIncomingValue,
  BooleanFieldConfig,
  BooleanField,
  BooleanOutgoingValue,
  SelectIncomingValue,
  SelectFieldConfig,
  SelectField,
  MultiSelectField,
  SelectOutgoingValue,
  ColorIncomingValue,
  ColorFieldConfig,
  ColorField,
  ColorOutgoingValue,
  ButtonIncomingValue,
  ButtonFieldConfig,
  ButtonField,
  ButtonOutgoingValue,
  MapIncomingValue,
  MapFieldConfig,
  MapField,
  MapOutgoingValue,
  MultiSelectIncomingValue,
  MultiSelectFieldConfig,
  MultiSelectOutgoingValue,
  AjaxSelectIncomingValue,
  AjaxSelectFieldConfig,
  AjaxSelectOutgoingValue,
  AjaxSelectField,
  GroupIncomingValue,
  GroupFieldConfig,
  GroupField,
  GroupOutgoingValue,
  MinMaxIncomingValue,
  MinMaxFieldConfig,
  MinMaxField,
  MinMaxOutgoingValue,
} from "../typings/model";

interface FieldUtils<
  IncomingValue,
  Config extends FieldConfig,
  F extends Field<Config>,
  OutgoingValue
> {
  type: Config["type"];
  getDefaultFormFieldValue(config?: Config): F["value"];
  createFormField(fieldConfig: Config, incomingValueValue: IncomingValue): F;
  getOutgoingValue(field: F): OutgoingValue;
}

interface RepeaterFieldUtils<
  IncomingValue,
  Config extends FieldConfig,
  F extends Field<Config>,
  OutgoingValue
> {
  type: Config["type"];
  getDefaultFormFieldValue(config?: Config): F["value"];
  createFormField(fieldConfig: Config, incomingValueValue: IncomingValue): F;
  getOutgoingValue(field: F): OutgoingValue;
  getOutgoingValueAsSingleArray(field: F): any[];
}

/** STRING **/

type StringFieldUtilsType = FieldUtils<
  StringIncomingValue,
  StringFieldConfig,
  StringField,
  StringOutgoingValue
>;

const stringFieldUtils: StringFieldUtilsType = {
  type: "STRING",
  getDefaultFormFieldValue() {
    return "";
  },
  createFormField(fieldConfig, incomingValue) {
    return {
      id: createId(),
      config: fieldConfig,
      value: incomingValue ?? this.getDefaultFormFieldValue(),
    };
  },
  getOutgoingValue(field) {
    return field.value;
  },
};

/** URL **/

type UrlFieldUtilsType = FieldUtils<
  UrlIncomingValue,
  UrlFieldConfig,
  UrlField,
  UrlOutgoingValue
>;

const urlFieldUtils: UrlFieldUtilsType = {
  type: "URL",
  getDefaultFormFieldValue() {
    return "";
  },
  createFormField(fieldConfig, incomingValue) {
    return {
      id: createId(),
      config: fieldConfig,
      value: incomingValue ?? this.getDefaultFormFieldValue(),
    };
  },
  getOutgoingValue(field) {
    return field.value;
  },
};

/** DATE **/

type DateFieldUtilsType = FieldUtils<
  DateIncomingValue,
  DateFieldConfig,
  DateField,
  DateOutgoingValue
>;

const dateFieldUtils: DateFieldUtilsType = {
  type: "DATE",
  getDefaultFormFieldValue() {
    return "";
  },
  createFormField(fieldConfig, incomingValue) {
    return {
      id: createId(),
      config: fieldConfig,
      value: incomingValue ?? this.getDefaultFormFieldValue(),
    };
  },
  getOutgoingValue(field) {
    return field.value;
  },
};

/** DATETIME **/

type DateTimeFieldUtilsType = FieldUtils<
  DateTimeIncomingValue,
  DateTimeFieldConfig,
  DateTimeField,
  DateTimeOutgoingValue
>;

const dateTimeFieldUtils: DateTimeFieldUtilsType = {
  type: "DATETIME",
  getDefaultFormFieldValue() {
    return "";
  },
  createFormField(fieldConfig, incomingValue) {
    return {
      id: createId(),
      config: fieldConfig,
      value: incomingValue ?? this.getDefaultFormFieldValue(),
    };
  },
  getOutgoingValue(field) {
    return field.value;
  },
};

/** TEXT **/

type TextFieldUtilsType = FieldUtils<
  TextIncomingValue,
  TextFieldConfig,
  TextField,
  TextOutgoingValue
>;

const textFieldUtils: TextFieldUtilsType = {
  type: "TEXT",
  getDefaultFormFieldValue() {
    return "";
  },
  createFormField(fieldConfig, incomingValue) {
    return {
      id: createId(),
      config: fieldConfig,
      value: incomingValue ?? this.getDefaultFormFieldValue(),
    };
  },
  getOutgoingValue(field) {
    return field.value;
  },
};

/** NUMBER **/

type NumberFieldUtilsType = FieldUtils<
  NumberIncomingValue,
  NumberFieldConfig,
  NumberField,
  NumberOutgoingValue
>;

const numberFieldUtils: NumberFieldUtilsType = {
  type: "NUMBER",
  getDefaultFormFieldValue() {
    return "";
  },
  createFormField(fieldConfig, incomingValue) {
    return {
      id: createId(),
      config: fieldConfig,
      value: isNotNullish(incomingValue)
        ? String(incomingValue)
        : this.getDefaultFormFieldValue(),
    };
  },
  getOutgoingValue(field) {
    return field.value;
  },
};

/** MIN_MAX **/
type MinMaxFieldUtilsType = FieldUtils<
  MinMaxIncomingValue,
  MinMaxFieldConfig,
  MinMaxField,
  MinMaxOutgoingValue
>;

const minMaxFieldUtils: MinMaxFieldUtilsType = {
  type: "MIN_MAX",
  getDefaultFormFieldValue() {
    return null;
  },
  createFormField(fieldConfig, incomingValue) {
    return {
      id: createId(),
      config: fieldConfig,
      value: incomingValue ?? this.getDefaultFormFieldValue(fieldConfig),
    };
  },
  getOutgoingValue(field) {
    return field.value;
  },
};

/** TRUE_FALSE **/

type BooleanFieldUtilsType = FieldUtils<
  BooleanIncomingValue,
  BooleanFieldConfig,
  BooleanField,
  BooleanOutgoingValue
>;

const booleanFieldUtils: BooleanFieldUtilsType = {
  type: "TRUE_FALSE",
  getDefaultFormFieldValue(config) {
    return config?.meta.defaultValue ?? false;
  },
  createFormField(fieldConfig, incomingValue) {
    return {
      id: createId(),
      config: fieldConfig,
      value: incomingValue ?? this.getDefaultFormFieldValue(fieldConfig),
    };
  },
  getOutgoingValue(field) {
    return field.value;
  },
};

type SelectFieldUtilsType = FieldUtils<
  SelectIncomingValue,
  SelectFieldConfig,
  SelectField,
  SelectOutgoingValue
>;

/** SELECT **/

const selectFieldUtils: SelectFieldUtilsType = {
  type: "SELECT",
  getDefaultFormFieldValue() {
    return null;
  },
  createFormField(fieldConfig, incomingValue) {
    const options = fieldConfig.meta.options ?? [];

    const selectedOption = options.find(
      (option) => option.value === incomingValue
    );

    return {
      id: createId(),
      config: fieldConfig,
      value: selectedOption ?? null,
    };
  },
  getOutgoingValue(field) {
    return field.value?.value ?? null;
  },
};

/** AJAX_SELECT **/

type AjaxSelectFieldUtilsType = FieldUtils<
  AjaxSelectIncomingValue,
  AjaxSelectFieldConfig,
  AjaxSelectField,
  AjaxSelectOutgoingValue
>;

const ajaxSelectFieldUtils: AjaxSelectFieldUtilsType = {
  type: "AJAX_SELECT",
  getDefaultFormFieldValue() {
    return null;
  },
  createFormField(fieldConfig, incomingValue) {
    return {
      id: createId(),
      config: fieldConfig,
      value: incomingValue,
    };
  },
  getOutgoingValue(field) {
    return field.value?.value ?? null;
  },
};

/** MULTI_SELECT **/

type MultiSelectFieldUtilsType = FieldUtils<
  MultiSelectIncomingValue,
  MultiSelectFieldConfig,
  MultiSelectField,
  MultiSelectOutgoingValue
>;

const multiSelectFieldUtils: MultiSelectFieldUtilsType = {
  type: "MULTI_SELECT",
  getDefaultFormFieldValue() {
    return [];
  },
  createFormField(fieldConfig, incomingValue) {
    const options = fieldConfig.meta.options ?? [];
    const selectedValues = incomingValue ?? [];

    const selectedOptions = options.filter((option) =>
      selectedValues.includes(option.value)
    );

    return {
      id: createId(),
      config: fieldConfig,
      value: selectedOptions,
    };
  },
  getOutgoingValue(field) {
    return field.value.map((option) => option.value);
  },
};

/** COLOR **/

type ColorFieldUtilsType = FieldUtils<
  ColorIncomingValue,
  ColorFieldConfig,
  ColorField,
  ColorOutgoingValue
>;

const colorFieldUtils: ColorFieldUtilsType = {
  type: "COLOR",
  getDefaultFormFieldValue() {
    return "#000000";
  },
  createFormField(fieldConfig, incomingValue) {
    return {
      id: createId(),
      config: fieldConfig,
      value: incomingValue ?? this.getDefaultFormFieldValue(),
    };
  },
  getOutgoingValue(field) {
    return field.value;
  },
};

/** BUTTON **/

type ButtonFieldUtilsType = FieldUtils<
  ButtonIncomingValue,
  ButtonFieldConfig,
  ButtonField,
  ButtonOutgoingValue
>;

const buttonFieldUtils: ButtonFieldUtilsType = {
  type: "BUTTON",
  getDefaultFormFieldValue() {
    return null;
  },
  createFormField(fieldConfig, incomingValue) {
    return {
      id: createId(),
      config: fieldConfig,
      value: incomingValue,
    };
  },
  getOutgoingValue(field) {
    return field.value;
  },
};

/** MAP **/

type MapFieldUtilsType = FieldUtils<
  MapIncomingValue,
  MapFieldConfig,
  MapField,
  MapOutgoingValue
>;

const mapFieldUtils: MapFieldUtilsType = {
  type: "MAP",
  getDefaultFormFieldValue() {
    return null;
  },
  createFormField(fieldConfig, incomingValue) {
    return {
      id: createId(),
      config: fieldConfig,
      value: incomingValue,
    };
  },
  getOutgoingValue(field) {
    return field.value;
  },
};

/** HTML **/

type HtmlFieldUtilsType = FieldUtils<
  HtmlIncomingValue,
  HtmlFieldConfig,
  HtmlField,
  HtmlOutgoingValue
>;

const htmlFieldUtils: HtmlFieldUtilsType = {
  type: "HTML",
  getDefaultFormFieldValue() {
    return "";
  },
  createFormField(fieldConfig, incomingValue) {
    return {
      id: createId(),
      config: fieldConfig,
      value: incomingValue ?? this.getDefaultFormFieldValue(),
    };
  },
  getOutgoingValue(field) {
    return field.value;
  },
};

/** IMAGE **/

type ImageFieldUtilsType = FieldUtils<
  ImageIncomingValue,
  ImageFieldConfig,
  ImageField,
  ImageOutgoingValue
>;

const imageFieldUtils: ImageFieldUtilsType = {
  type: "IMAGE",
  getDefaultFormFieldValue() {
    return null;
  },
  createFormField(fieldConfig, incomingValue) {
    return {
      id: createId(),
      config: fieldConfig,
      value: incomingValue
        ? { id: createId(), file: incomingValue, caption: null }
        : this.getDefaultFormFieldValue(),
    };
  },
  getOutgoingValue(field) {
    return field.value ? field.value.file.id : null;
  },
};

/** FILE **/

type FileFieldUtilsType = FieldUtils<
  FileIncomingValue,
  FileFieldConfig,
  FileField,
  FileOutgoingValue
>;

const fileFieldUtils: FileFieldUtilsType = {
  type: "FILE",
  getDefaultFormFieldValue() {
    return null;
  },
  createFormField(fieldConfig, incomingValue) {
    return {
      id: createId(),
      config: fieldConfig,
      value: incomingValue
        ? { id: createId(), file: incomingValue, caption: null }
        : this.getDefaultFormFieldValue(),
    };
  },
  getOutgoingValue(field) {
    return field.value ? field.value.file.id : null;
  },
};

/** GALLERY **/

type GalleryFieldUtilsType = FieldUtils<
  GalleryIncomingValue,
  GalleryFieldConfig,
  GalleryField,
  GalleryOutgoingValue
>;

const galleryFieldUtils: GalleryFieldUtilsType = {
  type: "GALLERY",
  getDefaultFormFieldValue() {
    return [];
  },
  createFormField(fieldConfig, incomingValue) {
    return {
      id: createId(),
      config: fieldConfig,
      value: incomingValue
        ? incomingValue.map(({ file, caption }) => ({
            id: createId(),
            file,
            caption,
          }))
        : this.getDefaultFormFieldValue(),
    };
  },
  getOutgoingValue(field) {
    return field.value.map((imageEntry) => ({
      id: imageEntry.file.id,
      caption: imageEntry.caption ?? null,
    }));
  },
};

/** REPEATER **/

type RepeaterFieldUtilsType = RepeaterFieldUtils<
  RepeaterIncomingValue,
  RepeaterFieldConfig,
  RepeaterField,
  RepeaterOutgoingValue
>;

const repeaterFieldUtils: RepeaterFieldUtilsType = {
  type: "REPEATER",
  getDefaultFormFieldValue() {
    return [];
  },
  createFormField(fieldConfig, incomingValue) {
    function createNestedFieldArray(
      fieldConfigList: RepeaterFieldConfig["fields"],
      incomingFieldList: RepeaterIncomingValue
    ): RepeaterField["value"] {
      const nestedFieldList: RepeaterField["value"] = [];

      for (let i = 0; i < incomingFieldList.length; i++) {
        const nestedIncomingFieldList = incomingFieldList[i];

        const nestedField: RepeaterField["value"][number] = {
          id: createId(),
          value: [],
        };

        for (let j = 0; j < fieldConfigList.length; j++) {
          const nestedFieldConfig = fieldConfigList[j];

          const foundNestedIncomingField = nestedIncomingFieldList.find(
            (field) => field.name === nestedFieldConfig.name
          );

          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          const field = universalFieldUtils.createFormField(
            nestedFieldConfig,
            foundNestedIncomingField?.value
          );

          nestedField.value.push(field as FieldUnion);
        }

        nestedFieldList.push(nestedField);
      }

      return nestedFieldList;
    }

    return {
      id: createId(),
      config: fieldConfig,
      value: incomingValue
        ? createNestedFieldArray(fieldConfig.fields, incomingValue)
        : this.getDefaultFormFieldValue(),
    };
  },
  getOutgoingValue(field) {
    return field.value.map((entity) =>
      entity.value.map((entityField) => {
        return {
          name: entityField.config.name,
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          value: universalFieldUtils.getOutgoingValue(entityField),
        };
      })
    );
  },
  getOutgoingValueAsSingleArray(field) {
    return field.value.map((entity) => entity.value[0].value);
  },
};

/** GROUP **/

type GroupFieldUtilsType = FieldUtils<
  GroupIncomingValue,
  GroupFieldConfig,
  GroupField,
  GroupOutgoingValue
>;

const groupFieldUtils: GroupFieldUtilsType = {
  type: "GROUP",
  getDefaultFormFieldValue() {
    return [];
  },
  createFormField(fieldConfig, incomingValue) {
    function createNestedFieldArray(
      fieldConfigList: GroupFieldConfig["fields"],
      incomingFieldList: GroupIncomingValue
    ): GroupField["value"] {
      const nestedFieldList: GroupField["value"] = [];

      for (let j = 0; j < fieldConfigList.length; j++) {
        const nestedFieldConfig = fieldConfigList[j];

        const foundNestedIncomingField = incomingFieldList.find(
          (field) => field.name === nestedFieldConfig.name
        );

        const field = universalFieldUtils.createFormField(
          nestedFieldConfig,
          foundNestedIncomingField?.value
        );

        nestedFieldList.push(field);
      }

      return nestedFieldList;
    }

    return {
      id: createId(),
      config: fieldConfig,
      value: incomingValue
        ? createNestedFieldArray(fieldConfig.fields, incomingValue)
        : this.getDefaultFormFieldValue(),
    };
  },
  getOutgoingValue(field) {
    return field.value.map((entityField) => {
      return {
        name: entityField.config.name,
        value: universalFieldUtils.getOutgoingValue(entityField),
      };
    });
  },
};

/** UNKNOWN **/

type UnknownFieldUtilsType = FieldUtils<
  UnknownIncomingValue,
  UnknownFieldConfig,
  UnknownField,
  UnknownOutgoingValue
>;

const unknownFieldUtils: UnknownFieldUtilsType = {
  type: "UNKNOWN",
  getDefaultFormFieldValue() {
    return null;
  },
  createFormField(fieldConfig) {
    return {
      id: createId(),
      config: fieldConfig,
      value: null,
    };
  },
  getOutgoingValue() {
    return null;
  },
};

const FIELD_UTILS_LIST = [
  stringFieldUtils,
  urlFieldUtils,
  textFieldUtils,
  numberFieldUtils,
  htmlFieldUtils,
  imageFieldUtils,
  fileFieldUtils,
  galleryFieldUtils,
  dateFieldUtils,
  dateTimeFieldUtils,
  booleanFieldUtils,
  selectFieldUtils,
  ajaxSelectFieldUtils,
  multiSelectFieldUtils,
  colorFieldUtils,
  buttonFieldUtils,
  mapFieldUtils,
  repeaterFieldUtils,
  groupFieldUtils,
  unknownFieldUtils,
  minMaxFieldUtils,
];

type FieldUtilsUnion = typeof FIELD_UTILS_LIST[number];

function getFieldUtilsByType(type: string): FieldUtilsUnion {
  const foundUtils = FIELD_UTILS_LIST.find((utils) => utils.type === type);

  if (!foundUtils) {
    console.warn("Cannot find utils for type: ", type);
  }

  return foundUtils ?? unknownFieldUtils;
}

interface UniversalFieldUtils {
  createFormField(
    fieldConfig: FieldConfigUnion,
    incomingValue: Nullish<IncomingValueUnion>
  ): FieldUnion;
  getOutgoingValue(field: FieldUnion): OutgoingValueUnion;
  getOutgoingRepeaterValueAsSingleArray<ValueType>(
    field: FieldUnion
  ): ValueType[];
}

export const universalFieldUtils: UniversalFieldUtils = {
  createFormField(
    fieldConfig: FieldConfigUnion,
    incomingValue: Nullish<IncomingValueUnion>
  ): FieldUnion {
    const foundFieldUtils = getFieldUtilsByType(fieldConfig.type);

    return (
      foundFieldUtils.createFormField as UniversalFieldUtils["createFormField"]
    )(fieldConfig, incomingValue);
  },
  getOutgoingValue(field: FieldUnion): OutgoingValueUnion {
    const foundFieldUtils = getFieldUtilsByType(field.config.type);
    return (
      foundFieldUtils.getOutgoingValue as UniversalFieldUtils["getOutgoingValue"]
    )(field);
  },
  getOutgoingRepeaterValueAsSingleArray<ValueType>(
    field: FieldUnion
  ): ValueType[] {
    return repeaterFieldUtils.getOutgoingValueAsSingleArray(
      field as RepeaterField
    );
  },
};
