import styled from 'styled-components'

const WelcomeView = styled.div`
    grid-area: main;

    display: grid;
    grid-template-rows: repeat(10, 1fr);
    grid-template-areas: 'input' 'start';
    grid-gap: 20px;
    justify-content: center;
    min-height: 100%;
    max-height: 100%;
    min-width: 100%;
    max-width: 100%;
`

export default WelcomeView
