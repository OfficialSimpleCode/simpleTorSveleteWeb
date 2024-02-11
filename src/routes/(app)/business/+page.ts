import { redirect } from "@sveltejs/kit";

export const load = async () => {
  redirect(
    303,
    `/your-repo-name/business/972-525656377--50ab63a0-a192-11ed-950c-3ba22fe40036`
  );
};
