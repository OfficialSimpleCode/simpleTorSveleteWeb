<script lang="ts">
  import { createEventDispatcher } from "svelte";

  interface FAQItem {
    question: string;
    answer: string;
    isOpen: boolean;
  }

  const faqs: FAQItem[] = [
    {
      question: "Anim pariatur cliche reprehenderit?",
      answer:
        "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
      isOpen: false,
    },
    {
      question: "Non cupidatat skateboard dolor brunch?",
      answer:
        "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
      isOpen: false,
    },
    {
      question:
        "Praesentium voluptatibus temporibus consequatur non aspernatur?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit optio vitae inventore autem fugiat rerum sed laborum. Natus recusandae laboriosam quos pariatur corrupti id dignissimos deserunt, praesentium voluptatibus temporibus consequatur non aspernatur laborum rerum nemo dolorem libero inventore provident exercitationem sunt totam aperiam. Facere sunt quos commodi obcaecati temporibus alias amet! Quam quisquam laboriosam quae repellendus non cum adipisci odio?",
      isOpen: false,
    },
  ];

  let dispatch = createEventDispatcher();

  const toggleFAQ = (index: number) => {
    faqs[index].isOpen = !faqs[index].isOpen;
  };

  export { faqs, toggleFAQ };
</script>

<!-- Container for demo purpose -->
<div class="container my-24 mx-auto md:px-6 xl:px-24">
  <!-- Section: Design Block -->
  <section class="mb-32">
    <h2 class="mb-6 pl-6 text-3xl font-bold">Frequently asked questions</h2>

    <div id="accordionFlushExample">
      {#each faqs as faq, index}
        <div
          class="rounded-none border border-t-0 border-l-0 border-r-0 border-neutral-200"
        >
          <h2 class="mb-0" id={"flush-heading" + index}>
            <button
              class="group relative flex w-full items-center rounded-none border-0 py-4 px-5 text-left text-base font-bold transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [{faqs[
                index
              ].isOpen
                ? 'text-primary'
                : ''}] [{faqs[index].isOpen
                ? 'box-shadow:inset_0_-1px_0_rgba(229,231,235)'
                : ''}] dark:[{faqs[index].isOpen ? 'text-primary-400' : ''}]"
              type="button"
              on:click={() => toggleFAQ(index)}
              aria-expanded={faq.isOpen}
              aria-controls={"flush-collapse" + index}
            >
              {faq.question}
              <span
                class="ml-auto h-5 w-5 shrink-0 rotate-[180deg] fill-[#336dec] transition-transform duration-200 ease-in-out [{!faqs[
                  index
                ].isOpen
                  ? 'group-[rotate-0]'
                  : ''}] [{!faqs[index].isOpen
                  ? 'group-[fill-[#212529]]'
                  : ''}] dark:[{!faqs[index].isOpen
                  ? 'fill-[#8FAEE0]'
                  : ''}] dark:[{!faqs[index].isOpen
                  ? 'group-[fill-[#eee]]'
                  : ''}]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </span>
            </button>
          </h2>
          <div
            id={"flush-collapse" + index}
            class="{[faq.isOpen ? '!visible' : 'hidden']} border-0"
            aria-labelledby={"flush-heading" + index}
            data-te-parent="#accordionFlushExample"
          >
            <div class="py-4 px-5 text-neutral-500 dark:text-neutral-300">
              {faq.answer}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>
  <!-- Section: Design Block -->
</div>
<!-- Container for demo purpose -->
