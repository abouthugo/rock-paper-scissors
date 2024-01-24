import { RouteSectionProps } from '@solidjs/router'
import styles from '../styles/AppContainer.module.css'

export default function AppContainer(props: RouteSectionProps) {
    const handleOnClick = () => {
        const debug = document.documentElement.getAttribute('debug')
        console.log('debug:', debug)
        if (debug !== null) document.documentElement.removeAttribute('debug')
        else document.documentElement.setAttribute('debug', '')
    }
    return (
        <section class={`${styles.container}`}>
            {props.children}
            <div class={`${styles.debug}`}>
                <button onClick={handleOnClick}>Toggle Debug</button>
            </div>
        </section>
    )
}
