<script lang="ts">
	import dialogue from '../../data/stories/job.json';
	import { animateTypewriting } from '../attachment/animeTypewriting';

	let current = $state(0);
	let currentLine = $derived(dialogue[current].line);

	function choose(option: { text?: string; next: any }) {
		if (option.next === -1) {
			current = -1;
		} else {
			current = option.next;
		}
	}
</script>

<div class="phone-ui">
	<div class="screen">
		{#if current >= 0}
			{#key currentLine}
				<p class="line" {@attach animateTypewriting}>
					{currentLine}
				</p>
			{/key}
			<div class="choices">
				{#each dialogue[current].choices as choice}
					<button onclick={() => choose(choice)}>{choice.text}</button>
				{/each}
			</div>
		{:else}
			<p class="end">[Call disconnected]</p>
		{/if}
		<div class="crt-overlay"></div>
	</div>
</div>

<style>
	.phone-ui {
		position: relative;
		font-family: 'IBM Plex Mono', monospace;
		background: black;
		color: #6aff6a;
		padding: 2rem;
		max-width: 600px;
		margin: 2rem auto;
		border: 4px solid #333;
		border-radius: 12px;
		overflow: hidden;
	}
	.screen {
		position: relative;
		padding: 1rem;
		background: #111;
	}
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
	.crt-overlay {
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: repeating-linear-gradient(
			to bottom,
			rgba(0, 255, 0, 0.02),
			rgba(0, 255, 0, 0.02) 1px,
			transparent 1px,
			transparent 2px
		);
		animation: flicker 0.12s infinite;
		z-index: 10;
	}
	@keyframes flicker {
		0% {
			opacity: 0.98;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0.96;
		}
	}
</style>
