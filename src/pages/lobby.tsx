import { useNavigate } from '@solidjs/router'
import { UserType, useGameState } from '../game-state-provider'
import styles from '../styles/lobby.module.css'

export default function Lobby() {
    const [state, actions] = useGameState()
    const navigate = useNavigate()

    const PlayerComponent = ({ player }: { player: UserType }) => {
        const color1 = player.available ? 'bg-green-500' : 'bg-red-500'
        const color2 = player.available ? 'bg-green-400' : 'bg-red-400'
        const appliedClasses = `flex group justify-left items-center gap-2 rounded-xl w-lg px-2 py-4 mb-4 cursor-pointer hover:scale-105 hover:bg-zinc-100 transition-all`
        const handleClick = () => {
            actions.sendMatchRequest(player.id)
        }
        return (
            <div onClick={handleClick} class={appliedClasses}>
                <span class="relative flex h-4 w-4">
                    <span
                        class={`group-hover:animate-ping-slow absolute inline-flex h-full w-full rounded-full ${color1} group-hover:opacity-75`}
                    ></span>
                    <span
                        class={`relative inline-flex rounded-full h-4 w-4 ${color2}`}
                    ></span>
                </span>
                <div>{player.name}</div>
            </div>
        )
    }

    if (!state.user?.name) {
        navigate('/')
    }
    return (
        <>
            <section class={styles.title}>
                <h1>Welcome {state.user?.name}</h1>
            </section>
            <section class={styles.panel}>
                <h1 class="text-lg font-bold">Player List</h1>
                <div class="my-2 flex-col">
                    {state.players.map((player) => (
                        <PlayerComponent player={player} />
                    ))}
                </div>
            </section>
        </>
    )
}
