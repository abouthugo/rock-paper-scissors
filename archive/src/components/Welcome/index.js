import React, { Component } from 'react'
import WelcomeView from './WelcomeView'
import InputContainer from './Input.Container'
import TitleMessage from '../TitleMessage'
import Button from '../Button'
import { AppContext } from '../Context'

export default class Welcome extends Component {
    constructor() {
        super()
        this.state = {
            submitted: false,
        }
    }

    handleSubmit = () => {
        this.setState({ submitted: true })
    }

    render() {
        let { submitted } = this.state
        return (
            <>
                <TitleMessage>Please enter a username</TitleMessage>
                <WelcomeView>
                    <AppContext.Consumer>
                        {(context) => (
                            <InputContainer
                                submitted={submitted}
                                action={context.setPlayerName}
                            />
                        )}
                    </AppContext.Consumer>
                    <Button onClick={this.handleSubmit}>Submit</Button>
                </WelcomeView>
            </>
        )
    }
}
