import React from 'react';
import {AppContext} from '../Context/';
import Timer from '../Timer';
import CardContainer from '../Card.Container';
import StartButton from '../StartButton';
import OnlinePlayersPanel from '../OnlinePlayersPanel';

const Game = () => (
   <>
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
   </>
);
export default Game;