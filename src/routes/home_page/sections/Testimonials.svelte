<script lang="ts">
  import ArrowContainer from "../components/ArrowContainer.svelte";
  import ReviewContanier from "../components/ReviewContanier.svelte";

  let reviews: ReviewItem[] = [
    {
      name: "Shilo saadon",
      bio: "CEO",
      content:
        "ניהנתי ממש להשתמש באפליקציה עשתה לי המון סדר וכיף הגדן בגדןבןד בגןדבמגןדו בגדד גדהדכ הכ",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      name: "Amit saadon",
      bio: "CEO",
      content:
        "ניהנתי ממש להשתמש באפליקציה עשתה לי המון סדר וכיף הגדן בגדןבןד בגןדבמגןדו בגדד גדהדכ הכ",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      name: "Nerya saadon",
      bio: "CEO",
      content:
        "ניהנתי ממש להשתמש באפליקציה עשתה לי המון סדר וכיף הגדן בגדןבןד בגןדבמגןדו בגדד גדהדכ הכ",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      name: "Elis saadon",
      bio: "CEO",
      content:
        "ניהנתי ממש להשתמש באפליקציה עשתה לי המון סדר וכיף הגדן בגדןבןד בגןדבמגןדו בגדד גדהדכ הכ",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      name: "Ori saadon",
      bio: "CEO",
      content:
        "ניהנתי ממש להשתמש באפליקציה עשתה לי המון סדר וכיף הגדן בגדןבןד בגןדבמגןדו בגדד גדהדכ הכ",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      name: "Shira saadon",
      bio: "CEO",
      content:
        "ניהנתי ממש להשתמש באפליקציה עשתה לי המון סדר וכיף הגדן בגדןבןד בגןדבמגןדו בגדד גדהדכ הכ",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
  ];
  $: itemToDisplay = 0;

  function forwords() {
    $: itemToDisplay += 1;
  }

  function backwords() {
    if (itemToDisplay === 0) {
      $: itemToDisplay = reviews.length - 1;
    } else {
      $: itemToDisplay -= 1;
    }
  }
</script>

<section class="pb-24 bg-base-100 flex flex-col justify-center items-center">
  <div
    class="flex justify-centeitems-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 sm:max-w-2xl lg:max-w-[1200px] mx-4"
  >
    <div class="w-full lg:w-2/5">
      <!-- section title -->
      <span class="text-sm opacity-70 mb-4 block lg:text-start text-center"
        >הלקוחות שלנו</span
      >
      <!-- title -->
      <h2 class="text-4xl leading-[3.25rem] mb-8 lg:text-start text-center">
        23k+ לקוחות דירגו אותנו <span class="text-primary">בחנויות</span>
      </h2>

      <!-- Slider controls (arrows) -->
      <div class="flex items-center gap-4 lg:justify-start justify-center">
        <!--  -->
        <ArrowContainer onButtonClick={backwords} isBackwords={true} />
        <ArrowContainer onButtonClick={forwords} />
      </div>
    </div>

    <!-- reviews -->
    <div class="w-full lg:w-3/5">
      <!--Slider wrapper-->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <ReviewContanier reviewItem={reviews[itemToDisplay % reviews.length]} />
        <ReviewContanier
          reviewItem={reviews[(itemToDisplay + 1) % reviews.length]}
        />
      </div>
    </div>
  </div>
</section>
