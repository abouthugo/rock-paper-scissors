import React from 'react';
import { AppContext } from '../Context';
import Timer from '../Timer';
import CardContainer from '../Card.Container';
import StartButton from '../StartButton';

const Control = () => (
    <AppContext.Consumer>
        {context => (
            <>
                <Timer start={ context.state.start } handleReset={ context.handleReset } timerDone={context.timerDone}/>
                <CardContainer cards={ context.state.cards } handleCardClick={ context.state.start ? context.handleCardClick : "" }/>
                <StartButton/>
            </>
        )}
    </AppContext.Consumer>
);

export default Control;