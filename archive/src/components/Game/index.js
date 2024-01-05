import React from 'react'
import OnlinePlayersPanel from '../OnlinePlayersPanel'
import TitleMessage from '../TitleMessage'
import Control from '../Control'
import Waiting from '../Waiting/'

const Game = ({ inMatch, title_message, status }) => {
    let check = () => {
        return !inMatch && status !== 'sent'
    }
    return (
        <>
            <TitleMessage>{title_message}</TitleMessage>
            {status === 'sent' && <Waiting />}
            {inMatch && <Control />}
            {check() && <OnlinePlayersPanel />}
        </>
    )
}

export default Game
