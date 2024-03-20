/// This file is used to hold general data about the app that

import { maxAttemptsPassword } from "$lib/consts/hyp";

/// every file can access to
export class GeneralData {
  static currentBusinesssId: string = "";

  static attemptsLeftForCardPassword: number = maxAttemptsPassword;

  //declare that the code run on the application store version and cant
  //act dev actions such - run scripts and tests
  static productionVersion: boolean = true;
}
