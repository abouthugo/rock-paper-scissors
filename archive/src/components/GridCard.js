import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as rock from '../cards/rock@1.png'
import * as rockActive from '../cards/rock-active.png'
import * as paper from '../cards/paper@1.png'
import * as paperActive from '../cards/paper-active.png'
import * as scissors from '../cards/scissors@1.png'
import * as scissorsActive from '../cards/scissors-active.png'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  grid-template-rows: auto;
  grid-gap: 10px;
  margin: 10px auto;
  padding: 10px 0;
  @media (max-width: 636px) {
    width: 95%;
  }
  @media (min-width: 637px) {
    width: 80%;
  }
  @media (min-width: 1200px) {
    width: 20%;
  }
`

const CardWrapper = styled.div`
  background-image: ${props => `url(${getURL(props.card)})`};
  background-size: contain;
  background-repeat: no-repeat;
  transition: all 0.25s ease-in-out;
  &:hover,
  :focus {
    background-image: ${props => `url(${getActive(props.card)})`};
    transform: scale(1.1);
  }
  @media (max-width: 636px) {
    width: 25vw;
    height: 37.5vw;
  }
  @media (min-width: 637px) {
    width: 15vw;
    height: 22.5vw;
  }
  @media (min-width: 1200px) {
    width: 5vw;
    height: 7.5vw;
  }
`

const GridCard = ({ cards }) => (
  <Grid>
    {cards.map(c => (
      <CardWrapper card={c} />
    ))}
  </Grid>
)

GridCard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.string)
}

export default GridCard

function getURL (selection) {
  if (selection === 'paper') return paper
  if (selection === 'rock') return rock
  if (selection === 'scissors') return scissors
}

function getActive (selection) {
  if (selection === 'paper') return paperActive
  if (selection === 'rock') return rockActive
  if (selection === 'scissors') return scissorsActive
}
