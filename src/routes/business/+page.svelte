<script lang="ts">
  import { goto, pushState } from "$app/navigation";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import { Icon, MapPin, Share } from "svelte-hero-icons";
  import { _ } from "svelte-i18n";
// Models
  import type { ProductModel } from "$lib/models/business/ProductModel";

  // Components
  import Avatar from "$lib/components/Avatar.svelte";
  import NavigationDialog from "$lib/components/NavigationDialog.svelte";
  import ImageDisplayDialog from "./components/ImageDisplayDialog.svelte";
  import ShareDialog from "./components/ShareDialog.svelte";
  import SocialLinks from "./components/SocialLinks.svelte";
// other (utils / stores)
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import { businessStore } from "$lib/stores/Business.js";
  import { isConnectedStore } from "$lib/stores/User";
  import { workersStore } from "$lib/stores/Workers.js";
  import Footer from "./components/Footer.svelte";

  let workersStories: Map<string, string> = Object.values($workersStore)
    .map((w) => w.storyImages)
    .reduce(
      (result, currentMap) => new Map([...result, ...currentMap]),
      new Map()
    );
  let storyHearts: Map<string, number> = Object.values($workersStore)
    .map((w) => w.storylikesAmount)
    .reduce(
      (result, currentMap) =>
        new Map([...result, ...Object.entries(currentMap)]),
      new Map()
    );
  let products: Map<string, ProductModel> = $businessStore.design.products;

  onMount(() => {
    // console.log($business);
    // document.documentElement.style.setProperty(
    //     "--p",
    //     hexToXyY(
    //         numberToHex(
    //             Object.values($business.design.businessThemes)[0].primary,
    //         ),
    //     ),
    // );
    // document.documentElement.style.setProperty(
    //     "--b1",
    //     hexToXyY(
    //         numberToHex(
    //             $business.design.businessThemes[
    //                 "7c123ea0-3b35-11ee-8d1b-954dea4c29c7"
    //             ].background,
    //         ),
    //     ),
    // );
    // document.documentElement.style.setProperty(
    //     "--pc",
    //     hexToXyY("#ffadff2f"),
    // );
  });

  // Dialogs
  let shareDialog: HTMLDialogElement;
  let imageDisplayDialog: HTMLDialogElement;
  let navigationDialog: HTMLDialogElement;

  let selectedStoryId: string = Object.keys(workersStories)[0] || "";

  let screenHeight = window.innerHeight;
  const storyImagesRatioX = 9;
  const storyImagesRatioY = 16;

  $: storyImagesHeigth = Math.floor(Math.max(screenHeight * 0.4, 320));
  $: storyImagesWidth = Math.floor(
    storyImagesHeigth * (storyImagesRatioX / storyImagesRatioY)
  );

  function orderNow() {
    if (!$isConnectedStore) {
      goto(`${base}/login`);
    }

    goto(`${base}/business/order`);
  }

  function openNavigationDialog() {
    pushState("", {
      showModal: true,
    });
    setTimeout(() => navigationDialog.showModal(), 100);
  }

  function openImageDisplayDialog(storyId: string) {
    selectedStoryId = storyId;
    pushState("", {
      showModal: true,
    });
    setTimeout(() => imageDisplayDialog.showModal(), 100);
  }

  function openShareDialog() {
    pushState("", {
      showModal: true,
    });
    setTimeout(() => shareDialog.showModal(), 100);
  }

  // Update screenWidth on window resize
  window.addEventListener("resize", () => {
    screenHeight = window.innerHeight;

    storyImagesHeigth = Math.floor(Math.max(screenHeight * 0.4, 320));
    storyImagesWidth = Math.floor(
      storyImagesHeigth * (storyImagesRatioX / storyImagesRatioY)
    );

    console.log("screenHeight", screenHeight);
    console.log("storyImagesHeigth", storyImagesHeigth);
    console.log(`h-[${storyImagesHeigth}px]`, `w-[${storyImagesWidth}px]`);
  });
</script>

<!-- Dialogs -->
{#if $page.state.showModal}
  <ShareDialog
    bind:dialog={shareDialog}
    name={$businessStore.shopName}
    address={$businessStore.adress}
  />
  <ImageDisplayDialog
    bind:dialog={imageDisplayDialog}
    bind:storyId={selectedStoryId}
    {workersStories}
    {storyHearts}
  />
  <NavigationDialog bind:dialog={navigationDialog} />
{/if}

<main class="w-full h-full" style="">
  <Navbar />

  <!-- background image -->
  <img
    class="h-1/2 w-full object-cover"
    src={$businessStore.design.changingImages[0]}
    alt="backgroud"
  />

  <!-- content -->
  <div class="bg-base-100 min-h-1/2 w-full z-10">
    <div class="relative top-[-3rem] mx-6 sm:mx-16">
      <div
        id="profile-row"
        class="flex justify-between items-center gap-5 sm:gap-10"
      >
        <Avatar img={$businessStore.design.shopIconUrl} />

        <!-- Order now and Share buttons -->
        <div class="flex gap-5 items-center">
          <button class="btn btn-primary" on:click={orderNow}>
            {$_("setBooking")}
          </button>
          <button class="btn btn-primary" on:click={openShareDialog}>
            <Icon src={Share} size="26px" />
          </button>
        </div>
      </div>

      <!-- Name Geo and Social Links -->
      <div
        id="content"
        class="mt-4 flex flex-col items-start justify-start gap-3"
      >
        <!-- Name and Geo -->
        <div>
          <h1 class="text-4xl">{$businessStore.shopName}</h1>
          <button
            class="flex items-center gap-2 link link-neutral"
            on:click={openNavigationDialog}
          >
            <h4 class="text-lg">{$businessStore.adress}</h4>
            <Icon src={MapPin} size="20px" />
          </button>
        </div>

        <SocialLinks />

        <!-- Display images -->
        <div class="mt-10 bg-slate-200 w-full">
          <h1 class="text-center font-bold text-2xl py-8">Our Works</h1>
          <div
            class="w-full self-center flex items-center mt-1 justify-center gap-6 gap-y-6 flex-wrap py-4"
          >
            {#each workersStories as [storyId, image]}
              <button on:click={() => openImageDisplayDialog(storyId)}>
                <!-- h-[${storyImagesHeigth}px] w-[${storyImagesWidth}px] -->
                <img
                  class="object-cover md:h-[530px] md:w-[300px] h-[284px] w-[160px] rounded-xl hover:scale-[1.01]"
                  src={image}
                  alt="gym"
                />
              </button>
            {/each}
          </div>
        </div>

        <div
          class="w-full self-center mt-10 flex items-center justify-center gap-6 gap-y-6 flex-wrap py-4 bg-slate-400"
        >
          <h1 class="text-center font-bold text-2xl">Our Products</h1>
          {#each products as [productId, product], index (productId)}
            <div
              class="flex {index % 2 == 0
                ? 'md:flex-row'
                : 'md:flex-row-reverse'}  flex-col w-full justify-start items-center px-10"
            >
              <div class="card card-compact w-72 bg-base-100 shadow-xl">
                <figure>
                  <img src={product.imageUrl} alt={product.name} />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">{product.name}</h2>
                  <p>
                    {$_("price")}: {product.price}
                  </p>
                  <div class="card-actions justify-end">
                    <button
                      class="btn btn-primary"
                      on:click={() =>
                        goto(`${base}/business/product/${productId}`)}
                    >
                      {$_("details")}
                    </button>
                  </div>
                </div>
              </div>
              <p class="mx-6 py-4 text-xl max-w-56 dis hidden md:block">
                {product.description}
              </p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
  <Footer />
</main>
