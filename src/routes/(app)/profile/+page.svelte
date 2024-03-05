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
</script>

<svelte:head>
  <!-- business title -->
  <title
    >Simple Tor | ניהול תורים | מערכת לניהול תורים | {translate(
      "profile",
      $_
    )}</title
  >

  <!-- the url for search to display for this site -->
  <link rel="canonical" href={`${$page.url.origin}/profile`} />

  <!-- Open Graphes links -->
  <!-- title  -->
  <meta
    property="og:title"
    content="Simple Tor | ניהול תורים | מערכת לניהול תורים | {translate(
      'profile',
      $_
    )}"
  />
</svelte:head>

{#if $isConnectedStore === undefined}
  <div class="flex flex-col items-center justify-center h-full mb-[50px] w-50">
    <div class="loading loading-spinner"></div>
  </div>
{:else if $isConnectedStore === false}
  <div />
{:else}
  <div
    class="flex flex-col justify-start items-center gap-6 max-w-[800px] mx-auto pb-5"
  >
    <NameAndImage />

    <ProfileAttribute />

    <ProfileVerification />

    <GenderPicker onChanged={updateGender} pickedGender={$userStore.gender} />

    <AuthOptions />

    <ProfileAction />
  </div>
{/if}
