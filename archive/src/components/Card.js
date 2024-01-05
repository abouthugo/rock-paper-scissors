import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as rock from '../cards/rock@1.png'
import * as rockActive from '../cards/rock-active.png'
import * as paper from '../cards/paper@1.png'
import * as paperActive from '../cards/paper-active.png'
import * as scissors from '../cards/scissors@1.png'
import * as scissorsActive from '../cards/scissors-active.png'

const Card = styled.div`
    display: block;
    width: 283px;
    height: 440px;
    margin: 8px;
    cursor: pointer;
    transition: all 0.2s ease-in;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: ${(props) =>
        props.card.active
            ? `url(${getActive(props.card.name)})`
            : `url(${getURL(props.card.name)})`};
    transform: ${(props) => (props.card.active ? 'translate(0, -20px)' : '')};
    &:hover {
        background-image: ${(props) => `url(${getActive(props.card.name)})`};
        transform: translate(0, -20px);
    }
`

Card.propTypes = {
    card: PropTypes.shape({
        name: PropTypes.string,
        active: PropTypes.bool,
        id: PropTypes.number,
    }).isRequired,
}
export default Card

function getURL(selection) {
    if (selection === 'paper') return paper
    if (selection === 'rock') return rock
    if (selection === 'scissors') return scissors
}

function getActive(selection) {
    if (selection === 'paper') return paperActive
    if (selection === 'rock') return rockActive
    if (selection === 'scissors') return scissorsActive
}
