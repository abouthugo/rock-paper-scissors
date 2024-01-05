import styled from 'styled-components';

const TitleMessage = styled.p`
  grid-area: title;
  @media (max-width: 636px){
    font-size: 28px;
  }
  @media( min-width: 637px){
    font-size: 42px;
  }
`;

export default TitleMessage;