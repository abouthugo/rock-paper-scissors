import React from 'react';
import OnlinePlayersPanel from '../OnlinePlayersPanel';
import TitleMessage from '../TitleMessage';
import Control from "../Control";

const Game = ({ inMatch, user }) => (
    <>
        <TitleMessage>Welcome { user.name }</TitleMessage>
        <Control inMatch={ inMatch }/>
        <OnlinePlayersPanel/>
    </>
);
export default Game;