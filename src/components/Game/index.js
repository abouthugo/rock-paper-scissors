import React from 'react';
import { AppContext } from '../Context/';
import Timer from '../Timer';
import CardContainer from '../Card.Container';
import StartButton from '../StartButton';
import OnlinePlayersPanel from '../OnlinePlayersPanel';
import TitleMessage from '../TitleMessage';

const Game = () => (
    <>
        <AppContext.Consumer>
            { context => (
                <>
                    <TitleMessage>Welcome {context.state.user.name}</TitleMessage>
                    <Timer start={ context.state.start } handleReset={ context.handleReset }/>
                    <CardContainer cards={ context.state.cards } handleCardClick={ context.handleCardClick }/>
                </>
            ) }
        </AppContext.Consumer>
        <StartButton/>
        <OnlinePlayersPanel/>
    </>
);
export default Game;