<script lang="ts">
	import { animateTypewriting } from '../attachment/animeTypewriting';
	import type { Line } from '../types';

	type PropTypes = { dialogue: Line[]; onStoryComplete: () => void };

	const { dialogue, onStoryComplete }: PropTypes = $props();

	let current = $state(0);
	let currentLine = $derived(dialogue[current].line);

	function choose(option: { text?: string; next: any }) {
		if (option.next === -1) {
			current = -1;
			onStoryComplete();
		} else {
			current = option.next;
		}
	}
</script>

<div class="flex h-full w-full flex-col justify-between rounded-2xl bg-black p-8">
	{#if current >= 0}
		{#key currentLine}
			<p class="line" {@attach animateTypewriting}>
				{currentLine}
			</p>
		{/key}
		<div class="choices mt-8">
			{#each dialogue[current].choices as choice}
				<button onclick={() => choose(choice)}>{choice.text}</button>
			{/each}
		</div>
	{:else}
		<div>
			<p class="end">[Call disconnected]</p>
		</div>
	{/if}
</div>

<style>
	.line {
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}
	.choices button {
		display: block;
		margin: 0.5rem 0;
		background: none;
		border: 1px solid #6aff6a;
		color: #6aff6a;
		font-family: inherit;
		padding: 0.5rem 1rem;
		cursor: pointer;
		transition: background 0.2s;
	}
	.choices button:hover {
		background: rgba(106, 255, 106, 0.1);
	}
	.end {
		color: #f33;
		font-weight: bold;
		font-size: 1.1rem;
	}
</style>
