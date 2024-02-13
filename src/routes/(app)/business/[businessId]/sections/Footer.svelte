<script lang="ts">
  import { page } from "$app/stores";
  import Logo from "$lib/components/Logo.svelte";
  import DownloadAppButton from "$lib/components/custom_components/DownloadAppButton.svelte";
  import ContactUsDialog from "$lib/components/dialogs/ContactUsDialog.svelte";
  import { businessStore } from "$lib/stores/Business";
  import { pushDialog } from "$lib/utils/general_utils";
  import { downloadSimpleTor } from "$lib/utils/links_utils";
  import { _, translate } from "$lib/utils/translate";
  import FooterSocialIcons from "../components/FooterSocialIcons.svelte";
  let contactUsDialog: HTMLDialogElement;

  function openContactUs() {
    pushDialog(contactUsDialog);
  }
</script>

{#if $page.state.showModal}
  <ContactUsDialog bind:dialog={contactUsDialog} />
{/if}
<!-- top footer -->
<footer class="footer p-10 bg-base-200 text-base-content">
  <!-- services -->
  <nav>
    <header class="footer-title">
      {translate("treatments", $_).toLocaleUpperCase()}
    </header>
    <button
      on:click={() => downloadSimpleTor($businessStore.dynamicLink)}
      class="link link-hover">{translate("queueSystem", $_)}</button
    >
    <button class="link link-hover"
      >{translate("systemsDevelopment", $_)}</button
    >
    <button class="link link-hover" on:click={openContactUs}
      >{translate("ContactUs", $_)}</button
    >
  </nav>

  <!-- comany -->
  <nav>
    <header class="footer-title">
      {translate("company", $_).toLocaleUpperCase()}
    </header>
    <a
      target="_blank"
      href="https://officialsimplecode.github.io/SimpleCodeWeb/"
      class="link link-hover">{translate("companySite", $_)}</a
    >
  </nav>

  <!-- legal -->
  <nav>
    <header class="footer-title">
      {translate("legal", $_).toLocaleUpperCase()}
    </header>
    <a href="https.google.com" target="_blank" class="link link-hover"
      >{translate("term", $_)}</a
    >
    <a href="https.google.com" target="_blank" class="link link-hover"
      >{translate("policy", $_)}</a
    >
  </nav>
</footer>

<!-- bottom footer -->
<footer
  class="footer px-10 border-t py-4 bg-base-200 text-base-content border-base-300"
>
  <!-- logo and company details -->
  <aside class="items-center grid-flow-col">
    <Logo />
    <p>
      {translate("ourCompanyName", $_)}<br />{translate(
        "createdBySimpleTor",
        $_
      )}
    </p>
  </aside>

  <DownloadAppButton />

  <!-- social links -->
  <FooterSocialIcons />
</footer>
