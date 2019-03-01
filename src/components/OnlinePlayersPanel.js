import React from 'react';
import styled from 'styled-components';
import User from './User';

const Panel = styled.div`
  display: flex;
  flex-flow: column wrap;
  border-right: 1px solid black;
  box-shadow: 10px 0 10px #BBBBBB;
  margin-right: 20px;
  height: 100%;
  grid-area: panel;
  align-self: start;
  text-align: center;
`;

const OnlinePlayersPanel = () => (
    <Panel>
        <p>Available Players</p>
        <User username="PlayerOne"/>
        <User username="PlayerTwo"/>
        <User username="PlayerThree"/>
    </Panel>
);

export default OnlinePlayersPanel;