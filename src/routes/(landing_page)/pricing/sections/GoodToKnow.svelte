<script>
  import InfoItem from "../components/InfoItem.svelte";
</script>

<section class="bg-base-100">
  <div class="container px-6 py-12 mx-auto">
    <!-- title and sub title -->
    <div>
      <h2 class="mt-2 text-2xl md:text-3xl">טוב לדעת</h2>

      <p class="mt-3 opacity-70">מידע שהיית שמח לדעת על החבילות שלנו</p>
    </div>

    <!-- info items -->
    <div
      class="grid grid-cols-1 xs:gap-8 gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <InfoItem
        title="29.90 כולל מע״מ"
        subTitle="עבור כל עובד נוסף שתרצה להוסיף לעסק בנוסף ליומן שמגיע בחינם עם כל חבילה שתרכוש"
        icon="clarity:employee-group-line"
        bg="bg-red-500"
      />
      <InfoItem
        title="תשלומים וקבלות"
        subTitle="ניתן להצטרף לקבלות ותשלומים מכל מנוי שתרכוש"
        icon="fluent:payment-20-filled"
        bg="bg-purple-500"
      />
      <InfoItem
        title="תשלום עצמאי"
        subTitle="הרכישה מתבצעת אופן עצמי כמו רכישה באפליקציה וניתן לבטל מתי שרוצים"
        icon="streamline:payment-cash-out-3"
        bg="bg-green-500"
      />
      <InfoItem
        title="כולל מע״מ"
        subTitle="כלל המחירים שלנו הם אחרי מע״מ ובלי הפתעות במעמד התשלום"
        icon="mdi:book-multiple"
        bg="bg-blue-500"
      />
      <InfoItem
        title="תקופת מתנה"
        subTitle="ניתן להתחיל להשתמש באפליקציה במנוי פרימיום לחודש חינם מבלי לבצע רכישה"
        icon="f7:gift-fill"
        bg="bg-pink-500"
      />
      <InfoItem
        title="ניסיון מנוי"
        subTitle="ברגע שתרכשו תקבלו תקופה של שבוע שבה לא תחוייבו, לא אהבתם? בטלו ולא תשלמו"
        icon="ri:contract-fill"
        bg="bg-yellow-500"
      />
    </div>
  </div>
</section>
