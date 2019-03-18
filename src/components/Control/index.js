import React, { Component } from 'react';
import { AppContext } from '../Context';
import Timer from '../Timer';
import CardContainer from '../Card.Container';
import StartButton from '../StartButton';
import FloatingCard from '../FloatingCard'
export default class Control extends Component {

    constructor(){
        super();
        this.state = {
            choice: null
        };
    }

    handleUpdate = (choice) => {
        this.setState({choice});
    };

    render() {
        return (
            <AppContext.Consumer>
                { context => (
                    <>
                        <Timer start={ context.state.start } handleReset={ context.handleReset }
                               timerDone={ context.timerDone } choice={this.state.choice}/>
                        <CardContainer cards={ context.state.cards }
                                       handleUpdate={this.handleUpdate}/>
                        <StartButton/>
                        {context.state.opponent && <FloatingCard card={context.state.opponent}/>}
                    </>
                ) }
            </AppContext.Consumer>
        )
    }
};