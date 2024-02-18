<script>
  import FeatureItem from "../components/FeatureItem.svelte";
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
        הפיצ'רים המרכזיים שלנו
      </h2>

      <!-- sub title -->
      <p
        class="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400"
      >
        המערכת כוללת מאות אפשריות שמאפשרות לך גמישות מיטבים וארגון לפי ההעדפות
        שלך, מהפיצ'רים האהובים ביותר שלנו
      </p>
    </div>

    <!-- features items -->
    <div
      class="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3"
    >
      <FeatureItem
        titleTransKey="הודעות ללקוחות"
        subTitleTransKey="המערכת שולחת הודעות ללקוחות על התורים שלהם, מתזכרת רותם לאשר הגעה ומזכירה להם לא לאחר"
      />
      <FeatureItem
        titleTransKey="סליקות וקבלות"
        subTitleTransKey="המערכת מאפשרת לסלוק את הלקוחות שלך ואף מנפיקה קבלות מאושרת כדין עבור כל עסקה או לפי בחירתך"
      />

      <FeatureItem
        titleTransKey="זמינות מכל מקום"
        subTitleTransKey="בנוסף לאפליקציה המערכת בונה עבורכם דף נחיתה מעוצב שאפשר להזמין ממנו תורים"
      />

      <FeatureItem
        titleTransKey="שירות לקוחות"
        subTitleTransKey="שירות לקוחות ומענה אנושי 24/7 עם זמן מענה ממוצע של פחות מ 3 דקות"
      />

      <FeatureItem
        titleTransKey="הגנה על הפרטיות"
        subTitleTransKey="המידע שלכם אינו נגיש לאף אחד פרט אליכם ובאפשרותכם למחוק את כל המידע בלחיצת כפתור"
      />

      <FeatureItem
        titleTransKey="תפוצה"
        subTitleTransKey="באפשרותם לשלוח הודעת תפוצה לכל הלקוחות שלכם בקליק"
      />
    </div>
  </div>
</section>
