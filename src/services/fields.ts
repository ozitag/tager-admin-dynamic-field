import { createId, isNotNullish, Nullish } from '@tager/admin-services';

import {
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
} from '../typings/model';

interface FieldUtils<
  IncomingValue,
  Config extends FieldConfig,
  F extends Field<Config>,
  OutgoingValue
> {
  type: Config['type'];
  getDefaultFormFieldValue(): F['value'];
  createFormField(fieldConfig: Config, incomingValueValue: IncomingValue): F;
  getOutgoingValue(field: F): OutgoingValue;
}

type StringFieldUtilsType = FieldUtils<
  StringIncomingValue,
  StringFieldConfig,
  StringField,
  StringOutgoingValue
>;

const stringFieldUtils: StringFieldUtilsType = {
  type: 'STRING',
  getDefaultFormFieldValue() {
    return '';
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

type UrlFieldUtilsType = FieldUtils<
  UrlIncomingValue,
  UrlFieldConfig,
  UrlField,
  UrlOutgoingValue
>;

const urlFieldUtils: UrlFieldUtilsType = {
  type: 'URL',
  getDefaultFormFieldValue() {
    return '';
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

type DateFieldUtilsType = FieldUtils<
  DateIncomingValue,
  DateFieldConfig,
  DateField,
  DateOutgoingValue
>;

const dateFieldUtils: DateFieldUtilsType = {
  type: 'DATE',
  getDefaultFormFieldValue() {
    return '';
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

type DateTimeFieldUtilsType = FieldUtils<
  DateTimeIncomingValue,
  DateTimeFieldConfig,
  DateTimeField,
  DateTimeOutgoingValue
>;

const dateTimeFieldUtils: DateTimeFieldUtilsType = {
  type: 'DATETIME',
  getDefaultFormFieldValue() {
    return '';
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

type TextFieldUtilsType = FieldUtils<
  TextIncomingValue,
  TextFieldConfig,
  TextField,
  TextOutgoingValue
>;

const textFieldUtils: TextFieldUtilsType = {
  type: 'TEXT',
  getDefaultFormFieldValue() {
    return '';
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

type NumberFieldUtilsType = FieldUtils<
  NumberIncomingValue,
  NumberFieldConfig,
  NumberField,
  NumberOutgoingValue
>;

const numberFieldUtils: NumberFieldUtilsType = {
  type: 'NUMBER',
  getDefaultFormFieldValue() {
    return '';
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

type BooleanFieldUtilsType = FieldUtils<
  BooleanIncomingValue,
  BooleanFieldConfig,
  BooleanField,
  BooleanOutgoingValue
>;

const booleanFieldUtils: BooleanFieldUtilsType = {
  type: 'TRUE_FALSE',
  getDefaultFormFieldValue() {
    return false;
  },
  createFormField(fieldConfig, incomingValue) {
    return {
      id: createId(),
      config: fieldConfig,
      value: Boolean(incomingValue),
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

const selectFieldUtils: SelectFieldUtilsType = {
  type: 'SELECT',
  getDefaultFormFieldValue() {
    return null;
  },
  createFormField(fieldConfig, incomingValue) {
    const foundOption = fieldConfig.meta.options.find(
      (option) => String(option.value) === String(incomingValue)
    );

    return {
      id: createId(),
      config: fieldConfig,
      value: foundOption ?? this.getDefaultFormFieldValue(),
    };
  },
  getOutgoingValue(field) {
    return field.value?.value ?? null;
  },
};

type ColorFieldUtilsType = FieldUtils<
  ColorIncomingValue,
  ColorFieldConfig,
  ColorField,
  ColorOutgoingValue
>;

const colorFieldUtils: ColorFieldUtilsType = {
  type: 'COLOR',
  getDefaultFormFieldValue() {
    return '#000000';
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

type ButtonFieldUtilsType = FieldUtils<
  ButtonIncomingValue,
  ButtonFieldConfig,
  ButtonField,
  ButtonOutgoingValue
>;

const buttonFieldUtils: ButtonFieldUtilsType = {
  type: 'BUTTON',
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

type MapFieldUtilsType = FieldUtils<
  MapIncomingValue,
  MapFieldConfig,
  MapField,
  MapOutgoingValue
>;

const mapFieldUtils: MapFieldUtilsType = {
  type: 'MAP',
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

type HtmlFieldUtilsType = FieldUtils<
  HtmlIncomingValue,
  HtmlFieldConfig,
  HtmlField,
  HtmlOutgoingValue
>;

const htmlFieldUtils: HtmlFieldUtilsType = {
  type: 'HTML',
  getDefaultFormFieldValue() {
    return '';
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

type ImageFieldUtilsType = FieldUtils<
  ImageIncomingValue,
  ImageFieldConfig,
  ImageField,
  ImageOutgoingValue
>;

const imageFieldUtils: ImageFieldUtilsType = {
  type: 'IMAGE',
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

type FileFieldUtilsType = FieldUtils<
  FileIncomingValue,
  FileFieldConfig,
  FileField,
  FileOutgoingValue
>;

const fileFieldUtils: FileFieldUtilsType = {
  type: 'FILE',
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

type GalleryFieldUtilsType = FieldUtils<
  GalleryIncomingValue,
  GalleryFieldConfig,
  GalleryField,
  GalleryOutgoingValue
>;

const galleryFieldUtils: GalleryFieldUtilsType = {
  type: 'GALLERY',
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

type RepeaterFieldUtilsType = FieldUtils<
  RepeaterIncomingValue,
  RepeaterFieldConfig,
  RepeaterField,
  RepeaterOutgoingValue
>;

const repeaterFieldUtils: RepeaterFieldUtilsType = {
  type: 'REPEATER',
  getDefaultFormFieldValue() {
    return [];
  },
  createFormField(fieldConfig, incomingValue) {
    function createNestedFieldArray(
      fieldConfigList: RepeaterFieldConfig['fields'],
      incomingFieldList: RepeaterIncomingValue
    ): RepeaterField['value'] {
      const nestedFieldList: RepeaterField['value'] = [];

      for (let i = 0; i < incomingFieldList.length; i++) {
        const nestedIncomingFieldList = incomingFieldList[i];

        const nestedField: RepeaterField['value'][number] = {
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
};

type UnknownFieldUtilsType = FieldUtils<
  UnknownIncomingValue,
  UnknownFieldConfig,
  UnknownField,
  UnknownOutgoingValue
>;

const unknownFieldUtils: UnknownFieldUtilsType = {
  type: 'UNKNOWN',
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
  colorFieldUtils,
  buttonFieldUtils,
  mapFieldUtils,
  repeaterFieldUtils,
  unknownFieldUtils,
];

type FieldUtilsUnion = typeof FIELD_UTILS_LIST[number];

function getFieldUtilsByType(type: string): FieldUtilsUnion {
  const foundUtils = FIELD_UTILS_LIST.find((utils) => utils.type === type);

  if (!foundUtils) {
    console.warn('Cannot find utils for type: ', type);
  }

  return foundUtils ?? unknownFieldUtils;
}

interface UniversalFieldUtils {
  createFormField(
    fieldConfig: FieldConfigUnion,
    incomingValue: Nullish<IncomingValueUnion>
  ): FieldUnion;
  getOutgoingValue(field: FieldUnion): OutgoingValueUnion;
}

export const universalFieldUtils: UniversalFieldUtils = {
  createFormField(
    fieldConfig: FieldConfigUnion,
    incomingValue: Nullish<IncomingValueUnion>
  ): FieldUnion {
    const foundFieldUtils = getFieldUtilsByType(fieldConfig.type);

    return (foundFieldUtils.createFormField as UniversalFieldUtils['createFormField'])(
      fieldConfig,
      incomingValue
    );
  },
  getOutgoingValue(field: FieldUnion): OutgoingValueUnion {
    const foundFieldUtils = getFieldUtilsByType(field.config.type);
    return (foundFieldUtils.getOutgoingValue as UniversalFieldUtils['getOutgoingValue'])(
      field
    );
  },
};
