<script lang="ts">
    import { _ } from "svelte-i18n";
    import { Icon, ChevronRight } from "svelte-hero-icons";
    import { page } from "$app/stores";
    import { business } from "$lib/stores/Business.js";
    import { ProductModel } from "$lib/models/business/product_model";

    let product: ProductModel = $business.design.products.get(
        $page.params.slug,
    )!;
</script>

<main class="h-full w-full">
    <div
        class="flex flex-row items-center justify-between w-full min-h-16 px-4 box-border"
    >
        <span class="w-[60px]"></span>
        <h1 class="font-bold">{product.name}</h1>
        <button class="btn btn-ghost" on:click={() => history.back()}>
            <Icon src={ChevronRight} size="26px" />
        </button>
    </div>
    <div class="h-[calc(100%-4rem)] w-full">
        <div class="relative h-full max-h-[50%]">
            <img
                class="h-full object-cover w-full"
                src={product.imageUrl}
                alt={product.name}
            />
            <span
                class="badge badge-neutral badge-lg absolute bottom-4 right-4 text-lg"
                >{product.price}</span
            >
        </div>
        <div class="max-h-[50%]">
            <h2 class="text-xl">{product.description}</h2>
        </div>
    </div>
    <button
        class="btn btn-outline fixed bottom-4 right-[calc(50%-100px)] min-w-[200px]"
        on:click={() => history.back()}
    >
        {$_("back")}
    </button>
</main>
