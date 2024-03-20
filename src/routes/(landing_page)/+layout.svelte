<script>
  import Footer from "$lib/components/Footer.svelte";
  import Navbar from "$lib/components/navbar/Navbar.svelte";
</script>

<Navbar />
<div class="pt-20">
  <slot />
</div>
<Footer />
