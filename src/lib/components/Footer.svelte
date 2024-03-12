<script lang="ts">
  import { base } from "$app/paths";
  import Logo from "$lib/components/Logo.svelte";
  import DownloadAppButton from "$lib/components/custom_components/DownloadAppButton.svelte";
  import ContactUsDialog from "$lib/components/dialogs/ContactUsDialog.svelte";
  import { simpleCodeWebUrl } from "$lib/consts/app_external_links";
  import { businessStore } from "$lib/stores/Business";
  import { pushDialog } from "$lib/utils/general_utils";
  import { getDownloadingAppLink } from "$lib/utils/links_utils";
  import { _, translate } from "$lib/utils/translate";
  import { onMount } from "svelte";
  import FooterSocialIcons from "../../routes/(app)/business/[businessEndPoint]/components/FooterSocialIcons.svelte";
  let contactUsDialog: HTMLDialogElement;
  let downloadLink = "";
  export let generatedPage: boolean = true;
  function openContactUs() {
    pushDialog(contactUsDialog);
  }

  // After the ui is loaded
  onMount(() => {
    downloadLink = getDownloadingAppLink($businessStore?.dynamicLink ?? "");
  });
</script>

<ContactUsDialog bind:dialog={contactUsDialog} />
<footer class="bg-base-200">
  <!-- top footer -->
  <div class="footer p-10 text-base-content">
    <!-- services -->
    <nav>
      <header class="footer-title">
        {translate("treatments", $_).toLocaleUpperCase()}
      </header>
      <a target="_blank" href={downloadLink} class="link link-hover"
        >{translate("queueSystem", $_)}</a
      >
      <p class="link link-hover">{translate("systemsDevelopment", $_)}</p>
      <button class="link link-hover" on:click={openContactUs}
        >{translate("ContactUs", $_)}</button
      >
    </nav>

    <!-- comany -->
    <nav>
      <header class="footer-title">
        {translate("company", $_).toLocaleUpperCase()}
      </header>
      <a target="_blank" href={simpleCodeWebUrl} class="link link-hover"
        >{translate("companySite", $_)}</a
      >
    </nav>

    <!-- legal -->
    <nav>
      <header class="footer-title">
        {translate("legal", $_).toLocaleUpperCase()}
      </header>
      <a href="{base}/terms-of-use" class="link link-hover"
        >{translate("termToUse", $_)}</a
      >
      <a href="{base}/privacy" class="link link-hover"
        >{translate("policy", $_)}</a
      >
    </nav>
  </div>

  <div class="h-[1px] mx-5 bg-base-300 bg-opacity-90 rounded-3xl mb-4"></div>
  <!-- bottom footer -->
  <div class="footer px-10 py-4 text-base-content border-base-300">
    <!-- logo and company details -->
    <aside class="items-center grid-flow-col {generatedPage ? '' : 'hidden'}">
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
  </div>
</footer>
