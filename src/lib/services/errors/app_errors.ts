import { Errors } from "./messages";

export class AppErrors {
  private static _singleton: AppErrors = new AppErrors();

  private constructor() {}

  public static GI(): AppErrors {
    return AppErrors._singleton;
  }

  errorCode: number = 100;
  error: Errors = Errors.unknown;
  details: string = "";

  addError({
    code,
    error,
    details,
  }: {
    code?: number;
    error?: Errors;
    details?: string;
  }): void {
    this.error = error !== undefined ? error : this.error;
    this.errorCode = code !== undefined ? code : this.errorCode;
    this.details = details !== undefined ? details : this.details;
  }
}
