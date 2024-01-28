<script>
  import Logo from "$lib/components/Logo.svelte";
  import { isAppleUser } from "$lib/consts/platform";
  import { businessStore } from "$lib/stores/Business";
  import { translate } from "$lib/utils/translate";
  import FooterSocialIcons from "../components/FooterSocialIcons.svelte";

  function downloadSimpleTor() {
    const dynamicLink = $businessStore.dynamicLink;

    // Check if dynamicLink is empty
    if (dynamicLink) {
      window.open(dynamicLink, "_blank");
    } else {
      // Define the links
      const iosLink = "itms-apps://itunes.apple.com/app/id6444347892";
      const androidLink =
        "market://details?id=com.simpletor.management_system_app";
      const webLink =
        "https://play.google.com/store/apps/details?id=com.simpletor.management_system_app";

      // Choose the appropriate link based on the platform
      const storeLink = isAppleUser() ? iosLink : androidLink;

      // If it's neither iOS nor Android, assume it's a web link
      const finalLink = isAppleUser() || dynamicLink ? storeLink : webLink;

      window.open(finalLink, "_blank");
    }
  }
</script>

<!-- top footer -->
<footer class="footer p-10 bg-base-200 text-base-content">
  <!-- services -->
  <nav>
    <header class="footer-title">
      {translate("treatments").toLocaleUpperCase()}
    </header>
    <button on:click={downloadSimpleTor} class="link link-hover"
      >{translate("queueSystem")}</button
    >
    <button class="link link-hover">{translate("systemsDevelopment")}</button>
  </nav>

  <!-- comany -->
  <nav>
    <header class="footer-title">
      {translate("company").toLocaleUpperCase()}
    </header>
    <a
      target="_blank"
      href="https://officialsimplecode.github.io/SimpleCodeWeb/"
      class="link link-hover">{translate("companySite")}</a
    >
  </nav>

  <!-- legal -->
  <nav>
    <header class="footer-title">
      {translate("legal").toLocaleUpperCase()}
    </header>
    <a href="https.google.com" target="_blank" class="link link-hover"
      >{translate("term")}</a
    >
    <a href="https.google.com" target="_blank" class="link link-hover"
      >{translate("policy")}</a
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
    <p>{translate("ourCompanyName")}<br />{translate("createdBySimpleTor")}</p>
  </aside>

  <!-- download simple tor app -->
  <button
    on:click={downloadSimpleTor}
    class="btn lg:btn-lg bg-primary btn-primary flex items-center justify-center"
  >
    {translate("downloadSimpleTor")}
  </button>

  <!-- social links -->
  <FooterSocialIcons></FooterSocialIcons>
</footer>
