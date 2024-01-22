<script lang="ts">
    import { locale, _ } from "svelte-i18n";
    export let languages: Array<Record<string, string>>;

    function chooseLang(language: Record<string, string>) {
        locale.set(language.locale);
    }
</script>

<svelte:document />

<ul
    class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box max-w-sm translate-x-24 sm:translate-x-12 min-w-[180px] py-4"
>
    {#each languages as language, i}
        <li>
            <div
                role="button"
                tabindex="0"
                class="flex items-center justify-between"
                on:click={() => chooseLang(language)}
                on:keypress={() => chooseLang(language)}
            >
                {$_(language.name)}
                <img class="w-9 rounded" src={language.flag} alt="flag" />
            </div>
        </li>
    {/each}
</ul>
