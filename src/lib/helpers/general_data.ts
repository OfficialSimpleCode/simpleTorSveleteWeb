
/// This file is used to hold general data about the app that
/// every file can access to
class GeneralData {
    
    static  currentBusinesssId:string  = '';
    
    static  hasPaddingFromTop:boolean = false;
    static  paddingFromTop:number = 0.0;
    static  attemptsLeftForCardPassword:number = attemptsToTryPassword;
  
    //declare that the code run on the application store version and cant
    //act dev actions such - run scripts and tests
    static  productionVersion:boolean = true;
  }