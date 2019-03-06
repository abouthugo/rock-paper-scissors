import React, { Component } from 'react';
import AppContainer from './components/AppContainer';
import { AppContextProvider, AppContext } from './components/Context';
import Game from './components/Game';
import Welcome from './components/Welcome';

class App extends Component {
    render() {
        return (
            <AppContainer>
                <AppContextProvider>
                    <AppContext.Consumer>
                        { context => {
                            return context.state.registered ?
                                <Game {...context.state} handleCardClick={context.handleCardClick} handleReset={context.handleReset}/>
                                : <Welcome/>;
                        } }
                    </AppContext.Consumer>
                </AppContextProvider>
            </AppContainer>
        );
    }
}

export default App;
