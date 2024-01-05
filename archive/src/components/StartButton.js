import React from 'react'
import { AppContext } from './Context'
import Button from './Button'

const StartButton = () => (
    <AppContext.Consumer>
        {(context) => {
            if (!context.state.start)
                return <Button onClick={context.handleStart}>Start!</Button>
            else return null
        }}
    </AppContext.Consumer>
)

export default StartButton
