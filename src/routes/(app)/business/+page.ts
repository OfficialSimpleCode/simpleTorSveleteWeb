import { redirect } from "@sveltejs/kit";

export const load = async () => {
  redirect(303, `/your-repo-name/business/amit-fit`);
};
