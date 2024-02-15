<script>
  import { userStore } from "$lib/stores/User";
  import { imageByGender } from "$lib/utils/images_utils";
  import { dateToDateStr } from "$lib/utils/times_utils";
  import { translate } from "$lib/utils/translate";

  import { Avatar } from "flowbite-svelte";
</script>

<section class="flex flex-col items-center">
  <Avatar small={true} ring={false} img={imageByGender($userStore.gender)} />
  <h1 class="text-xl mt-5">{$userStore.name}</h1>
  <h5 class="text-sm text-gray-500">
    {translate("since")}: {dateToDateStr($userStore.createdAt)}
  </h5>
</section>
