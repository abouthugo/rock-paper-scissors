import { createSignal, onMount } from 'solid-js'
import styles from '../styles/welcome.module.css'
import { useNavigate } from '@solidjs/router'
import { useGameState } from '../game-state-provider'

export default function Welcome() {
    const navigate = useNavigate()
    const [state, { setPlayerName }] = useGameState()
    const [username, setUsername] = createSignal('')

    onMount(() => {
        if (state.user?.name) {
            navigate('/lobby')
        }
    })
    const onSubmit = (e: Event) => {
        e.preventDefault()
        console.log('reached welcome onion', typeof setPlayerName)
        setPlayerName(username())
        navigate('/lobby')
    }
    return (
        <>
            <h1 class={`${styles.title}`}>Please enter a username</h1>
            <div class={`${styles.panel}`}>
                <form onsubmit={onSubmit} action="/game">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onInput={(e) => setUsername(e.target.value)}
                        required
                        class={`${styles['input-box']}`}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}
