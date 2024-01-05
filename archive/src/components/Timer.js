import React, { Component } from 'react'
import styled from 'styled-components'

const TimeMessage = styled.div`
    display: block;
    width: ${(props) => props.percentage};
    text-align: center;
    color: ${(props) => props.color};
    font-size: 2.6rem;
    grid-area: timer;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    background: ${(props) => (props.background ? props.background : 'blue')};
    cursor: ${(props) => (props.cursor ? props.cursor : null)};
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`

export default class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            done: false,
            remaining: 5,
            start: false,
        }
        this.intervalHandle = null
    }

    componentDidMount() {
        let { start } = this.props
        this.setState({ start })
    }

    componentDidUpdate(prevProps) {
        let { start } = this.props
        if (start !== prevProps.start && start !== this.state.start)
            this.intervalHandle = setInterval(this.tick, 1000)
    }

    tick = () => {
        if (this.state.remaining < 2) {
            clearInterval(this.intervalHandle)
            setTimeout(() => {
                this.props.timerDone()
            }, 2)
        }
        this.setState((prevState) => ({
            remaining: prevState.remaining - 1,
        }))
    }

    reset = () => {
        this.setState({ remaining: 5, start: false })
        this.props.handleReset()
    }

    render() {
        let { remaining } = this.state
        let percentage = remaining * 20
        return (
            <TimeMessage
                percentage={`${percentage}%`}
                color={remaining === 0 ? 'blue' : 'white'}
                background={remaining === 0 ? 'transparent' : null}
                cursor={remaining === 0 ? 'pointer' : null}
                onClick={remaining === 0 ? this.reset : null}
            >
                {remaining !== 0 ? remaining : 'Exit'}
            </TimeMessage>
        )
    }
}
