export enum InputOptions {
  text,
  email,
  password,
}

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
