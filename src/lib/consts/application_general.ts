import type { ILogObj } from "tslog";
import { Logger } from "tslog";

export enum Level {
  all = 0,
  // Deprecated: '[verbose] is being deprecated in favor of [trace].'
  verbose = 1,
  trace = 2,
  debug = 3,
  info = 4,
  warning = 5,
  error = 6,
  fatal = 7,
  off = 8,
}
export const logger: Logger<ILogObj> = new Logger({ minLevel: Level.info });

export enum ErrorsTypeLog {
  login = "login",
  enter = "enter",
}

export const errorsTypeLogToStr: Record<ErrorsTypeLog, string> = {
  [ErrorsTypeLog.login]: "login",
  [ErrorsTypeLog.enter]: "enter",
};

export const developers = ["+972-504040624", "+972-525656377"];

export const markedSettings: any[] = []; // need to translate
export const durationToNotifyOnLongTimeNoSee = { days: 10 };
export const appCreation = new Date(2023, 0, 1);
export const versionUpdate123Date = new Date(2024, 0, 9, 20, 0);
export const productionVersionMessage = "PRODUCTION VERSION CANT RUN SCRIPTS";

export const isProduction = false;
