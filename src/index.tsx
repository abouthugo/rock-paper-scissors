/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import App from './App'
import { Router } from '@solidjs/router'
import { GameStateProvider } from './game-state-provider'
import AppContainer from './components/AppContainer'

const root = document.getElementById('root')

render(
    () => (
        <GameStateProvider>
            <Router root={AppContainer}>
                <App />
            </Router>
        </GameStateProvider>
    ),
    root!,
)
