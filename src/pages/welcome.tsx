import { useNavigate } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import { useGameState } from "../game-state-provider";
import styles from "../styles/welcome.module.css";

export default function Welcome() {
	const navigate = useNavigate();
	const [state, { setPlayerName }] = useGameState();
	const [username, setUsername] = createSignal("");
	const [showError, setShowError] = createSignal(false);

	onMount(() => {
		if (state.user?.name) {
			navigate("/lobby");
		}
	});
	const onSubmit = (e: Event) => {
		e.preventDefault();
		if (!username()) {
			setShowError(true);
			return;
		}
		console.log("reached welcome onion", typeof setPlayerName);
		setPlayerName(username());
		navigate("/lobby");
	};
	return (
		<>
			<h1 class={styles.title}>Please enter a username</h1>
			<div class={styles.panel}>
				<div class="flex gap-2 items-center">
					<input
						type="text"
						name="username"
						placeholder="Username"
						onInput={(e) => setUsername(e.target.value)}
						required
						class={styles["input-box"]}
					/>
					<button type="button" class={styles.button} onClick={onSubmit}>
						Go
					</button>
				</div>
				{showError() && (
					<div class="text-red-600 bg-red-100 rounded-sm flex justify-center py-2">
						<p class="text-center">Enter a valid username</p>
					</div>
				)}
			</div>
		</>
	);
}
