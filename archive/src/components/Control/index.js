import React from 'react'
import { AppContext } from '../Context'
import Timer from '../Timer'
import CardContainer from '../Card.Container'
import StartButton from '../StartButton'
import FloatingCard from '../FloatingCard'
export default () => (
    <AppContext.Consumer>
        {(context) => (
            <>
                <Timer
                    start={context.state.start}
                    handleReset={context.handleReset}
                    timerDone={context.timerDone}
                />
                <CardContainer
                    cards={context.state.cards}
                    handleUpdate={context.updateChoice}
                />
                <StartButton />
                {context.state.opponent && (
                    <FloatingCard card={context.state.opponent} />
                )}
            </>
        )}
    </AppContext.Consumer>
)
