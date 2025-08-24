export interface Choice {
	text: string;
	next: number;
}

export interface Line {
	line: string;
	choices: Choice[];
}

export interface StoryIndex {
	id: string;
	title: string;
	file: string;
}

export type CallState = 'ringing' | 'inCall' | 'callEnded' | 'waiting';
