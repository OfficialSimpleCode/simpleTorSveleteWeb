<script lang="ts">
    import { Icon, MapPin, Phone, DocumentText } from "svelte-hero-icons";
    import type { IconSource } from "svelte-hero-icons";
    import { ShowToast } from "$lib/stores/ToastManager";
    import { business } from "$lib/stores/Business";

    // Assets
    import WhatsappLogo from "$lib/images/whatsapp.svg";
    import InsagramLogo from "$lib/images/instagram.svg";

    let socialLinks: Object = {
        call: `tel:${$business.shopPhone}`,
        instagram: $business.instagramAccount,
        whatsapp: `whatsapp://send?phone=${$business.shopPhone}`,
        maps: `https://www.google.com/maps/search/?api=1&query=${$business.adress}`,
        policy: $business.previewDoc,
    };

    let socialIcons: { [key: string]: string } = {
        whatsapp: WhatsappLogo,
        instagram: InsagramLogo,
    };
    let socialHeroIcons: { [key: string]: IconSource } = {
        call: Phone,
        maps: MapPin,
        policy: DocumentText,
    };

    function activateLink(link: string, name: string) {
        if (!link || link.length == 0) {
            ShowToast({
                text: `${name} link was not configured`,
                status: "fail",
            });
            return;
        }

        window.location.href = link;
    }
</script>

<!-- Social Links -->
<ul class="flex items-center gap-6 sm:gap-8">
    {#each Object.entries(socialLinks) as [name, link]}
        <div class="flex flex-col items-center">
            <button
                on:click={() => activateLink(link, name)}
                class="btn btn-ghost btn-square w-6 h-6 sm:w-10 sm:h-10"
            >
                {#if socialIcons[name]}
                    <img src={socialIcons[name]} alt={name} />
                {:else}
                    <Icon src={socialHeroIcons[name]} size="100%" />
                {/if}
            </button>
            <h5 class="text-sm text-gray-500 select-none">{name}</h5>
        </div>
    {/each}
</ul>
