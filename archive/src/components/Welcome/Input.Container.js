import React, { Component } from 'react'
import InputPresenter from './Input.Presenter'

export default class InputContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }
    }

    handleOnChange = ({ target }) => {
        this.setState({ value: target.value })
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.submitted &&
            prevProps.submitted !== this.props.submitted
        ) {
            this.props.action(this.state.value)
            this.setState({ value: '' })
        }
    }

    render() {
        return (
            <InputPresenter
                handleChange={this.handleOnChange}
                value={this.state.value}
            />
        )
    }
}
