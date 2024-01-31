<script>
  import Logo from "$lib/components/Logo.svelte";
  import { businessStore } from "$lib/stores/Business";
  import { downloadSimpleTor } from "$lib/utils/links_utils";
  import { _, translate } from "$lib/utils/translate";
  import FooterSocialIcons from "../components/FooterSocialIcons.svelte";

  const dynamicLink = $businessStore.dynamicLink;
</script>

<!-- top footer -->
<footer class="footer p-10 bg-base-200 text-base-content">
  <!-- services -->
  <nav>
    <header class="footer-title">
      {translate("treatments", $_).toLocaleUpperCase()}
    </header>
    <button
      on:click={() => downloadSimpleTor(dynamicLink)}
      class="link link-hover">{translate("queueSystem", $_)}</button
    >
    <button class="link link-hover"
      >{translate("systemsDevelopment", $_)}</button
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

  <!-- download simple tor app -->
  <button
    on:click={() => downloadSimpleTor(dynamicLink)}
    class="btn lg:btn-lg bg-primary btn-primary flex items-center justify-center"
  >
    {translate("downloadSimpleTor", $_)}
  </button>

  <!-- social links -->
  <FooterSocialIcons></FooterSocialIcons>
</footer>
