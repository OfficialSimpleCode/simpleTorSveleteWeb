export function hexToXyY(hex: string) {
    // Convert hex to RGB
    function hexToRgb(hex: string) {
        let bigint = parseInt(hex.slice(1), 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        return { r, g, b };
    }

    // Convert RGB to XYZ
    function rgbToXyz(r: number, g: number, b: number) {
        r /= 255.0;
        g /= 255.0;
        b /= 255.0;

        r =
            r > 0.04045
                ? Math.pow((r + 0.055) / 1.055, 2.4)
                : r / 12.92;
        g =
            g > 0.04045
                ? Math.pow((g + 0.055) / 1.055, 2.4)
                : g / 12.92;
        b =
            b > 0.04045
                ? Math.pow((b + 0.055) / 1.055, 2.4)
                : b / 12.92;

        r *= 100.0;
        g *= 100.0;
        b *= 100.0;

        let x = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
        let y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
        let z = 0.0193339 * r + 0.119192 * g + 0.9503041 * b;

        return { x, y, z };
    }

    // Convert XYZ to xyY
    function xyzToXyY(x: number, y: number, z: number) {
        let sum = x + y + z;
        let xyY = {
            x: x / sum,
            y: y / sum,
            Y: y,
        };
        return xyY;
    }

    // Format xyY string
    function formatXyY(x: number, y: number, Y: number) {
        return `${x.toFixed(3)} ${y.toFixed(3)} ${Y.toFixed(3)}`;
    }

    // Convert hex to xyY
    let rgbColor = hexToRgb(hex);
    let xyzColor = rgbToXyz(rgbColor.r, rgbColor.g, rgbColor.b);
    let xyYColor = xyzToXyY(xyzColor.x, xyzColor.y, xyzColor.z);
    let xyYString = formatXyY(xyYColor.x, xyYColor.y, xyYColor.Y);

    console.log(xyYString);

    return xyYString;
}

export function numberToHex(num: number): string {
    let hexValue = num.toString(16).slice(2);
    let hexString = "#" + hexValue;
    console.log(hexString)
    return hexString;
}