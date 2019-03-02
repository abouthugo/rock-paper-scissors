import React from 'react';
import { AppContext } from './Context';
import Button from './Button';
const StartButton = () => (
    <AppContext.Consumer>
        {context => (
            <Button onClick={context.handleStart}>Start!</Button>
        )}
    </AppContext.Consumer>
);

export default StartButton;