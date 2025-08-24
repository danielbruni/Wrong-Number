<script lang="ts">
	import stories from '../data/stories.json';
	import PhoneUi from '$lib/components/PhoneUI.svelte';
	import type { CallState, Line, StoryIndex } from '$lib/types';
	import { finishedStories } from '$lib/stores/finishedStories';

	let selectedStory = $state<string | null>(null);
	let dialogue = $state<Line[] | null>(null);
	let callState = $state<CallState>('ringing');

	// Cast the imported JSON to the correct type
	const storyList: StoryIndex[] = stories as StoryIndex[];

	// Glob import all JSON story files
	const storyModules = import.meta.glob('/src/data/stories/*.json');

	// Pick a random story on component mount
	async function loadRandomStory() {
		console.log('Load Random Story...');

		const unfinished = storyList.filter((s) => !$finishedStories.includes(s.id));
		if (unfinished.length === 0) {
			selectedStory = null;
			dialogue = null;
			return; // all done
		}

		// Pick a random story from the index
		const randomIndex = Math.floor(Math.random() * unfinished.length);
		const story = unfinished[randomIndex];

		// Construct the correct key
		const key = `/src/data/${story.file}`;

		// Load the corresponding JSON using the glob
		const loader = storyModules[key];
		if (!loader) throw new Error(`Story file not found: ${story.file}`);

		const module = (await loader()) as { default: Line[] };
		dialogue = module.default;
		selectedStory = story.id;
		callState = 'ringing';

		console.log(`Story '${story.id}' loaded.`);
	}

	function markStoryFinished(storyId: string) {
		const current = $finishedStories;
		if (!current.includes(storyId)) {
			finishedStories.set([...current, storyId]);
		}
	}

	function onStoryComplete() {
		if (selectedStory) {
			markStoryFinished(selectedStory);
		}

		// Load a new story after a short delay (e.g., 3 seconds)
		setTimeout(() => {
			loadRandomStory();
		}, 3000);
	}

	function acceptCall() {
		callState = 'inCall';
	}

	function declineCall() {
		callState = 'waiting';

		// Load a new story after a short delay (e.g., 3 seconds)
		setTimeout(() => {
			loadRandomStory();
		}, 3000);
	}

	// Run on component initialization
	loadRandomStory();
</script>

{#if callState === 'ringing' && !!dialogue}
	<div class="ring-screen">
		<p>📞 Incoming call...</p>
		<div class="ring-buttons">
			<button class="answer" onclick={acceptCall}>Answer</button>
			<button class="decline" onclick={declineCall}>Decline</button>
		</div>
	</div>
{:else if callState === 'inCall' && dialogue && selectedStory}
	{#key selectedStory}
		<PhoneUi {dialogue} {onStoryComplete} />
	{/key}
{:else if callState === 'callEnded'}
	<div class="call-disconnected">
		<p>[Call disconnected]</p>
		<p>All stories completed!</p>
	</div>
{:else}
	<div class="loading">Loading story...</div>
{/if}

<style>
	.ring-screen {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: linear-gradient(to bottom, #1c1c1c, #121212);
		color: #fff;
		text-align: center;
		animation: pulse 1.2s infinite;
		padding: 4em;
	}

	.ring-screen p {
		font-size: 2rem;
		margin-bottom: 2rem;
	}

	.ring-buttons {
		display: flex;
		gap: 1.5rem;
	}

	.ring-buttons button {
		padding: 1rem 2rem;
		font-size: 1.2rem;
		border-radius: 12px;
		cursor: pointer;
		border: none;
		transition:
			transform 0.2s,
			background-color 0.2s;
	}

	/* Answer button */
	.ring-buttons .answer {
		background-color: #4caf50;
		color: #fff;
	}

	.ring-buttons .answer:hover {
		transform: scale(1.1);
		background-color: #45a049;
	}

	/* Decline button */
	.ring-buttons .decline {
		background-color: #f44336;
		color: #fff;
	}

	.ring-buttons .decline:hover {
		transform: scale(1.1);
		background-color: #e53935;
	}

	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
		}
		70% {
			box-shadow: 0 0 0 20px rgba(76, 175, 80, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
		}
	}
</style>
