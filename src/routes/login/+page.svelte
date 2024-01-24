

<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { AuthProvider, authProviderToImage, authProviderToStr, googleOrder } from "$lib/consts/auth";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import UserInitializer from "$lib/initializers/user_initializer";
  import { LoginType } from "$lib/services/external_services/firebase_auth_service";
  import { user } from "$lib/stores/User";
  
    // Assets
    async function handleClick(authProvider:AuthProvider){
        const resp = await VerificationHelper.GI().handleLogin({
            provider:authProvider,
            loginType:LoginType.login
        });
        console.log(UserInitializer.GI().userId);
        
        await UserInitializer.GI().setupUser({newUserId:UserInitializer.GI().userId});

        console.log(UserInitializer.GI().user);

        const u = UserInitializer.GI().user;
        user.set(u);

        goto(`${base}/business`);
        
    };
    
</script>

<main class="flex w-full h-full">
    <img
        class="flex-[1] object-cover !max-w-[50%] hidden lg:flex"
        src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?cs=srgb&dl=action-athlete-barbell-841130.jpg&fm=jpg"
        alt="simpletor"
    />
    <div class="flex-[1] flex flex-col justify-center items-center gap-8" >
        <h1 class="text-4xl">Login Or Signup</h1>
        {#each  googleOrder as authProvider, i}
            <button on:click = {()=>handleClick(authProvider)} class="btn sm:btn-lg btn-outline w-full">
                <img class="w-10 h-10" src={authProviderToImage[authProvider]} alt={authProviderToStr[authProvider]} />
                Signin with {authProviderToStr[authProvider]}
            </button>
        {/each}
    </div>
</main>


<style>
    div {
        margin-top: 100px;
        margin-bottom: 100px;
        margin-right: 100px;
        margin-left: 80px;

    }
</style>