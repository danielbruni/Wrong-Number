<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<main class="flex h-screen flex-col items-center justify-center bg-gray-300 text-center text-white">
	{@render children()}
</main>
