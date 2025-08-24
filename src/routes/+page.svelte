<script lang="ts">
	import stories from '../data/stories.json';
	import DialogueScreen from '$lib/components/DialogueScreen.svelte';
	import type { CallState, Line, StoryIndex } from '$lib/types';
	import { finishedStories } from '$lib/stores/finishedStories';
	import Phone from '$lib/components/Phone.svelte';
	import RingScreen from '$lib/components/RingScreen.svelte';

	let selectedStory = $state<string | null>(null);
	let dialogue = $state<Line[] | null>(null);
	let callState = $state<CallState>('ringing');

	// Cast the imported JSON to the correct type
	const storyList: StoryIndex[] = stories as StoryIndex[];

	// Glob import all JSON story files
	const storyModules = import.meta.glob('/src/data/stories/**/*.json');

	// Pick a random story on component mount
	async function loadRandomStory() {
		console.log('Load Random Story...');

		const unfinished = storyList.filter((s) => {
			// Skip if story already finished
			if ($finishedStories.includes(s.id)) return false;

			// Skip if it has dependencies that are not finished
			if ('requires' in s && s.requires) {
				return s.requires.every((req) => $finishedStories.includes(req));
			}

			return true;
		});

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

<Phone>
	{#if callState === 'ringing' && !!dialogue}
		<RingScreen onAcceptCall={acceptCall} onDeclineCall={declineCall} />
	{:else if callState === 'inCall' && dialogue && selectedStory}
		{#key selectedStory}
			<DialogueScreen {dialogue} {onStoryComplete} />
		{/key}
	{:else if callState === 'callEnded'}
		<div class="call-disconnected">
			<p>[Call disconnected]</p>
			<p>All stories completed!</p>
		</div>
	{:else}
		<div class="loading">Loading story...</div>
	{/if}
</Phone>
