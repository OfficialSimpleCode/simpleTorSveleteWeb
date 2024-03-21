import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
import { redirect } from "@sveltejs/kit";

export const load = async () => {
  if (!VerificationHelper.GI().needToSignUp) {
    redirect(303, `/login`);
  }
};
