import { Errors } from "$lib/services/errors/messages";

export default class AppErrorsHelper {
  static _singleton: AppErrorsHelper = new AppErrorsHelper();

  constructor() {}

  static GI(): AppErrorsHelper {
    return this._singleton;
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
    this.error = error || this.error;
    this.errorCode = code || this.errorCode;
    this.details = details || this.details;
  }
}
