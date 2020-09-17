import { Nullable, FileType } from '@tager/admin-services';

/** Common */
export interface FieldConfig {
  readonly name: string;
  readonly label: string;
  readonly type: string;
  readonly meta: Record<string, unknown>;
  readonly fields?: Array<FieldConfig>;
}

export interface Field<Config extends FieldConfig, Value = unknown> {
  readonly id: string;
  readonly config: Config;
  value: Value;
}

export type FieldShortType<Value> = {
  name: string;
  value: Value;
};

/** Default - we use it as fallback for unknown fields */

export type DefaultFieldConfig = FieldConfig;

export type DefaultField = Field<DefaultFieldConfig, null>;
export type DefaultIncomingValue = null;
export type DefaultOutgoingValue = null;

/** STRING */

export interface StringFieldConfig extends FieldConfig {
  type: 'STRING';
}
export type StringField = Field<StringFieldConfig, string>;
export type StringIncomingValue = string;
export type StringOutgoingValue = string;

/** URL */

export interface UrlFieldConfig extends FieldConfig {
  type: 'URL';
}
export type UrlField = Field<UrlFieldConfig, string>;
export type UrlIncomingValue = string;
export type UrlOutgoingValue = string;

/** DATE */

export interface DateFieldConfig extends FieldConfig {
  type: 'DATE';
}
export type DateField = Field<DateFieldConfig, string>;
export type DateIncomingValue = string;
export type DateOutgoingValue = string;

/** DATETIME */

export interface DateTimeFieldConfig extends FieldConfig {
  type: 'DATETIME';
}
export type DateTimeField = Field<DateTimeFieldConfig, string>;
export type DateTimeIncomingValue = string;
export type DateTimeOutgoingValue = string;

/** TEXT */

export interface TextFieldConfig extends FieldConfig {
  type: 'TEXT';
}
export type TextField = Field<TextFieldConfig, string>;
export type TextIncomingValue = string;
export type TextOutgoingValue = string;

/** HTML */

export interface HtmlFieldConfig extends FieldConfig {
  type: 'HTML';
}
export type HtmlField = Field<HtmlFieldConfig, string>;
export type HtmlIncomingValue = string;
export type HtmlOutgoingValue = string;

/** IMAGE */

export interface ImageFieldConfig extends FieldConfig {
  type: 'IMAGE';
}
export type ImageField = Field<ImageFieldConfig, Nullable<FileType>>;
export type ImageIncomingValue = Nullable<FileType>;
export type ImageOutgoingValue = Nullable<number>;

/** GALLERY */

export interface GalleryFieldConfig extends FieldConfig {
  type: 'GALLERY';
}
export type GalleryField = Field<GalleryFieldConfig, Array<FileType>>;
export type GalleryIncomingValue = Array<FileType>;
export type GalleryOutgoingValue = Array<number>;

/** FILE */

export interface FileFieldConfig extends FieldConfig {
  type: 'FILE';
}
export type FileField = Field<FileFieldConfig, Nullable<FileType>>;
export type FileIncomingValue = Nullable<FileType>;
export type FileOutgoingValue = Nullable<number>;

/** REPEATER */

export interface RepeaterFieldConfig extends FieldConfig {
  type: 'REPEATER';
  fields: Array<FieldConfigUnion>;
  meta: { view?: 'TABLE' };
}
export type RepeaterField = Field<
  RepeaterFieldConfig,
  Array<{ id: string; value: Array<FieldUnion> }>
>;
export type RepeaterIncomingValue = Array<
  Array<FieldShortType<IncomingValueUnion>>
>;
export type RepeaterOutgoingValue = Array<
  Array<FieldShortType<OutgoingValueUnion>>
>;

/** All */
export type FieldConfigUnion =
  | StringFieldConfig
  | UrlFieldConfig
  | TextFieldConfig
  | HtmlFieldConfig
  | DateFieldConfig
  | DateTimeFieldConfig
  | ImageFieldConfig
  | GalleryFieldConfig
  | FileFieldConfig
  | RepeaterFieldConfig;

export type FieldUnion =
  | StringField
  | UrlField
  | TextField
  | HtmlField
  | DateField
  | DateTimeField
  | ImageField
  | GalleryField
  | FileField
  | RepeaterField
  | DefaultField;

export type IncomingValueUnion =
  | StringIncomingValue
  | UrlIncomingValue
  | TextIncomingValue
  | HtmlIncomingValue
  | DateIncomingValue
  | DateTimeIncomingValue
  | DefaultIncomingValue
  | ImageIncomingValue
  | GalleryIncomingValue
  | FileIncomingValue
  | RepeaterIncomingValue;

export type OutgoingValueUnion =
  | StringOutgoingValue
  | UrlOutgoingValue
  | TextOutgoingValue
  | HtmlOutgoingValue
  | DateOutgoingValue
  | DateTimeOutgoingValue
  | ImageOutgoingValue
  | GalleryOutgoingValue
  | FileOutgoingValue
  | RepeaterOutgoingValue
  | DefaultOutgoingValue;
