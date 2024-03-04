<script lang="ts">
  import { base } from "$app/paths";
  import Avatar from "$lib/components/Avatar.svelte";
  import { containerRadius } from "$lib/consts/sizes";
  export let businessData: BusinessShortItem;
</script>

<!-- business container -->
<a
  href="{base}/business/{businessData.queryName}"
  class="
  flex flex-col justify-center {containerRadius} aspect-[5/4] bg-base-200 text-center shadow m-1 hover:scale-105 transform transition-transform duration-300"
  style="background-image: url({businessData.bannerImage}); background-size: cover; background-position: center;"
>
  <!-- cover image (the chnging images) -->
  <!-- <img
    class="object-cover -z-10"
    alt="business image"
    src="https://firebasestorage.googleapis.com/v0/b/managementsystemapp-c1fda.appspot.com/o/enviroments%2Fproduction%2F972-525656377--50ab63a0-a192-11ed-950c-3ba22fe40036%2Fimages%2FchangingImages%2FCHANGING_IMAGES9ac4be90-1a49-1e7c-9a62-4182543d2aa5.jpg?alt=media&token=968cf356-ef34-4d92-8838-c4522e6e0833"
  /> -->
  <!-- feature icon and the color around it -->
  <Avatar img={businessData.iconImage} />
  <div
    class="flex flex-col justify-center items-center backdrop-blur-2xl mx-auto px-3 my-2 {containerRadius}"
  >
    <!-- title -->
    <p class="my-1 text-white">{businessData.name}</p>
  </div>

  <!-- sub title
  <p class="my-4 mb-0 font-normal leading-relaxed tracking-wide opacity-70">
    {subTitleTransKey}
  </p> -->
</a>
