import { json } from "@sveltejs/kit";

export async function GET() {
  return json({
    applinks: {
      apps: [],
      details: [
        {
          appID: "FRATU2Z5DZ.com.simplecode.managementSystemApp",
          paths: ["*"],
        },
      ],
    },
  });
}
