import styled from 'styled-components';

const UserList = styled.div`
  padding-top: 20px;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  justify-content: center;
  grid-area: main;
`;

export default UserList;