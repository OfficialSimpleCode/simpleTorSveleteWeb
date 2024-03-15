import { json } from "@sveltejs/kit";

export async function GET() {
  return json([
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: "com.simpletor.management_system_app",
        sha256_cert_fingerprints: [
          "14:0c:66:5a:6b:76:ca:3b:9a:da:ca:cf:75:08:4e:7c:47:b3:a3:3d:64:75:85:78:11:3c:0a:cc:cf:f1:4c:c7",
          "8b:89:1f:a5:a1:46:df:cf:d5:5c:9a:92:3f:b3:76:85:1a:c8:c2:3b:01:b3:af:f6:16:ca:16:52:44:12:14:9b",
          "da:f5:14:55:7e:7f:b8:fc:30:55:97:ef:ca:79:57:c7:d7:cc:a5:44:a7:f6:c3:ee:43:07:4e:4d:a6:4e:3c:8f",
          "6f:33:26:a0:b3:69:53:31:5d:fc:2e:37:c6:62:4d:82:9c:8c:24:af:2b:04:10:bd:fa:f8:78:7f:46:01:d6:fc",
          "71:8d:b6:65:6e:24:f9:c6:c2:b4:70:d6:ab:65:f4:de:d4:c1:90:d2:5e:a5:b8:fd:cd:8f:36:4d:50:58:2f:a9",
        ],
      },
    },
  ]);
}
