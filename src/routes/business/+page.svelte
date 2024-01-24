<script lang="ts">
    import { onMount } from "svelte";
    import { pushState } from "$app/navigation";
    import { base } from "$app/paths";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    import { _ } from "svelte-i18n";
    import { Icon, MapPin, Share } from "svelte-hero-icons";

    // Models
    import type { ProductModel } from "$lib/models/business/ProductModel";

    // Components
    import Navbar from "$lib/components/navbar/Navbar.svelte";
    import Avatar from "$lib/components/Avatar.svelte";
    import NavigationDialog from "$lib/components/NavigationDialog.svelte";
    import ImageDisplayDialog from "./components/ImageDisplayDialog.svelte";
    import ShareDialog from "./components/ShareDialog.svelte";
    import SocialLinks from "./components/SocialLinks.svelte";
    import Footer from "./components/Footer.svelte";

    // other (utils / stores)
    import { numberToHex, hexToXyY } from "$lib/utils/colors";
    import { business } from "$lib/stores/Business.js";
    import { workers } from "$lib/stores/Workers.js";

    let loggedIn: boolean = true;
    let workersStories: Map<string, string> = Object.values($workers)
        .map((w) => w.storyImages)
        .reduce(
            (result, currentMap) => new Map([...result, ...currentMap]),
            new Map(),
        );
    let storyHearts: Map<string, number> = Object.values($workers)
        .map((w) => w.storylikesAmount)
        .reduce(
            (result, currentMap) => new Map([...result, ...currentMap]),
            new Map(),
        );
    let products: Map<string, ProductModel> = $business.design.products;

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

    function orderNow() {
        if (!loggedIn) {
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
</script>

<!-- Dialogs -->
{#if $page.state.showModal}
    <ShareDialog
        bind:dialog={shareDialog}
        name={$business.shopName}
        address={$business.adress}
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
        src={$business.design.changingImages[0]}
        alt="backgroud"
    />

    <!-- content -->
    <div class="bg-base-100 min-h-1/2 w-full z-10">
        <div class="relative top-[-3rem] mx-6 sm:mx-16">
            <div
                id="profile-row"
                class="flex justify-between items-center gap-5 sm:gap-10"
            >
                <Avatar img={$business.design.shopIconUrl} />

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
                    <h1 class="text-4xl">{$business.shopName}</h1>
                    <button
                        class="flex items-center gap-2 link link-neutral"
                        on:click={openNavigationDialog}
                    >
                        <h4 class="text-lg">{$business.adress}</h4>
                        <Icon src={MapPin} size="20px" />
                    </button>
                </div>

                <SocialLinks />

                <!-- Display images -->
                <div
                    class="w-full self-center mt-10 flex items-center justify-center gap-6 gap-y-6 flex-wrap"
                >
                    {#each workersStories as [storyId, image]}
                        <button
                            on:click={() => openImageDisplayDialog(storyId)}
                        >
                            <img
                                class="object-cover h-[500px] w-[300px] rounded-xl hover:scale-[1.01]"
                                src={image}
                                alt="gym"
                            />
                        </button>
                    {/each}
                </div>

                <div
                    class="w-full self-center mt-10 flex items-center justify-center gap-6 gap-y-6 flex-wrap"
                >
                    {#each products as [productId, product]}
                        <div
                            class="card card-compact w-72 bg-base-100 shadow-xl"
                        >
                            <figure>
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                />
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
                                            goto(
                                                `${base}/business/product/${productId}`,
                                            )}
                                    >
                                        {$_("details")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
    <Footer />
</main>
