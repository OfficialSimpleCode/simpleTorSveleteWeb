<script>
  import FeatureItem from "../components/FeatureItem.svelte";
</script>

<section class="bg-base-100">
  <div
    id="features"
    class="relative block px-6 py-10 lg:py-28 md:py-10 md:px-10 border-t border-b border-neutral-900 bg-neutral-900/30"
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
      <h2 class="block w-full bg-gradient-to-b text-3xl sm:text-4xl">
        הפיצ'רים המרכזיים שלנו
      </h2>

      <!-- sub title -->
      <p
        class="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400"
      >
        ההמערכת כוללת מאות אפשרויות שנותנות לך שליטה מלאה על העסק, בחרנו עבורך
        את הפיצ'רים שהלקוחות שלנו הכי אוהבים
      </p>
    </div>

    <!-- features items -->
    <div
      class="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      <FeatureItem
        bg="bg-pink-500"
        icon="mdi:card-account-details-star"
        titleTransKey="מיתוג אישי"
        subTitleTransKey="אפשרויות עיצוב ומיתוג עסק נרחבות שיאפשרו לכם בניית דף עסק ייחודי בלי לשבור את הראש"
      />

      <FeatureItem
        bg="bg-green-500"
        icon="mdi:sms"
        titleTransKey="הודעות ללקוחות"
        subTitleTransKey="הלקוחות מקבלים הודעות ותזכורות ואפילו אפשר לשלוח הודעות תפוצה"
      />

      <FeatureItem
        bg="bg-blue-500"
        icon="mdi:electron-framework"
        titleTransKey="זמינות מכל מקום"
        subTitleTransKey="העסקים זמינים גם באתר וגם באפליקציה ואפילו אפשר למצוא אתכם בגוגל"
      />

      <FeatureItem
        bg="bg-indigo-700"
        icon="mdi:database"
        titleTransKey="לקוחות"
        subTitleTransKey="מאגר לקוחות עם מידע מפורט וסימון לקוחות נעדרים ומצטיינים"
      />

      <FeatureItem
        bg="bg-red-500"
        icon="mdi:payment"
        titleTransKey="סליקות וקבלות"
        subTitleTransKey="פתרונות סליקת לקוחות כולל הנפקת קבלות כחוק"
      />

      <FeatureItem
        bg="bg-yellow-500"
        icon="mdi:support"
        titleTransKey="שירות לקוחות"
        subTitleTransKey="אנו נותנים תמיכה ומענה אנושי 24/7 עם זמן תגובה ממוצע של פחות מ 3 דקות"
      />
    </div>
  </div>
</section>
