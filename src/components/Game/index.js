import React from 'react';
import Timer from '../Timer';
import CardContainer from '../Card.Container';
import StartButton from '../StartButton';
import OnlinePlayersPanel from '../OnlinePlayersPanel';
import TitleMessage from '../TitleMessage';

const Game = ({ start, inMatch, user, cards, handleCardClick, handleReset }) => (
    <>
        <TitleMessage>Welcome { user.name }</TitleMessage>
        { inMatch ?
            <>
                <Timer start={ start } handleReset={ handleReset }/>
                <CardContainer cards={ cards } handleCardClick={ start ? handleCardClick : "" }/>
                <StartButton/>
            </>
            : null }
        <OnlinePlayersPanel/>
    </>
);
export default Game;