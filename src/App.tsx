import { Route } from '@solidjs/router'
import Welcome from './pages/welcome'
import Lobby from './pages/lobby'

function App() {
    return (
        <>
            <Route path="/" component={Welcome} />
            <Route path="/lobby" component={Lobby} />
        </>
    )
}

export default App
