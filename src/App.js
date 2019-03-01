import React, { Component } from 'react';
import AppContainer from './components/AppContainer';
import UserList from './components/UserList';

import User from './components/User';
import CardContainer from './components/Card.Container';
import Timer from './components/Timer';
import StartButton from './components/StartButton';
import { AppContextProvider, AppContext } from './components/Context';
import OnlinePlayersPanel from './components/OnlinePlayersPanel';

class App extends Component {
    render() {
        return (
            <AppContainer>
                <AppContextProvider>
                    <p style={ { "gridArea": "title", "fontSize": "2.6rem" } }>Welcome Players</p>
                    <AppContext.Consumer>
                        {context => (
                            <>
                                <Timer start={context.state.start} handleReset={context.handleReset}/>
                                <CardContainer cards={context.state.cards} handleCardClick={context.handleCardClick}/>
                            </>
                        )}
                    </AppContext.Consumer>
                    <StartButton/>
                    <OnlinePlayersPanel/>
                </AppContextProvider>
            </AppContainer>
        );
    }
}

export default App;
