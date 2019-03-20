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

    componentDidMount() {
        this.setState({
            cards: randomCards()
        });

        // sets a default choice
        setTimeout(() => {
            const {cards} = this.state;
            const update = cards.map((card, i) => {
               if(i === 0){
                   let newCard = {...card};
                   newCard.active  = true;
                   return newCard;
               }
               return card
            });

            this.setState({
                choice: cards[0].name,
                cards: update
            });
            this.props.handleUpdate(cards[0].name);
        }, 10);
    }


    /**
     * Adds a class to card that has been clicked
     * @param id
     * @param name
     */
    handleCardClick = ({ id, name }) => {
        let { cards } = this.state;
        let newcards = cards.map(card => {
            if (card.id === id) {
                return { name: card.name, active: true, id: card.id }
            } else
                return { name: card.name, active: false, id: card.id }
        });
        this.setState({ cards: newcards, choice: name });
        this.props.handleUpdate(name);
    };

    render() {
        let { cards } = this.state;
        return (
            <CardWrapper>
                { cards.map(card => (
                    <Card key={ card.id } card={ card }
                          onClick={ () => this.handleCardClick(card) }/>
                )) }
            </CardWrapper>
        );
    }


}

/**
 * Returns an array that represents 3 random cards of the set {rock, paper, scissors}
 * @returns {Array}
 */
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