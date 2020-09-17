import { nanoid } from 'nanoid';

import { Nullish } from '@tager/admin-services';

import {
  DateField,
  DateFieldConfig,
  DateIncomingValue,
  DateOutgoingValue,
  DateTimeField,
  DateTimeFieldConfig,
  DateTimeIncomingValue,
  DateTimeOutgoingValue,
  DefaultField,
  DefaultFieldConfig,
  DefaultIncomingValue,
  DefaultOutgoingValue,
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
} from '../typings/model';

interface FieldUtils<
  IncomingValue,
  Config extends FieldConfig,
  F extends Field<Config>,
  OutgoingValue
> {
  type: Config['type'];
  getDefaultFormFieldValue(): F['value'];
  createFormField(
    fieldConfig: Config,
    incomingValueValue: Nullish<IncomingValue>
  ): F;
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
      id: nanoid(),
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
      id: nanoid(),
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
      id: nanoid(),
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
      id: nanoid(),
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
      id: nanoid(),
      config: fieldConfig,
      value: incomingValue ?? this.getDefaultFormFieldValue(),
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
      id: nanoid(),
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
      id: nanoid(),
      config: fieldConfig,
      value: incomingValue ?? this.getDefaultFormFieldValue(),
    };
  },
  getOutgoingValue(field) {
    return field.value ? field.value.id : null;
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
      id: nanoid(),
      config: fieldConfig,
      value: incomingValue ?? this.getDefaultFormFieldValue(),
    };
  },
  getOutgoingValue(field) {
    return field.value ? field.value.id : null;
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
      id: nanoid(),
      config: fieldConfig,
      value: incomingValue ?? this.getDefaultFormFieldValue(),
    };
  },
  getOutgoingValue(field) {
    return field.value.map((image) => image.id);
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
          id: nanoid(),
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
      id: nanoid(),
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
          name: field.config.name,
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          value: universalFieldUtils.getOutgoingValue(entityField),
        };
      })
    );
  },
};

type DefaultFieldUtilsType = FieldUtils<
  DefaultIncomingValue,
  DefaultFieldConfig,
  DefaultField,
  DefaultOutgoingValue
>;

const defaultFieldUtils: DefaultFieldUtilsType = {
  type: 'DEFAULT',
  getDefaultFormFieldValue() {
    return null;
  },
  createFormField(fieldConfig) {
    return {
      id: nanoid(),
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
  htmlFieldUtils,
  imageFieldUtils,
  fileFieldUtils,
  galleryFieldUtils,
  dateFieldUtils,
  dateTimeFieldUtils,
  repeaterFieldUtils,
  defaultFieldUtils,
];

type FieldUtilsUnion = typeof FIELD_UTILS_LIST[number];

function getFieldUtilsByType(type: string): FieldUtilsUnion {
  return (
    FIELD_UTILS_LIST.find((utils) => utils.type === type) ?? defaultFieldUtils
  );
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
