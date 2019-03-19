import React from 'react'
import styled from 'styled-components'
import User from './components/User'

const Panel = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border-right: 1px solid black;
  box-shadow: 10px 0 10px #bbbbbb;
  margin-right: 20px;
  height: 100%;
  grid-area: panel;
  align-self: end;
  text-align: center;
  overflow: scroll;
`
const Container = styled.div`
  width: 50%;
  margin: 0 auto;
  height: 500px;
`

export default () => (
  <Container>
    <Panel>
      <User user={{ name: 'test_subject_1', id: 'ts1' }} />
      <User user={{ name: 'test_subject_2', id: 'ts2' }} />
      <User user={{ name: 'test_subject_3', id: 'ts3' }} />
      <User user={{ name: 'test_subject_4', id: 'ts4' }} />
      <User user={{ name: 'test_subject_5', id: 'ts5' }} />
      <User user={{ name: 'test_subject_5', id: 'ts5' }} />
      <User user={{ name: 'test_subject_5', id: 'ts5' }} />
      <User user={{ name: 'test_subject_5', id: 'ts5' }} />
      <User user={{ name: 'test_subject_5', id: 'ts5' }} />
      <User user={{ name: 'test_subject_5', id: 'ts5' }} />
    </Panel>
  </Container>
)
