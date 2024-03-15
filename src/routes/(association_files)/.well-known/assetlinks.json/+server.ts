import { json } from "@sveltejs/kit";

export async function GET() {
  return json([
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: "com.simpletor.management_system_app",
        sha256_cert_fingerprints: [
          "8B:89:1F:A5:A1:46:DF:CF:D5:5C:9A:92:3F:B3:76:85:1A:C8:C2:3B:01:B3:AF:F6:16:CA:16:52:44:12:14:9B",
          "14:0C:66:5A:6B:76:CA:3B:9A:DA:CA:CF:75:08:4E:7C:47:B3:A3:3D:64:75:85:78:11:3C:0A:CC:CF:F1:4C:C7",
          "DA:F5:14:55:7E:7F:B8:FC:30:55:97:EF:CA:79:57:C7:D7:CC:A5:44:A7:F6:C3:EE:43:07:4E:4D:A6:4E:3C:8F",
          "6F:33:26:A0:B3:69:53:31:5D:FC:2E:37:C6:62:4D:82:9C:8C:24:AF:2B:04:10:BD:FA:F8:78:7F:46:01:D6:FC",
          "71:8D:B6:65:6E:24:F9:C6:C2:B4:70:D6:AB:65:F4:DE:D4:C1:90:D2:5E:A5:B8:FD:CD:8F:36:4D:50:58:2F:A9",
        ],
      },
    },
  ]);
}
