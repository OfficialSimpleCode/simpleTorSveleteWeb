<script lang="ts">
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import Avatar from "$lib/components/Avatar.svelte";
    import InfoCircle from "$lib/components/InfoCircle.svelte";
    import { Gender } from "$lib/consts/gender";
    import Google from "$lib/images/google.svg";
    import UserInitializer from "$lib/initializers/user_initializer";
    import { userStore } from "$lib/stores/User";
    import { dateToDateStr } from "$lib/utils/times_utils/times_utils";
    import {
      ArrowRightOnRectangle,
      ChevronRight,
      Envelope,
      HandThumbDown,
      HandThumbUp,
      Icon,
      Identification,
      Moon,
      Phone,
      Plus,
      Trash,
      User,
      XCircle,
    } from "svelte-hero-icons";
    import { _ } from "svelte-i18n";
    import InfoTooltipButton from "../InfoTooltipButton.svelte";
    import CustomArrow from "../custom_components/custom_arrow.svelte";

    export let dialog: HTMLDialogElement;
    

    function updateGender(newGender: Gender) {
        
    }

    async function logOut() {
        await UserInitializer.GI().logout();
        history.back();
    }
</script>

<dialog
    bind:this={dialog}
    class="modal modal-bottom sm:modal-middle"
    on:close={() => history.back()}
>
    <div class="modal-box bg-base-200 pb-10">
        <div class="flex justify-between items-center mb-[1rem]">
            <InfoTooltipButton message="Placeholder TODO" />
            <h3 class="font-bold text-lg">{$_("profile")}</h3>
            <button class="btn btn-ghost" on:click={() => dialog.close()}>
                <Icon src={XCircle} size="24px" />
            </button>
        </div>
        <div class="flex flex-col justify-start items-center gap-6">
            <!-- Avatar -->
            <section class="flex flex-col items-center">
                <Avatar
                    small={true}
                    ring={false}
                    img="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
                <h1 class="text-xl">{$userStore.name}</h1>
                <h5 class="text-sm text-gray-500">
                    {$_("since")}: {dateToDateStr($userStore.createdAt)}
                </h5>
            </section>

            <!-- Profile Information -->
            <section class="join join-vertical w-[90%] rounded-lg bg-base-100">
                <button
                    class="btn btn-ghost join-item flex justify-between items-center"
                    on:click={() => goto(`${base}/update-profile-name`)}
                >
                    <div class="flex items-center gap-2">
                        <Icon src={Identification} size="26px" />
                        {$_("name")}
                    </div>
                    <div class="flex items-center text-gray-500">
                        {$userStore.name}
                        <Icon src={ChevronRight} size="18px" />
                    </div>
                </button>
                <div class="divider h-[1px]" />
                <button
                    class="btn btn-ghost join-item flex justify-between items-center"
                    on:click={() => goto(`${base}/update-profile-phone`)}
                >
                    <div class="flex items-center gap-2">
                        <Icon src={Phone} size="26px" />
                        {$_("phoneNumber")}
                    </div>
                    <div class="flex items-center text-gray-500">
                        {$userStore.phoneNumber}
                        <Icon src={ChevronRight} size="18px" />
                    </div>
                </button>
                <div class="divider h-[1px]" />
                <button
                    class="btn btn-ghost join-item flex justify-between items-center"
                    on:click={() => goto(`${base}/update-profile-email`)}
                >
                    <div class="flex items-center gap-2">
                        <Icon src={Envelope} size="26px" />
                        {$_("email")}
                    </div>
                    <div class="flex items-center text-gray-500">
                        {$userStore.userPublicData.email}
                        <CustomArrow />
                    </div>
                </button>
                <div class="divider h-[1px]" />
                <button
                    class="btn btn-ghost join-item flex justify-between items-center"
                >
                    <div class="flex items-center gap-2">
                        <Icon src={User} size="26px" />
                        {$_("userId")}
                    </div>
                    <div class="flex items-center text-gray-500">
                        {$userStore.id}
                        <CustomArrow />
                    </div>
                </button>
            </section>

            <!-- Gender -->
            <section
                class="relative rounded-lg bg-base-100 p-6 flex items-center justify-center gap-10 w-[90%]"
            >
                <InfoCircle
                    message="hello this is a test message for the info circle"
                />
                <button
                    id="male"
                    class="flex flex-col items-center"
                    class:text-gray-500={$userStore.gender !== Gender.male}
                    on:click={() => updateGender(Gender.male)}
                >
                    <Icon src={HandThumbUp} size="35px" />
                    <div>{$_("male")}</div>
                </button>
                <button
                    id="female"
                    class="flex flex-col items-center"
                    class:text-gray-500={$userStore.gender !== Gender.female}
                    on:click={() => updateGender(Gender.female)}
                >
                    <Icon src={HandThumbDown} size="35px" />
                    <span>{$_("female")}</span>
                </button>
                <button
                    id="other"
                    class="flex flex-col items-center"
                    class:text-gray-500={$userStore.gender !== Gender.anonymous}
                    on:click={() => updateGender(Gender.anonymous)}
                >
                    <Icon src={Moon} size="35px" />
                    <span>{$_("other")}</span>
                </button>
            </section>

            <!-- Auth Options -->
            <section
                class="relative rounded-lg bg-base-100 p-6 flex items-center justify-center gap-4 w-[90%]"
            >
                <button class="btn btn-ghost">
                    <img src={Google} alt="google" class="w-[35px]" />
                </button>
                <button class="btn btn-ghost">
                    <Icon src={Plus} size="35px" />
                </button>
            </section>

            <!-- Actions -->
            <section class="join join-vertical w-[90%] rounded-lg bg-base-100">
                <button
                    class="btn btn-ghost join-item flex justify-between items-center"
                    on:click={logOut}
                >
                    <div class="flex items-center gap-2">
                        <Icon src={ArrowRightOnRectangle} size="26px" />
                        {$_("logout")}
                    </div>
                    <div class="flex items-center text-gray-500">
                        <CustomArrow />
                    </div>
                </button>
                <div class="divider h-[1px]" />
                <button
                    class="btn btn-ghost join-item flex justify-between items-center"
                >
                    <div class="flex items-center gap-2">
                        <Icon src={Trash} size="26px" />
                        {$_("deleteUser")}
                    </div>
                    <div class="flex items-center text-gray-500">
                        <CustomArrow />
                    </div>
                </button>
            </section>
        </div>
    </div>

    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
