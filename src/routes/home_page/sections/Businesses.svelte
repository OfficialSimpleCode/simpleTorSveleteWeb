<script lang="ts">
  import BusinessItem from "../components/BusinessItem.svelte";
</script>

<section class="bg-gradient-to-r from-base-200 py-10 lg:py-28">
  <!-- title and sub-title -->
  <div class="flex flex-col justify-center items-center">
    <h2 class="text-2xl font-bold text-center sm:text-4xl">הדבר האמיתי</h2>
    <!-- sub title -->
    <p class="max-w-3xl mx-auto mt-4 text-center opacity-70">
      לחץ על העסקים השונים וקבל השראה לדף שלך
    </p>
  </div>

  <!-- business items -->
  <div class="flex flex-col">
    <div id="images" class="py-10 w-full sm:flex justify-end">
      <!-- items grid inside the list (The businesses) -->
      <div
        class=" mx-auto grid grid-cols-1 gap-10 py-3 xs:px-5 px-2 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-[1800px]"
      >
        <BusinessItem
          businessData={{
            bannerImage:
              "https://firebasestorage.googleapis.com/v0/b/managementsystemapp-c1fda.appspot.com/o/enviroments%2Fproduction%2F972-525656377--e3d50f10-82fa-11ee-8f1a-45e9b09c8181%2Fimages%2FchangingImages%2FCHANGING_IMAGES0b7ce240-82fb-11ee-bbad-858c5080afb3.jpg?alt=media&token=ae0656e4-0f37-480f-bd54-081327f98fff",
            iconImage:
              "https://firebasestorage.googleapis.com/v0/b/managementsystemapp-c1fda.appspot.com/o/enviroments%2Fproduction%2F972-525656377--e3d50f10-82fa-11ee-8f1a-45e9b09c8181%2Fimages%2Flogos%2FSHOPICONe4a88bb0-82fa-11ee-bbad-858c5080afb3.jpg?alt=media&token=4d375496-fbe2-4aab-a66a-d1c24f5c2d34",
            name: "Tal’s tattoo studio",
            queryName: "",
          }}
        />
        <BusinessItem
          businessData={{
            bannerImage:
              "https://firebasestorage.googleapis.com/v0/b/managementsystemapp-c1fda.appspot.com/o/enviroments%2Fproduction%2F972-542575216--ef8a3850-a1bc-11ed-beec-2359ad1c35c8%2Fimages%2FchangingImages%2FCHANGING_IMAGES7518fec0-ab27-11ed-915a-e3c166b130b5.jpg?alt=media&token=32ec0810-6da4-4820-8e55-c4efa89cc9ba",
            iconImage:
              "https://firebasestorage.googleapis.com/v0/b/managementsystemapp-c1fda.appspot.com/o/enviroments%2Fproduction%2F972-542575216--ef8a3850-a1bc-11ed-beec-2359ad1c35c8%2Fimages%2Flogos%2FSHOPICON78c7e310-a1bd-11ed-beec-2359ad1c35c8.jpg?alt=media&token=52aabfb2-e332-4e7c-99f3-e3543cc9edc6",
            name: "•Nails By Elis•",
            queryName: "",
          }}
        />

        <BusinessItem
          businessData={{
            bannerImage:
              "https://firebasestorage.googleapis.com/v0/b/managementsystemapp-c1fda.appspot.com/o/enviroments%2Fproduction%2F972-584100067--e1a0fc00-011c-11ee-8eab-e3a679a02681%2Fimages%2FchangingImages%2FCHANGING_IMAGES530fa5f0-02d8-11ee-8a4e-91c9e0d92d89.jpg?alt=media&token=d114270d-5cd4-46bc-826f-9474bd48da13",
            iconImage:
              "https://firebasestorage.googleapis.com/v0/b/managementsystemapp-c1fda.appspot.com/o/enviroments%2Fproduction%2F972-584100067--e1a0fc00-011c-11ee-8eab-e3a679a02681%2Fimages%2Flogos%2FSHOPICONe8cb6560-011c-11ee-8eab-e3a679a02681.jpg?alt=media&token=4e6ef41b-4591-4659-85d1-22ab9b58955b",
            name: "men studio",
            queryName: "",
          }}
        />

        <BusinessItem
          businessData={{
            bannerImage:
              "https://firebasestorage.googleapis.com/v0/b/managementsystemapp-c1fda.appspot.com/o/enviroments%2Fproduction%2F972-504040624--bc2db320-a666-11ed-bd96-25918a6dd7b8%2Fimages%2FchangingImages%2FCHANGING_IMAGES6d5e91f0-a667-11ed-bd96-25918a6dd7b8.jpg?alt=media&token=741fc090-2b2b-4c36-8467-a07f4185626a",
            iconImage:
              "https://firebasestorage.googleapis.com/v0/b/managementsystemapp-c1fda.appspot.com/o/enviroments%2Fproduction%2F972-504040624--bc2db320-a666-11ed-bd96-25918a6dd7b8%2Fimages%2Flogos%2FSHOPICONf87278c0-a666-11ed-bd96-25918a6dd7b8.jpg?alt=media&token=f42d9927-788c-4307-b853-b4d319596f31",
            name: "BarberShop",
            queryName: "",
          }}
        />

        <BusinessItem
          businessData={{
            bannerImage:
              "https://firebasestorage.googleapis.com/v0/b/managementsystemapp-c1fda.appspot.com/o/enviroments%2Fproduction%2F972-525656377--c677a4c0-5238-11ee-aa37-2545496c0795%2Fimages%2FchangingImages%2FCHANGING_IMAGES19feda50-5239-11ee-878a-2329a73c8a3b.jpg?alt=media&token=190fb45c-f408-4a7f-be95-aa57557a78b3",
            iconImage:
              "https://firebasestorage.googleapis.com/v0/b/managementsystemapp-c1fda.appspot.com/o/enviroments%2Fproduction%2F972-525656377--c677a4c0-5238-11ee-aa37-2545496c0795%2Fimages%2Flogos%2FSHOPICONc73835a0-5238-11ee-878a-2329a73c8a3b.jpg?alt=media&token=545def62-046d-4c06-bbc8-49f5854b2e5d",
            name: "Foddie",
            queryName: "",
          }}
        />

        <BusinessItem
          businessData={{
            bannerImage:
              "https://firebasestorage.googleapis.com/v0/b/managementsystemapp-c1fda.appspot.com/o/enviroments%2Fproduction%2F972-525656377--746a8b30-7a3c-11ee-891d-cf2ba9a71a2f%2Fimages%2FchangingImages%2FCHANGING_IMAGESbba39370-7a3c-11ee-9ca6-cb51c2fc8d99.jpg?alt=media&token=ae441329-a0bf-4747-8134-e9f238cf2e34",
            iconImage:
              "https://firebasestorage.googleapis.com/v0/b/managementsystemapp-c1fda.appspot.com/o/enviroments%2Fproduction%2F972-525656377--746a8b30-7a3c-11ee-891d-cf2ba9a71a2f%2Fimages%2Flogos%2FSHOPICON755d76b0-7a3c-11ee-9ca6-cb51c2fc8d99.jpg?alt=media&token=16c1681b-99c6-45ad-a7fc-5f97260004ae",
            name: "שירי ביוטי",
            queryName: "",
          }}
        />
      </div>
    </div>
  </div>
</section>
