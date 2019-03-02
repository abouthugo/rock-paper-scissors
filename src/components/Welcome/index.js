import React from 'react';
import WelcomeView from './WelcomeView';
import InputContainer from './Input.Container';
import TitleMessage from '../TitleMessage';
import Button from '../Button';

const Welcome = () => (
    <>
        <TitleMessage>Please enter a username</TitleMessage>
        <WelcomeView>
            <InputContainer/>
            <Button>Submit</Button>
        </WelcomeView>
    </>

);
export default Welcome;