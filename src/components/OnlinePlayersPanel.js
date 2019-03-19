import React from 'react';
import styled from 'styled-components';
import User from './User';
import { AppContext } from './Context';

const Panel = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border-right: 1px solid black;
  box-shadow: 10px 0 10px #BBBBBB;
  margin-right: 20px;
  height: 100%;
  grid-area: panel;
  align-self: start;
  text-align: center;
  overflow: scroll;
`;

const OnlinePlayersPanel = () => (
    <Panel>
        <p>Available Players</p>
        <AppContext.Consumer>
            { context => {
                const availablePlayers = context.state.players.filter(byAvailable);
                return (
                    <>
                        {
                            (availablePlayers.length > 0) ?
                                availablePlayers.map(player => (
                                    <User user={ player }/>
                                )) :
                                <div>No players available at this time</div>
                        }
                    </>
                )
            } }
        </AppContext.Consumer>
    </Panel>
);

function byAvailable(player) {
    return player.available;
}

export default OnlinePlayersPanel;