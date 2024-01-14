<script lang="ts">
    import Google from "$lib/images/google.svg";
    import {
        Icon,
        InformationCircle,
        XCircle,
        Identification,
        Envelope,
        Phone,
        User,
        ChevronRight,
        ArrowRightOnRectangle,
        Trash,
        HandThumbUp,
        HandThumbDown,
        Moon,
        Plus,
    } from "svelte-hero-icons";
    import Avatar from "./Avatar.svelte";
    import InfoCircle from "./InfoCircle.svelte";

    export let dialog: HTMLDialogElement;
    export let profile: Record<string, string>;

    function updateGender(newGender: string) {
        profile.gender = newGender;
    }
</script>

<dialog
    bind:this={dialog}
    class="modal modal-bottom sm:modal-middle"
    on:close={() => history.back()}
>
    <div class="modal-box bg-base-200 pb-10">
        <div class="flex justify-between items-center mb-[1rem]">
            <button
                class="tooltip tooltip-right btn btn-ghost"
                data-tip="Here you can edit your personal information, watch your profile information, businesses you manage or work at and more."
            >
                <!-- TODO: fix for mobile devices -->
                <Icon src={InformationCircle} size="24px" />
            </button>
            <h3 class="font-bold text-lg">Profile</h3>
            <button class="btn btn-ghost" on:click={() => dialog.close()}>
                <Icon src={XCircle} size="24px" />
            </button>
        </div>
        <div class="flex flex-col justify-start items-center gap-6">
            <!-- Avatar -->
            <section class="flex flex-col items-center">
                <Avatar small={true} ring={false} />
                <h1 class="text-xl">{profile.name}</h1>
                <h5 class="text-sm text-gray-500">sains: {profile.joinDate}</h5>
            </section>

            <!-- Profile Information -->
            <section class="join join-vertical w-[90%] rounded-lg bg-base-100">
                <button
                    class="btn btn-ghost join-item flex justify-between items-center"
                >
                    <div class="flex items-center gap-2">
                        <Icon src={Identification} size="26px" />
                        Name
                    </div>
                    <div class="flex items-center text-gray-500">
                        {profile.name}
                        <Icon src={ChevronRight} size="18px" />
                    </div>
                </button>
                <div class="divider h-[1px]" />
                <button
                    class="btn btn-ghost join-item flex justify-between items-center"
                >
                    <div class="flex items-center gap-2">
                        <Icon src={Phone} size="26px" />
                        Phone
                    </div>
                    <div class="flex items-center text-gray-500">
                        {profile.phoneNumber}
                        <Icon src={ChevronRight} size="18px" />
                    </div>
                </button>
                <div class="divider h-[1px]" />
                <button
                    class="btn btn-ghost join-item flex justify-between items-center"
                >
                    <div class="flex items-center gap-2">
                        <Icon src={Envelope} size="26px" />
                        Email
                    </div>
                    <div class="flex items-center text-gray-500">
                        {profile.emailAddress}
                        <Icon src={ChevronRight} size="18px" />
                    </div>
                </button>
                <div class="divider h-[1px]" />
                <button
                    class="btn btn-ghost join-item flex justify-between items-center"
                >
                    <div class="flex items-center gap-2">
                        <Icon src={User} size="26px" />
                        User ID
                    </div>
                    <div class="flex items-center text-gray-500">
                        {profile.userID}
                        <Icon src={ChevronRight} size="18px" />
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
                    class:text-gray-500={profile.gender !== "male"}
                    on:click={() => updateGender("male")}
                >
                    <Icon src={HandThumbUp} size="35px" />
                    <div>Male</div>
                </button>
                <button
                    id="female"
                    class="flex flex-col items-center"
                    class:text-gray-500={profile.gender !== "female"}
                    on:click={() => updateGender("female")}
                >
                    <Icon src={HandThumbDown} size="35px" />
                    <span>Female</span>
                </button>
                <button
                    id="other"
                    class="flex flex-col items-center"
                    class:text-gray-500={profile.gender !== "other"}
                    on:click={() => updateGender("other")}
                >
                    <Icon src={Moon} size="35px" />
                    <span>Other</span>
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
                >
                    <div class="flex items-center gap-2">
                        <Icon src={ArrowRightOnRectangle} size="26px" />
                        Logout
                    </div>
                    <div class="flex items-center text-gray-500">
                        <Icon src={ChevronRight} size="18px" />
                    </div>
                </button>
                <div class="divider h-[1px]" />
                <button
                    class="btn btn-ghost join-item flex justify-between items-center"
                >
                    <div class="flex items-center gap-2">
                        <Icon src={Trash} size="26px" />
                        Delete Profile
                    </div>
                    <div class="flex items-center text-gray-500">
                        <Icon src={ChevronRight} size="18px" />
                    </div>
                </button>
            </section>
        </div>
    </div>

    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
