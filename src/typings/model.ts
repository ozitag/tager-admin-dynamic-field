import type { Nullable, FileType } from "@tager/admin-services";
import type { OptionType, SingleFileInputValueType } from "@tager/admin-ui";

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

export interface UnknownFieldConfig extends FieldConfig {
  type: "UNKNOWN";
  meta: {
    hidden?: boolean;
  };
}

export type UnknownField = Field<UnknownFieldConfig, null>;
export type UnknownIncomingValue = null;
export type UnknownOutgoingValue = null;

/** STRING */

export interface StringFieldConfig extends FieldConfig {
  type: "STRING";
  meta: {
    hidden?: boolean;
  };
}

export type StringField = Field<StringFieldConfig, string>;
export type StringIncomingValue = Nullable<string>;
export type StringOutgoingValue = string;

/** URL */

export interface UrlFieldConfig extends FieldConfig {
  type: "URL";
  meta: {
    hidden?: boolean;
  };
}

export type UrlField = Field<UrlFieldConfig, string>;
export type UrlIncomingValue = Nullable<string>;
export type UrlOutgoingValue = string;

/** DATE */

export interface DateFieldConfig extends FieldConfig {
  type: "DATE";
  meta: {
    hidden?: boolean;
  };
}

export type DateField = Field<DateFieldConfig, string>;
export type DateIncomingValue = Nullable<string>;
export type DateOutgoingValue = string;

/** DATETIME */

export interface DateTimeFieldConfig extends FieldConfig {
  type: "DATETIME";
  meta: {
    hidden?: boolean;
  };
}

export type DateTimeField = Field<DateTimeFieldConfig, string>;
export type DateTimeIncomingValue = Nullable<string>;
export type DateTimeOutgoingValue = string;

/** TEXT */

export interface TextFieldConfig extends FieldConfig {
  type: "TEXT";
  meta: {
    hidden?: boolean;
  };
}

export type TextField = Field<TextFieldConfig, string>;
export type TextIncomingValue = Nullable<string>;
export type TextOutgoingValue = string;

/** HTML */

export interface HtmlFieldConfig extends FieldConfig {
  type: "HTML";
  meta: {
    hidden?: boolean;
  };
}

export type HtmlField = Field<HtmlFieldConfig, string>;
export type HtmlIncomingValue = Nullable<string>;
export type HtmlOutgoingValue = string;

/** NUMBER */

export interface NumberFieldConfig extends FieldConfig {
  type: "NUMBER";
  meta: {
    hidden?: boolean;
  };
}

export type NumberField = Field<NumberFieldConfig, string>;
export type NumberIncomingValue = Nullable<number>;
export type NumberOutgoingValue = string;

/** IMAGE */

export interface ImageFieldConfig extends FieldConfig {
  type: "IMAGE";
  meta: {
    scenario?: Nullable<string>;
    hidden?: boolean;
  };
}

export type ImageField = Field<
  ImageFieldConfig,
  Nullable<SingleFileInputValueType>
>;
export type ImageIncomingValue = Nullable<FileType>;
export type ImageOutgoingValue = Nullable<string>;

/** GALLERY */

export interface GalleryFieldConfig extends FieldConfig {
  type: "GALLERY";
  meta: {
    scenario?: Nullable<string>;
    withCaptions?: boolean;
    hidden?: boolean;
  };
}

export type GalleryField = Field<
  GalleryFieldConfig,
  Array<SingleFileInputValueType>
>;
export type GalleryIncomingValue = Array<{
  file: FileType;
  caption: Nullable<string>;
}>;
export type GalleryOutgoingValue = Array<{
  id: string;
  caption: Nullable<string>;
}>;

/** FILE */

export interface FileFieldConfig extends FieldConfig {
  type: "FILE";
  meta: {
    scenario?: Nullable<string>;
    hidden?: boolean;
  };
}

export type FileField = Field<
  FileFieldConfig,
  Nullable<SingleFileInputValueType>
>;
export type FileIncomingValue = Nullable<FileType>;
export type FileOutgoingValue = Nullable<string>;

/** BOOLEAN */

export interface BooleanFieldConfig extends FieldConfig {
  type: "TRUE_FALSE";
  meta: {
    hidden?: boolean;
    defaultValue?: boolean;
  };
}

export type BooleanField = Field<BooleanFieldConfig, boolean>;
export type BooleanIncomingValue = Nullable<boolean>;
export type BooleanOutgoingValue = boolean;

/** SELECT */

export type OptionValueType = number | string;
export type CommonOptionType = OptionType<OptionValueType>;

export interface SelectFieldConfig extends FieldConfig {
  type: "SELECT";
  meta: {
    options: Nullable<Array<CommonOptionType>>;
    hidden?: boolean;
    searchable?: boolean;
  };
}

export type SelectField = Field<SelectFieldConfig, Nullable<CommonOptionType>>;
export type SelectIncomingValue = Nullable<OptionValueType>;
export type SelectOutgoingValue = Nullable<OptionValueType>;

/** AJAX_SELECT */

export interface AjaxSelectFieldConfig extends FieldConfig {
  type: "AJAX_SELECT";
  meta: {
    valueField?: string;
    labelField?: string;
    requestUrl: string;
    hidden?: boolean;
  };
}

export type AjaxSelectField = Field<
  AjaxSelectFieldConfig,
  Nullable<CommonOptionType>
>;
export type AjaxSelectIncomingValue = Nullable<CommonOptionType>;
export type AjaxSelectOutgoingValue = Nullable<OptionValueType>;

/** MULTI_SELECT */

export interface MultiSelectFieldConfig extends FieldConfig {
  type: "MULTI_SELECT";
  meta: {
    options: Nullable<Array<CommonOptionType>>;
    hidden?: boolean;
    maximumItemsCount?: number;
  };
}

export type MultiSelectField = Field<
  MultiSelectFieldConfig,
  Array<CommonOptionType>
>;
export type MultiSelectIncomingValue = Nullable<Array<OptionValueType>>;
export type MultiSelectOutgoingValue = Array<OptionValueType>;

/** COLOR */

export interface ColorFieldConfig extends FieldConfig {
  type: "COLOR";
  meta: {
    hidden?: boolean;
  };
}

export type ColorField = Field<ColorFieldConfig, string>;
export type ColorIncomingValue = Nullable<string>;
export type ColorOutgoingValue = string;

/** BUTTON */

type ButtonFieldValue = Nullable<{
  label: Nullable<string>;
  link: Nullable<string>;
  isNewTab: boolean;
}>;

export interface ButtonFieldConfig extends FieldConfig {
  type: "BUTTON";
  meta: {
    hidden?: boolean;
  };
}

export type ButtonField = Field<ButtonFieldConfig, ButtonFieldValue>;
export type ButtonIncomingValue = Nullable<ButtonFieldValue>;
export type ButtonOutgoingValue = ButtonFieldValue;

/** MAP */

type MapFieldValue = Nullable<{
  latitude: number;
  longitude: number;
}>;

export interface MapFieldConfig extends FieldConfig {
  type: "MAP";
  meta: {
    hidden?: boolean;
  };
}

export type MapField = Field<MapFieldConfig, MapFieldValue>;
export type MapIncomingValue = Nullable<MapFieldValue>;
export type MapOutgoingValue = MapFieldValue;

/** REPEATER */

export interface RepeaterFieldConfig extends FieldConfig {
  type: "REPEATER";
  fields: Array<FieldConfigUnion>;
  meta: {
    view?: "TABLE";
    defaultIsOpen?: boolean;
    hidden?: boolean;
    maximumItemsCount?: number;
    hideCount?: boolean;
    addLabel?: string;
  };
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

/** GROUP **/

export interface GroupFieldConfig extends FieldConfig {
  type: "GROUP";
  fields: Array<FieldConfigUnion>;
  meta: {
    defaultIsOpen?: boolean;
    hidden?: boolean;
  };
}

export type GroupField = Field<GroupFieldConfig, Array<FieldUnion>>;
export type GroupIncomingValue = Array<FieldShortType<IncomingValueUnion>>;
export type GroupOutgoingValue = Array<FieldShortType<OutgoingValueUnion>>;

/** All */
export type FieldConfigUnion =
  | StringFieldConfig
  | UrlFieldConfig
  | TextFieldConfig
  | NumberFieldConfig
  | HtmlFieldConfig
  | DateFieldConfig
  | DateTimeFieldConfig
  | ImageFieldConfig
  | GalleryFieldConfig
  | FileFieldConfig
  | BooleanFieldConfig
  | SelectFieldConfig
  | AjaxSelectFieldConfig
  | MultiSelectFieldConfig
  | ColorFieldConfig
  | ButtonFieldConfig
  | MapFieldConfig
  | RepeaterFieldConfig
  | GroupFieldConfig;

export type FieldUnion =
  | StringField
  | UrlField
  | TextField
  | NumberField
  | HtmlField
  | DateField
  | DateTimeField
  | ImageField
  | GalleryField
  | FileField
  | BooleanField
  | SelectField
  | AjaxSelectField
  | MultiSelectField
  | ColorField
  | ButtonField
  | MapField
  | RepeaterField
  | GroupField
  | UnknownField;

export type IncomingValueUnion =
  | StringIncomingValue
  | UrlIncomingValue
  | TextIncomingValue
  | NumberIncomingValue
  | HtmlIncomingValue
  | DateIncomingValue
  | DateTimeIncomingValue
  | ImageIncomingValue
  | GalleryIncomingValue
  | FileIncomingValue
  | BooleanIncomingValue
  | SelectIncomingValue
  | AjaxSelectIncomingValue
  | MultiSelectIncomingValue
  | ColorIncomingValue
  | ButtonIncomingValue
  | MapIncomingValue
  | RepeaterIncomingValue
  | GroupIncomingValue
  | UnknownIncomingValue;

export type OutgoingValueUnion =
  | StringOutgoingValue
  | UrlOutgoingValue
  | TextOutgoingValue
  | NumberOutgoingValue
  | HtmlOutgoingValue
  | DateOutgoingValue
  | DateTimeOutgoingValue
  | ImageOutgoingValue
  | GalleryOutgoingValue
  | FileOutgoingValue
  | BooleanOutgoingValue
  | SelectOutgoingValue
  | AjaxSelectOutgoingValue
  | MultiSelectOutgoingValue
  | ColorOutgoingValue
  | ButtonOutgoingValue
  | MapOutgoingValue
  | RepeaterOutgoingValue
  | GroupOutgoingValue
  | UnknownOutgoingValue;
