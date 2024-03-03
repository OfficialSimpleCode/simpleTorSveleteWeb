<script lang="ts">
  export let isBackwords: boolean = false;
  export let onButtonClick: () => void;
</script>

<button
  on:click={onButtonClick}
  id="slider-button-left"
  class="slider-button group flex justify-center items-center border border-solid border-primary w-12 h-12 transition-all duration-500 rounded-lg hover:bg-primary"
  data-carousel-prev
>
  <svg
    class="h-6 w-6 text-primary group-hover:text-white {isBackwords
      ? 'rotate-0 rtl:rotate-180'
      : 'rotate-180 rtl:rotate-0'}"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.9999 12L4.99992 12M9.99992 6L4.70703 11.2929C4.3737 11.6262 4.20703 11.7929 4.20703 12C4.20703 12.2071 4.3737 12.3738 4.70703 12.7071L9.99992 18"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</button>
