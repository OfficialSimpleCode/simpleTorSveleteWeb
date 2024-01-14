<script lang="ts">
    import { Icon, ChatBubbleLeftEllipsis } from "svelte-hero-icons";

    // Assets
    import Google from "$lib/images/google.svg";
    import Facebook from "$lib/images/facebook.svg";
    import Apple from "$lib/images/apple.svg";
</script>

<main class="flex w-full h-full">
    <img
        class="flex-[1] object-cover !max-w-[50%] hidden lg:flex"
        src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?cs=srgb&dl=action-athlete-barbell-841130.jpg&fm=jpg"
        alt="simpletor"
    />
    <div class="flex-[1] flex flex-col justify-center items-center gap-8">
        <h1 class="text-4xl">Login Or Signup</h1>

        <div id="buttons" class="flex flex-col items-center gap-2 w-[90%] sm:w-[60%]">
            <button class="btn sm:btn-lg btn-outline w-full">
                <img class="w-10 h-10" src={Google} alt="google" />
                Signin with Google
            </button>
            <button class="btn sm:btn-lg btn-outline w-full">
                <img class="w-10 h-10" src={Facebook} alt="facebook" />
                Signin with Facebook</button
            >
            <button class="btn sm:btn-lg btn-outline w-full">
                <img class="w-10 h-10" src={Apple} alt="apple" />
                Signin with Apple
            </button>
            <button class="btn sm:btn-lg btn-outline w-full">
                <Icon src={ChatBubbleLeftEllipsis} size="2.5rem" />
                Signin with Phone Number
            </button>
        </div>
    </div>
</main>
