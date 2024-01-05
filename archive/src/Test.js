import React from 'react'
import GridCard from './components/GridCard'

export default () => {
    return <GridCard cards={randomCards(9)} />
}

function randomCards(n) {
    const options = ['rock', 'paper', 'scissors']
    let res = []
    for (let i = 0; i < n; i++) {
        let j = Math.floor(Math.random() * 3)
        res.push(options[j])
    }
    return res
}
