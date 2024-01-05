import styled from 'styled-components'
import * as paper from '../cards/paper@1.png'
import * as rock from '../cards/rock@1.png'
import * as scissors from '../cards/scissors@1.png'
const FloatingCard = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
    width: 125px;
    height: 187px;
    background-image: ${(props) => `url(${getURL(props.card)})`};
    background-size: contain;
    background-repeat: no-repeat;
    color: black;
    ::after {
        position: absolute;
        content: 'Opponent Chose';
        bottom: -100%;
        left: 0px;
        width: 100%;
        height: 100%;
    }
`
function getURL(selection) {
    if (selection === 'paper') return paper
    if (selection === 'rock') return rock
    if (selection === 'scissors') return scissors
}
export default FloatingCard
