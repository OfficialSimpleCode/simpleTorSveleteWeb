<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";

  import GenderPicker from "$lib/components/pickers/gender_picker/GenderPicker.svelte";
  import type { Gender } from "$lib/consts/gender";

  import { page } from "$app/stores";
  import { ErrorsController } from "$lib/controllers/errors_controller";
  import UserHelper from "$lib/helpers/user/user_helper";
  import { isConnectedStore, userStore } from "$lib/stores/User";
  import { _, translate } from "$lib/utils/translate";
  import { onMount } from "svelte";
  import AuthOptions from "./components/AuthOptions.svelte";
  import NameAndImage from "./sections/NameAndImage.svelte";
  import ProfileAction from "./sections/ProfileAction.svelte";
  import ProfileAttribute from "./sections/ProfileAttribute.svelte";
  import ProfileVerification from "./sections/ProfileVerification.svelte";

  onMount(() => {
    isConnectedStore.subscribe((value) => {
      //redirect to the login page if the user is not connected

      if (value === false) {
        goto(`${base}/login`);
      }
    });
  });

  async function updateGender(newGender: Gender) {
    const resp = await UserHelper.GI().setGender(newGender);
    if (!resp) {
      ErrorsController.displayError();
    }
  }
  $: shimmerEffect = $isConnectedStore == null;
</script>

<svelte:head>
  <!-- business title -->
  <title
    >{translate("simpleTorWebTitle", $_)} | {translate("profile", $_)}</title
  >

  <!-- the url for search to display for this site -->
  <link rel="canonical" href={`${$page.url.origin}/profile`} />

  <!-- Open Graphes links -->
  <!-- title  -->
  <meta
    property="og:title"
    content="{translate('simpleTorWebTitle', $_)} | {translate('profile', $_)}"
  />
</svelte:head>

{#if $isConnectedStore === false}
  <!-- jump to login page on the script -->
  <div />
{:else}
  <div
    class="flex flex-col justify-start items-center gap-6 max-w-[800px] mx-auto pb-5"
  >
    <NameAndImage {shimmerEffect} />

    <ProfileAttribute {shimmerEffect} />

    <ProfileVerification {shimmerEffect} />
    <div class="w-[90%]">
      <GenderPicker
        onChanged={updateGender}
        pickedGender={$userStore.gender}
        {shimmerEffect}
      />
    </div>

    <AuthOptions {shimmerEffect} />

    <ProfileAction {shimmerEffect} />
  </div>
{/if}
