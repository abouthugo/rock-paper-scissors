import styled from 'styled-components';

/**
 * Contains the entire app in a grid like format
 */
const AppContainer = styled.section`
  display: grid;
  grid-row-gap: 20px;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: 1fr 10fr 1fr 4fr;
  grid-template-areas: 
  ". title ."
  ". main ."
  ". timer start"
  ". controls .";
  max-height: 100vh;
  justify-items: center;
  align-items: center;
`;

export default AppContainer;