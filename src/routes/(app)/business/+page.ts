import { redirect } from "@sveltejs/kit";

export const load = async () => {
  redirect(303, `/business/amit-fit`);
};
