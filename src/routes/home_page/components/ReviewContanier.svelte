<script lang="ts">
  import { containerRadius } from "$lib/consts/sizes";
  import { _, translate } from "$lib/utils/translate";

  export let reviewItem: ReviewItem;
</script>

<!-- the container -->
<div
  class="group bg-base-300 {containerRadius} hover:scale-105 transform transition-transform duration-300 max-sm:max-w-sm max-sm:mx-auto p-6"
>
  <div class="flex items-center gap-3 mb-5 sm:mb-9">
    <!-- avator of the user -->
    <img
      class="rounded-full object-cover w-10 h-10"
      src={reviewItem.imageUrl}
      alt={translate("theProfileOfTemplate", $_).replace(
        "NAME",
        reviewItem.name
      )}
    />

    <!-- name and bio -->
    <div class="grid">
      <h5 class="transition-all duration-500">{reviewItem.name}</h5>
      <span class="text-sm leading-6 opacity-70">{reviewItem.bio}</span>
    </div>
  </div>

  <!-- stars bar -->
  <div
    class="flex items-center mb-5 sm:mb-9 gap-2 text-amber-500 transition-all duration-500"
  >
    <!-- display each star -->
    {#each [1, 2, 3, 4, 5] as _}
      <div>
        <svg
          class="w-5 h-5"
          viewBox="0 0 18 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    {/each}
  </div>

  <!-- review text -->
  <p
    class="text-smtransition-all duration-300 group-hover:opacity-100 opacity-70"
  >
    {translate(reviewItem.content, $_)}
  </p>
</div>
