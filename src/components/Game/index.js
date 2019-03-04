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
                    <TitleMessage>Welcome { context.state.user.name }</TitleMessage>
                    { context.state.inMatch ?
                        <>
                            <Timer start={ context.state.start } handleReset={ context.handleReset }/>
                            <CardContainer cards={ context.state.cards } handleCardClick={context.state.start ?  context.handleCardClick : "" }/>
                            <StartButton/>
                        </>
                        : null }

                </>
            ) }
        </AppContext.Consumer>
        <OnlinePlayersPanel/>
    </>
);
export default Game;