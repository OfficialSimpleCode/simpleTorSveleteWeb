<script lang="ts">
	import { base } from "$app/paths";
	import { goto } from "$app/navigation";

	import { translate, _ } from "$lib/utils/translate";

	let businessID: string;

	let loading: boolean = false;
	let error: string = "";

	function isBusinessIdValid(): boolean {
		return true;
		error = translate("invalidId", $_);
		return false;
	}

	function loadBusiness(e: Event) {
		error = "";
		if (!isBusinessIdValid()) {
			return;
		}

		loading = true;
		try {
			e.preventDefault();
			goto(`${base}/business?BusinessId=${businessID}`);
		} catch (e: any) {
			error = e;
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>SimpleTor</title>
	<meta name="description" content="SimpleTor Web Application" />
</svelte:head>

<main class="h-full w-full flex justify-center items-center">
	<div class="-translate-y-[20vh] w-full flex flex-col items-center">
		<div class="my-8">
			<h1 class="text-2xl sm:text-4xl text-center">
				{translate("businessSearchShowcase", $_)}
			</h1>
		</div>
		<form class="join w-[85%] max-w-[700px]">
			<input
				bind:value={businessID}
				type="text"
				class="input input-primary sm:input-lg xs:join-item w-full"
				class:input-error={error.length > 0}
				required
			/>
			<button
				class="btn sm:btn-lg w-full btn-primary xs:join-item max-w-fit hidden xs:block"
				class:btn-disabled={loading}
				class:btn-error={error.length > 0}
				on:click={(e) => loadBusiness(e)}
			>
				{#if loading}
					<div class="loading loading-spinner" />
				{:else}
					{translate("loadBuisness", $_)}
				{/if}
			</button>
		</form>
		<button
			class="btn xs:btn-lg w-full btn-primary max-w-fit mt-3 xs:hidden"
			class:btn-disabled={loading}
			class:btn-error={error.length > 0}
			on:click={(e) => loadBusiness(e)}
		>
			{#if loading}
				<div class="loading loading-spinner" />
			{:else}
				{translate("loadBuisness", $_)}
			{/if}
		</button>
		{#if error.length > 0}
			<div class="label">
				<span class="label-text-alt text-error">{error}</span>
			</div>
		{/if}
	</div>
</main>
