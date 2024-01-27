// export function sumDurations(durationArray: string[]): string {
//     // Define a regular expression to extract hours and minutes from the duration string
//     var durationRegex = /(\d+)h\s*(\d*)m/;

//     // Use reduce to sum the durations
//     var totalMinutes = durationArray.reduce(function (
//         accumulator,
//         duration,
//     ) {
//         var matches = duration.match(durationRegex);

//         if (matches) {
//             var hours = parseInt(matches[1]) || 0;
//             var minutes = parseInt(matches[2]) || 0;

//             // Convert hours to minutes and add to the accumulator
//             return accumulator + hours * 60 + minutes;
//         } else {
//             console.error("Invalid duration format: " + duration);
//             return accumulator;
//         }
//     }, 0);

//     // Calculate total hours and remaining minutes
//     var totalHours = Math.floor(totalMinutes / 60);
//     var remainingMinutes = totalMinutes % 60;

//     return totalHours + "h " + remainingMinutes + "m";
// }

// export function multiplyAndSumDurations(
//     duration: string,
//     multiplier: number,
// ): string {
//     // Define a regular expression to extract hours and minutes from the duration string
//     const durationRegex = /(\d+)h\s*(\d*)m/;

//     // Use regular expression to extract hours and minutes
//     const matches = duration.match(durationRegex);

//     if (matches) {
//         const hours = parseInt(matches[1]) || 0;
//         const minutes = parseInt(matches[2]) || 0;

//         // Calculate total duration in minutes after applying the multiplier
//         const totalMinutes = (hours * 60 + minutes) * multiplier;

//         // Calculate total hours and remaining minutes
//         const totalHours = Math.floor(totalMinutes / 60);
//         const remainingMinutes = totalMinutes % 60;

//         return totalHours + "h " + remainingMinutes + "m";
//     } else {
//         console.error("Invalid duration format: " + duration);
//         return "";
//     }
// }
