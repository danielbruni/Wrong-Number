<script lang="ts">
	type PropTypes = {
		onAcceptCall: () => void;
		onDeclineCall: () => void;
	};

	const { onAcceptCall, onDeclineCall }: PropTypes = $props();
</script>

<div
	class="ring-screen m-4 flex flex-col items-center justify-center rounded-3xl p-8 text-center text-white"
>
	<p>📞 Incoming call...</p>
	<div class="ring-buttons flex flex-col gap-6 lg:flex-row">
		<button class="answer" onclick={onAcceptCall}>Answer</button>
		<button class="decline" onclick={onDeclineCall}>Decline</button>
	</div>
</div>

<style>
	.ring-screen {
		background: linear-gradient(to bottom, #1c1c1c, #121212);
		animation: pulse 1.2s infinite;
	}

	.ring-screen p {
		font-size: 2rem;
		margin-bottom: 2rem;
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
