<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import Logo from "$lib/components/Logo.svelte";
  import DownloadAppButton from "$lib/components/custom_components/DownloadAppButton.svelte";
  import ContactUsDialog from "$lib/components/dialogs/ContactUsDialog.svelte";
  import { simpleCodeWebUrl } from "$lib/consts/app_external_links";
  import { pushDialog } from "$lib/utils/general_utils";
  import { _, translate } from "$lib/utils/translate";
  import FooterSocialIcons from "../../routes/(app)/business/[businessEndPoint]/components/FooterSocialIcons.svelte";
  let contactUsDialog: HTMLDialogElement;

  function openContactUs() {
    pushDialog(contactUsDialog);
  }
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
      <a class="link link-hover" href="/">{translate("queueSystem", $_)}</a>
      <!-- <p class="link link-hover">{translate("systemsDevelopment", $_)}</p> -->
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
      <a href="{base}/pricing" class="link link-hover"
        >{translate("pricing", $_)}</a
      >
      <a href="{base}/contact-us" class="link link-hover"
        >{translate("sales", $_)}</a
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
    <aside class="items-center grid-flow-col">
      <Logo />

      <p>
        {"SA SIMPLE CODE LTD"}<br />
        <span
          class="{$page.url.pathname.includes('business')
            ? ''
            : 'hidden'} opacity-70"
        >
          {translate("createdBySimpleTor", $_)}
        </span>
      </p>
    </aside>

    <DownloadAppButton />

    <!-- social links -->
    <FooterSocialIcons />
  </div>
</footer>
