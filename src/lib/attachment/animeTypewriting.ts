import type { Attachment } from 'svelte/attachments';

export const animateTypewriting: Attachment = (element) => {
	let fullText = element.innerHTML.trim();
	let charIndex = 0;
	let currentText = '';
	let timeout: ReturnType<typeof setTimeout>;

	const updateInnerHTML = (isTyping = false) => {
		element.innerHTML = '&#8203;' + currentText + (isTyping ? '|' : '');
	};

	function startTyping(text: string) {
		clearTimeout(timeout);
		fullText = text.trim();
		charIndex = 0;
		currentText = '';
		updateInnerHTML(true);
		timeout = setTimeout(typeEffect, 100);
	}

	const typeEffect = () => {
		if (charIndex < fullText.length) {
			currentText += fullText[charIndex++];
			updateInnerHTML(true);
			timeout = setTimeout(typeEffect, fullText[charIndex - 1] === ' ' ? 25 : 50);
		} else {
			updateInnerHTML(false);
		}
	};

	// Start initial typing
	startTyping(fullText);

	return () => {
		clearTimeout(timeout);
		element.innerHTML = '';
	};
};
