import { containerRadius } from "./sizes";

export const cssSizesClasses = {
  xs: {
    iconSize: 19,
    cssClass: "h-[25px] sm:h-[29px] w-[25px] sm:w-[29px]",
  },
  sm: {
    iconSize: 22,
    cssClass: "h-[34px] sm:h-[40px] w-[34px] sm:w-[40px]",
  },
  md: {
    iconSize: 26,
    cssClass: "h-[37px] sm:h-[44px] w-[37px] sm:w-[44px]",
  },
  lg: {
    iconSize: 40,
    cssClass: "h-[50px] sm:h-[67px] w-[50px] sm:w-[67px]",
  },

  xl: {
    iconSize: 50,
    cssClass: "h-[80px] sm:h-[110px] w-[80px] sm:w-[110ox]",
  },
  xl2: {
    iconSize: 70,
    cssClass: "h-[100px] sm:h-[150px] w-[100px] sm:w-[150px]",
  },
  xl3: {
    iconSize: 70,
    cssClass: "h-[150px] sm:h-[200px] w-[150px] sm:w-[200px]",
  },
  xl4: {
    iconSize: 70,
    cssClass: "h-[200px] sm:h-[280px] w-[200px] sm:w-[280px]",
  },
  xl5: {
    iconSize: 70,
    cssClass: "h-[270px] sm:h-[340px] w-[270px] sm:w-[340px]",
  },
  xl6: {
    iconSize: 100,
    cssClass:
      "h-[330px] sm:h-[500px] w-[330px] sm:w-[500px] xs:w-[400px] xs:h-[400px]",
  },
};

export const scheuleItemWidthClass = "items-center  p-[2px] w-full";

export const bookingMakerButton = `btn btn-primary  hover:text-primary-content hover:outline ${containerRadius}`;
