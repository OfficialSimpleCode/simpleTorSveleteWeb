<script>
  import DataItem from "../components/DataItem.svelte";
</script>

<section class="bg-base-100">
  <div
    id="features"
    class="relative block px-6 py-10 md:py-20 md:px-10 border-t border-b border-neutral-900 bg-neutral-900/30"
  >
    <!-- top text -->
    <div class="relative mx-auto max-w-5xl text-center">
      <!-- preview text -->
      <!-- <span
          class="text-gray-400 my-3 flex items-center justify-center font-medium uppercase tracking-wider"
        >
          למה דווקא אנחנו
        </span> -->

      <!-- title -->
      <h2
        class="block w-full bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl"
      >
        הניסיון שלנו
      </h2>

      <!-- sub title -->
      <p
        class="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400"
      >
        מערכת יציבה שלא תעסיק אותך, הישאר חפשי לעסוק במה שאתה אוהב במקום בלתקן
        בעיות במערכות שלך
      </p>
    </div>

    <!-- features items -->
    <div
      class="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 xs:grid-cols-2 lg:grid-cols-3"
    >
      <DataItem titleTransKey="1M+" subTitleTransKey="הזמנות שונות" />
      <DataItem titleTransKey="10K" subTitleTransKey="בעלי עסקים" />
      <DataItem titleTransKey="128" subTitleTransKey="מדינות שונות" />
    </div>
  </div>
</section>
