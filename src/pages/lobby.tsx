import { useNavigate } from "@solidjs/router";
import classNames from "classnames";
import { type UserType, useGameState } from "../game-state-provider";
import styles from "../styles/lobby.module.css";

export default function Lobby() {
    const [state, actions] = useGameState();
    const navigate = useNavigate();
    const isWaiting = () => state.outRequest === "sent";

    if (!state.user?.name) {
        navigate("/");
    }

    const PlayerComponent = ({ player }: { player: UserType }) => {
        const color1 = player.available ? "bg-green-500" : "bg-red-500";
        const color2 = player.available ? "bg-green-400" : "bg-red-400";
        const handleClick = () => {
            actions.sendMatchRequest(player.id);
        };
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === "Enter") actions.sendMatchRequest(player.id);
        };
        return (
            <div
                onClick={handleClick}
                onKeyPress={handleKeyPress}
                class="flex group justify-left items-center gap-2 rounded-xl w-lg px-2 py-4 mb-4 cursor-pointer hover:scale-105 hover:bg-zinc-100 transition-all"
            >
                <span class="relative flex h-4 w-4">
                    <span
                        class={`group-hover:animate-ping-slow absolute inline-flex h-full w-full rounded-full ${color1} group-hover:opacity-75`}
                    />
                    <span
                        class={`relative inline-flex rounded-full h-4 w-4 ${color2}`}
                    />
                </span>
                <div>{player.name}</div>
            </div>
        );
    };

    const WaitingAnimation = () => {
        return (
            <div
                class={classNames(
                    styles.pulse_container,
                    "transition-all duration-700 ease-spring",
                    {
                        invisible: !isWaiting(),
                        "opacity-0": !isWaiting(),
                        "scale-50": !isWaiting(),
                    },
                )}
            >
                <h1 class="text-slate-600">Waiting for player to confirm</h1>
                <div class={styles.pulse_dot} />
            </div>
        );
    };

    return (
        <>
            <section class={styles.title}>
                <h1>Welcome {state.user?.name}</h1>
            </section>
            <section
                class={classNames(
                    styles.panel,
                    "transition-all duration-700 ease-spring",
                    {
                        "opacity-0": isWaiting(),
                        "-translate-x-10": isWaiting(),
                    },
                )}
            >
                <h1 class="text-lg font-bold">Player List</h1>
                <div class="my-2 flex-col">
                    {state.players.map((player) => (
                        <PlayerComponent player={player} />
                    ))}
                </div>
            </section>
            <button
                type="button"
                onclick={actions.toggleOutRequest}
                class={classNames(
                    "bg-black px-2 py-3 my-2 rounded-lg h-fit text-white",
                    {
                        "bg-slate-300": isWaiting(),
                        "text-black": isWaiting(),
                    },
                )}
            >
                toggle out pulse
            </button>
            <WaitingAnimation />
            <h1>This will's is an error right</h1>
        </>
    );
}
