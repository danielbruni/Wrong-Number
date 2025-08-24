import { writable } from 'svelte/store';

// Store holds an array of finished story IDs
export const finishedStories = writable<string[]>([]);
