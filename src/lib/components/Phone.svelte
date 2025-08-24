<script lang="ts">
	import PhoneGrid from './PhoneGrid.svelte';

	let { children } = $props();
</script>

<div
	class="relative mx-auto h-[600px] w-[300px] rounded-[2.5rem] border-[14px] border-gray-800 bg-gray-800 lg:max-h-fit lg:w-3xl dark:border-gray-800"
>
	<div
		class="absolute top-[142px] -right-[17px] h-[46px] w-[3px] rounded-r-lg bg-gray-800 dark:bg-gray-800"
	></div>
	<div
		class="absolute top-[124px] -left-[17px] h-[46px] w-[3px] rounded-l-lg bg-gray-800 dark:bg-gray-800"
	></div>
	<div
		class="absolute top-[178px] -left-[17px] h-[46px] w-[3px] rounded-l-lg bg-gray-800 dark:bg-gray-800"
	></div>
	<div
		class="h-full w-full overflow-hidden rounded-[2rem] bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500"
	>
		<div class="relative flex h-full w-full items-center justify-center p-2">
			<PhoneGrid />
			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>
</div>
