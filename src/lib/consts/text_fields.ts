export enum InputOptions {
  text,
  email,
  password,
  number,
}

export const inputOptionToStr = {
  [InputOptions.text]: "text",
  [InputOptions.email]: "email",
  [InputOptions.password]: "password",
  [InputOptions.number]: "number",
};

export interface PhonePickerEvent {
  value: string | null | undefined;
  isValid: boolean;
}

export interface TextFieldEvent {
  value: string;
  isValid: boolean;
}

export interface OtpFieldEvent {
  value: string;
}
