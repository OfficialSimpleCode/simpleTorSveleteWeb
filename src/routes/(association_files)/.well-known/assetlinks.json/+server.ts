import { json } from "@sveltejs/kit";

export async function GET() {
  return json([
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: "com.simpletor.management_system_app",
        sha256_cert_fingerprints: [
          "14:0C:66:5A:6B:76:CA:3B:9A:DA:CA:CF:75:08:4E:7C:47:B3:A3:3D:64:75:85:78:11:3C:0A:CC:CF:F1:4C:C7",
        ],
      },
    },
  ]);
}
