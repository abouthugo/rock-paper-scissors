import React, { Component } from 'react'
import AppContainer from './components/AppContainer'
import { AppContextProvider, AppContext } from './components/Context'
import Game from './components/Game'
import Welcome from './components/Welcome'

class App extends Component {
    render() {
        return (
            <AppContextProvider>
                <AppContext.Consumer>
                    {(context) => (
                        <AppContainer background={context.state.background}>
                            {context.state.registered ? (
                                <Game
                                    user={context.state.user}
                                    inMatch={context.state.inMatch}
                                    status={context.state.outRequest}
                                    title_message={context.state.title_message}
                                />
                            ) : (
                                <Welcome />
                            )}
                        </AppContainer>
                    )}
                </AppContext.Consumer>
            </AppContextProvider>
        )
    }
}

export default App
