import { redirect } from "@sveltejs/kit";
//all the end point that go with any endpoints that
//there is already load the profile from start
export const load = async () => {
  redirect(303, `/profile`);
};
