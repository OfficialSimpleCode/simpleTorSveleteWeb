<script lang="ts">
    import { page } from "$app/stores";

    import SearchBusiness from "$lib/components/SearchBusiness.svelte";

    let title: string = "NotFoundBusiness";
    if ($page.status == 404) {
        title = "NotFoundBusiness";
    }
</script>

<SearchBusiness titleKey={title} />
