import { useNavigate } from '@solidjs/router'
import { UserType, useGameState } from '../game-state-provider'

export default function Lobby() {
    const [state, actions] = useGameState()
    const navigate = useNavigate()

    const PlayerComponent = ({ player }: { player: UserType }) => {
        const color = player.available
            ? 'border-green-300 bg-green-500'
            : 'border-red-300 bg-red-500'
        return (
            <div
                onClick={() => {
                    actions.sendMatchRequest(player.id)
                }}
                class="flex justify-left items-center gap-2 bg-black text-white rounded-xl w-lg px-2 py-4 mb-4 cursor-pointer hover:scale-105 hover:bg-zinc-900 transition-all"
            >
                <div class={`w-4 h-4 rounded-full border-2 ${color}`}></div>
                <div>{player.name}</div>
            </div>
        )
    }
    if (!state.user?.name) {
        navigate('/')
    }
    return (
        <section class="mx-auto">
            <h1 class="text-4xl">Work in progress</h1>
            <div class="my-6 flex-col">
                {state.players.map((player) => (
                    <PlayerComponent player={player} />
                ))}
            </div>
        </section>
    )
}
