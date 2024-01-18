export function parseAppLimit(json: Record<string, any>): void {
  Object.entries(json).forEach(([subType, limits]) => {
    if (appLimits[subTypeFromStr[subType]] === undefined) {
      return;
    }
    Object.entries(limits as Record<string, any>).forEach(
      ([limitKey, value]) => {
        const key = limitationFromStr[limitKey];
        if (key === undefined) {
          return;
        }

        appLimits[subTypeFromStr[subType]]![key] = value;
      }
    );
  });
}

export function isLight(color: number) {
  const hex = color.toString();
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 155;
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

export async function isNetworkConnected() {
  return true;
}
