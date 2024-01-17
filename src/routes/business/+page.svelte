<script lang="ts">
    import { pushState } from "$app/navigation";
    import { base } from "$app/paths";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    import { Icon, MapPin, Share } from "svelte-hero-icons";

    import type BusinessModel from "$lib/models/business/business_model";

    import Navbar from "$lib/components/Navbar.svelte";
    import Avatar from "../../lib/components/Avatar.svelte";
    import ImageDisplayDialog from "./components/ImageDisplayDialog.svelte";
    import ShareDialog from "./components/ShareDialog.svelte";
    import SocialLinks from "./components/SocialLinks.svelte";
	

    /** @type {import('./$types').PageData} */
    export let data;

    let loggedIn: boolean = true;
    let profile: Record<string, string> = data.profile;
    let name: string = data.name;
    let geo: Record<string, string> = data.geo;
    let socialLinks: Object = data.socialLinks;
    let displayImages: Array<Record<string, any>> = data.displayImages;
    let notifications: Array<Record<string, any>> = data.notifications;

    let businessData: BusinessModel = data.businessData;

    // Dialogs
    let shareDialog: HTMLDialogElement;
    let imageDisplayDialog: HTMLDialogElement;

    let selectedImageIndex: number = 0;

    function orderNow() {
        if (!loggedIn) {
            goto(`${base}/login`);
        }

        goto(`${base}/business/order`);
    }

    function openImageDisplayDialog(index: number) {
        selectedImageIndex = index;
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
    <ShareDialog bind:dialog={shareDialog} {name} {geo} />
    <ImageDisplayDialog
        bind:dialog={imageDisplayDialog}
        bind:index={selectedImageIndex}
        {displayImages}
    />
{/if}

<main class="w-full h-full">
    <Navbar {notifications} {loggedIn} {profile} />

    <!-- background image -->
    <img
        class="h-1/2 w-full object-cover"
        src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?cs=srgb&dl=action-athlete-barbell-841130.jpg&fm=jpg"
        alt="backgroud"
    />

    <!-- content -->
    <div class="bg-base-100 min-h-1/2 w-full z-10">
        <div class="relative top-[-3rem] mx-8 sm:mx-16">
            <div
                id="profile-row"
                class="flex justify-between items-center gap-10"
            >
                <Avatar />

                <!-- Order now and Share buttons -->
                <div class="flex gap-5 items-center">
                    <button class="btn btn-primary" on:click={orderNow}>
                        Make an Appointment
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

                <SocialLinks {socialLinks} />

                <!-- Display images -->
                <div
                    class="w-full self-center mt-10 flex items-center justify-center gap-6 gap-y-6 flex-wrap"
                >
                    {#each displayImages as image, index}
                        <button on:click={() => openImageDisplayDialog(index)}>
                            <img
                                class="object-cover h-[500px] w-[300px] rounded-xl hover:scale-[1.01]"
                                src={image.link}
                                alt="gym"
                            />
                        </button>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</main>
