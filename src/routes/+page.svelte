<script>
    import { firebaseConfig } from "$lib/firebase_config";
    import { initializeApp } from "firebase/app";
	
	const firebaseApp = initializeApp(firebaseConfig);
	console.log(firebaseApp);

</script>

<svelte:head>
	<title>SimpleTor</title>
	<meta name="description" content="SimpleTor Web Application" />
</svelte:head>
