<script lang="ts">
    import { onMount } from "svelte";
    import { pushState } from "$app/navigation";
    import { base } from "$app/paths";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    import { _ } from "svelte-i18n";
    import { Icon, MapPin, Share } from "svelte-hero-icons";

    import { numberToHex, hexToXyY } from "$lib/utils/colors";
    import { business } from "$lib/stores/Business.js";
    import { workers } from "$lib/stores/Workers.js";
    import type { ProductModel } from "$lib/models/business/ProductModel";

    import Navbar from "$lib/components/navbar/Navbar.svelte";
    import Avatar from "$lib/components/Avatar.svelte";
    import ImageDisplayDialog from "./components/ImageDisplayDialog.svelte";
    import ShareDialog from "./components/ShareDialog.svelte";
    import SocialLinks from "./components/SocialLinks.svelte";

    let loggedIn: boolean = true;
    let geo: Record<string, string> = {
        title: $business.adress,
        link: "https://blabla.com",
    };
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

    let selectedStoryId: string = Object.keys(workersStories)[0] || "";

    function orderNow() {
        if (!loggedIn) {
            goto(`${base}/login`);
        }

        goto(`${base}/business/order`);
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
    <ShareDialog bind:dialog={shareDialog} name={$business.shopName} {geo} />
    <ImageDisplayDialog
        bind:dialog={imageDisplayDialog}
        bind:storyId={selectedStoryId}
        {workersStories}
        {storyHearts}
    />
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
                    <h1 class="text-4xl">{name}</h1>
                    <a
                        href={geo.link}
                        class="flex items-center gap-2 link link-neutral"
                    >
                        <h4 class="text-lg">{geo.title}</h4>
                        <Icon src={MapPin} size="20px" />
                    </a>
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
    <footer class="footer items-center p-4 bg-base-100 text-base-content">
        <aside class="items-center grid-flow-col">
            <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
                class="fill-current"
                ><path
                    d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
                ></path></svg
            >
            <p>Copyright © 2024 - All right reserved</p>
        </aside>
        <nav
            class="grid-flow-col gap-4 md:place-self-center md:justify-self-end"
        >
            <a
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    class="fill-current"
                    ><path
                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                    ></path></svg
                >
            </a>
            <a
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    class="fill-current"
                    ><path
                        d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                    ></path></svg
                ></a
            >
            <a
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    class="fill-current"
                    ><path
                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                    ></path></svg
                ></a
            >
        </nav>
    </footer>
</main>
