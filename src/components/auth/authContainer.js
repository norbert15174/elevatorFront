import React from 'react';
import styled from 'styled-components';
import Login from './login';


const Container = styled.div`

    width: 100vw;
    height: 100vh;
    background: url("https://storage.googleapis.com/telephoners/elevator-5092073_1920.jpg");
    background-size: 100% 100%;
    min-height: 800px;
`;

function AuthContainer(){
    return(
        <Container>
            <Login></Login>
        </Container>
    )
}

export default AuthContainer;