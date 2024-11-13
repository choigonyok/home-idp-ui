import React, { useState } from 'react';
import styled from 'styled-components';
import { FaGithub, FaInbox } from 'react-icons/fa';
import Loading from '../Components/Loading';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #fff;
  color: #000;
`;

const Title = styled.h1`
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 18px;
  margin-bottom: 40px;
  color: #000;
  text-align: center;
  max-width: 400px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  color: #000;
`;

const GitHubButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #444;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    margin-right: 10px;
    font-size: 24px;
  }
`;

const Login = () => {
  const [click, setClick] = useState(false);
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`

  return (
    <Container>
      {!click ? 
      <div>
        <Title>Sign In / Sign Up</Title>
        <Description>
          Sign in / Sign up with GitHub to continue and access.
        </Description>
          <ButtonContainer>
            <a href={url+'/login'}>
              <GitHubButton>
                <FaGithub /> Sign in / Sign up with GitHub
              </GitHubButton>
            </a>
          </ButtonContainer>
        </div>
      :
      <Loading/>
      }
    </Container>
  );
};

export default Login;
