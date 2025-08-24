<script lang="ts">
	import stories from '../data/stories.json';
	import PhoneUi from '$lib/components/PhoneUI.svelte';
	import type { Line, StoryIndex } from '../lib/types';

	let selectedStory = $state<string | null>(null);
	let dialogue = $state<Line[] | null>(null);

	// Cast the imported JSON to the correct type
	const storyList: StoryIndex[] = stories as StoryIndex[];

	// Glob import all JSON story files
	const storyModules = import.meta.glob('/src/data/stories/*.json');

	// Pick a random story on component mount
	async function loadRandomStory() {
		// Pick a random story from the index
		const randomIndex = Math.floor(Math.random() * storyList.length);
		const story = storyList[randomIndex];

		// Construct the correct key
		const key = `/src/data/${story.file}`;

		// Load the corresponding JSON using the glob
		const loader = storyModules[key];
		if (!loader) throw new Error(`Story file not found: ${story.file}`);

		const module = (await loader()) as { default: Line[] };
		dialogue = module.default;
		selectedStory = story.id;
	}

	// Run on component initialization
	loadRandomStory();
</script>

{#if selectedStory && dialogue !== null}
	<PhoneUi {dialogue} />
{:else}
	<div>Loading story...</div>
{/if}
