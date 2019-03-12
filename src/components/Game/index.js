import React from 'react';
import OnlinePlayersPanel from '../OnlinePlayersPanel';
import TitleMessage from '../TitleMessage';
import Control from "../Control";
import Waiting from '../Waiting/';

const Game = ({ inMatch, user, status }) => {
        let check = () => {
                return !inMatch && status!== 'sent';
        };
        return (
            <>
                <TitleMessage>Welcome { user.name }</TitleMessage>
                { status === 'sent' && <Waiting />}
                { inMatch && <Control/> }
                { check() && <OnlinePlayersPanel/>}
            </>
        )
};


export default Game;