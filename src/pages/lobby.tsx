import { useNavigate } from '@solidjs/router'
import { useGameState } from '../game-state-provider'

export default function Lobby() {
    const [state] = useGameState()
    const navigate = useNavigate()

    if (!state.user?.name) {
        navigate('/')
    }
    return <div>Work in progress, state: {JSON.stringify(state, null, 2)}</div>
}
