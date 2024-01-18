<script lang="ts">
    export let languages: Array<Record<string, string>>;

    function chooseLang(language: Record<string, string>) {}
</script>

<ul
    class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box max-w-sm translate-x-24 sm:translate-x-12 min-w-[150px] py-4"
>
    {#each languages as language}
        <li>
            <button on:click={() => chooseLang(language)}>
                {language.name}
            </button>
        </li>
    {/each}
</ul>
