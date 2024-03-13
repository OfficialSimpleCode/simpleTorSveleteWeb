<script>
  import PricingCard from "../components/PricingCard.svelte";
</script>

<section class="bg-base-200">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    <!-- title and sub title -->
    <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
      <h2 class="mb-4 text-4xl font-extrabold">נסו את המערכת שלנו בחינם</h2>
      <div class="mb-5 sm:text-xl">
        <p class="opacity-70">
          מסלולים מותאמים לכל סוגי העסקים בין אם אתה עסק מתחיל או ותיק.
        </p>
        <!-- <span class="font-extrabold">המחירים הינם סופיים לתשלום לאחר מע״מ</span> -->
      </div>
    </div>
    <!-- items grid -->
    <div
      class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0"
    >
      <PricingCard
        title="בסיסי"
        sunTitle="לעסקים מתחילים - יומן שירכז לכם את הפגישות בצורה מסודרת ונוחה"
        price={59.9}
        isFirst
        includesList={[
          "37 ימים ראשונים בחינם",
          "ללא הגבלת תורים",
          "הוספת לקוחות מאנשי קשר",
          "התראות תפוצה ללקוחות ללא הגבלה",
          "אישורי הגעה",
          "מיתוג אישי לעמוד העסק כולל דף נחיתה שנבנה אוטומטי",
          "יומן דיגיטלי המתעדכן בזמן אמת ללא רענונים",
          "סטטסיטקות ודוחות",
          "גישה מהמחשב ומהאפליקציה",
        ]}
      />
      <!-- Pricing Card -->
      <PricingCard
        title="פרימיום"
        sunTitle="עסקים גדולים - מערכת ניהול תורים שתשלח הודעות ותזכורות ללקוחות"
        price={79.9}
        bestSeller
        includesList={[
          "רשימות המתנה",
          "ללא הגבלת לקוחות",
          "200 הודעות בחודש",
          "יומן דיגיטלי",
          "קביעת תורים און-ליין",
          "אישורי הגעה",
          "סטטסיטקות ודוחות",
          "גישה מהמחשב ומהאפליקציה",
          "שליחת הודעות תפוצה",
          "רשימת המתנה",
          "כלי שיווק מתקדמים",
        ]}
      />
      <!-- Pricing Card -->
      <PricingCard
        title="גולדן"
        sunTitle="עסקים ברמה אחרת - לקיחת העסק שלב קדימה עם מיתוג אישי וקבלת לקוחות חדשים"
        price={239.9}
        includesList={[
          "1000 הודעות בחודש",
          "ממשק קופה",
          "חשבוניות וקבלות",
          "ניהול כרטיסיות ומנויים",
          "שליחת בקשות תשלום",
          "אשראי, Apple Pay ו Bit",
          "דמי ביטול ומקדמות",
          "שליחת מסמכים לרואה חשבון",
          "ניהול מוצרים ומלאי",
        ]}
      />
    </div>
  </div>
</section>
