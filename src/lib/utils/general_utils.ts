import { pushState } from "$app/navigation";
import { GeneralData } from "$lib/helpers/general_data";

// export function parseAppLimit(json: Record<string, any>): void {
//   Object.entries(json).forEach(([subType, limits]) => {
//     if (appLimits[subTypeFromStr[subType]] === undefined) {
//       return;
//     }
//     Object.entries(limits as Record<string, any>).forEach(
//       ([limitKey, value]) => {
//         const key = limitationFromStr[limitKey];
//         if (key === undefined) {
//           return;
//         }

//         appLimits[subTypeFromStr[subType]]![key] = value;
//       }
//     );
//   });
// }
export function isManager(userId: string): boolean {
  return userId.length < 20
    ? GeneralData.currentBusinesssId.startsWith(userId.substring(1))
    : GeneralData.currentBusinesssId.startsWith(userId);
}

export function computeLuminance(color: number): number {
  function _linearizeColorComponent(component: number): number {
    if (component <= 0.03928) {
      return component / 12.92;
    }
    return Math.pow((component + 0.055) / 1.055, 2.4);
  }

  let hex: string = color.toString(16);
  let red: number = parseInt(hex.slice(2, 4), 16);
  let green: number = parseInt(hex.slice(4, 6), 16);
  let blue: number = parseInt(hex.slice(6, 8), 16);

  // See <https://www.w3.org/TR/WCAG20/#relativeluminancedef>
  const R = _linearizeColorComponent(red / 0xff);
  const G = _linearizeColorComponent(green / 0xff);
  const B = _linearizeColorComponent(blue / 0xff);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function isLight(color: number, treshhold: number = 155) {
  const hex = color.toString(16);
  const c_r = parseInt(hex.slice(2, 4), 16);
  const c_g = parseInt(hex.slice(4, 6), 16);
  const c_b = parseInt(hex.slice(6, 8), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;

  return brightness > treshhold;
}

export async function checkTime(lookupAddress: string): Promise<Error | null> {
  try {
    return null;

    // const myTime = new Date();

    // // Get NTP offset and add it to the local time
    // const offset = await NtpClient.getNetworkTime(lookupAddress)
    //   .then((ntpTime) => ntpTime - myTime.getTime())
    //   .catch(() => 0);

    // const ntpTime = new Date(myTime.getTime() + offset);

    // const difference = myTime.getTime() - ntpTime.getTime();
    // console.log(`==== ${lookupAddress} ====`);
    // console.log(`My time: ${myTime}`);
    // console.log(`NTP time: ${ntpTime}`);
    // console.log(`Difference: ${difference}ms`);

    // return Math.abs(difference) < 300000 ? null : new Error(`Time is not correct, diff: ${difference}`);
  } catch (error) {
    return error as Error;
  }
}

export function setEquals<T>(a: Set<T> | null, b: Set<T> | null): boolean {
  if (a === null) {
    return b === null;
  }
  if (b === null || a.size !== b.size) {
    return false;
  }
  if (a === b) {
    return true;
  }
  for (const value of a) {
    if (!b.has(value)) {
      return false;
    }
  }
  return true;
}

export async function isNetworkConnected() {
  return true;
}

export async function delay(ms: number) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

export function convertMapToObject(
  metricArguments: Map<string, any>
): Record<string, any> {
  let newObject: Record<string, any> = {};
  for (let [key, value] of metricArguments) {
    newObject[key] = value;
  }
  return newObject;
}

export function isNumber(value?: string | number): boolean {
  return value != null && value !== "" && !isNaN(Number(value.toString()));
}

export function pushDialog(
  dialog: HTMLDialogElement | undefined,
  herf?: string,
  delay: number = 0
) {
  pushState(herf ?? "", {
    showModal: true,
  });
  setTimeout(() => dialog!.showModal(), delay);
}

export function setIntersecation(set1: Set<any>, set2: Set<any>) {
  const ans = new Set();
  for (let i of set2) {
    if (set1.has(i)) {
      ans.add(i);
    }
  }
  return ans;
}
