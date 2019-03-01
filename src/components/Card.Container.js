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
            cards: randomCards()
        });
    }

    handleClick = (id) => {
        let { cards } = this.state;
        let newcards = cards.map(card => {
            if (card.id === id) {
                return { name: card.name, active: true, id: card.id }
            } else
                return { name: card.name, active: false, id: card.id }
        });
        this.setState({ cards: newcards, choice: id });
    };

    render() {
        let { cards } = this.state;
        return (
            <CardWrapper>
                { cards.map(card => (
                    <Card key={ card.id } card={ card } handleClick={ () => this.handleClick(card.id) }/>
                )) }
            </CardWrapper>
        );
    }


}

function randomCards() {
    let choices = ["rock", "paper", "scissors"];
    let res = [];
    for (let i in choices) {
        let n = Math.floor(Math.random() * 3);
        res.push({
            name: choices[n],
            active: false,
            id: i
        });
    }
    return res;
}