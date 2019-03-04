import React, { Component } from 'react';
import Card from './Card';
import CardWrapper from './CardWrapper';

export default class CardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            choice: null
        };
    }

    componentWillMount(){
        this.setState({
            cards: this.props.cards
        });
    }


    render() {
        let { cards } = this.props;
        return (
            <CardWrapper>
                { cards.map(card => (
                    <Card key={ card.id } card={ card } handleClick={ () => this.props.handleCardClick(card) }/>
                )) }
            </CardWrapper>
        );
    }


}
