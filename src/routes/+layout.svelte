<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<main class="flex h-screen flex-col items-center justify-center text-center text-white">
	{@render children()}
</main>

<style>
	main {
		background: linear-gradient(to bottom, #1c1c1c, #121212);
	}
</style>
