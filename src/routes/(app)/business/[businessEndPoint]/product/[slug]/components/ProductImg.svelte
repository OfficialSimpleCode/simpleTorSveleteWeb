<script lang="ts">
  export let imageUrl: string;
  export let name: string;
</script>

<img class="h-full object-cover w-full" src={imageUrl} alt={name} />
