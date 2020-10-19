import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const SplashWrapper = styled.section`
  background-color: black;
  color: white;
  width: 100vw;
  height: 100vh;
  margin: 0;
`;

const SplashContent = styled.section`
  font-family: 'Arimo', sans-serif;
  font-size: 30px;
  width: 650px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-75%, 0%);
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -90%);
  font-family: 'Arial', 'sans-serif';
  font-size: 200px;
`;

const Button = styled.button`
  background-color: #ffcc33;
  border: none;
  margin: 10px 20px 0 0;
  cursor: pointer;
  padding: 8px 40px 12px 40px;

  &:hover {
    background-color: blue;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 20px;
  color: black;
`;

function Splash() {

  return (
    <React.Fragment>
      <SplashWrapper>
          <Title>Travelogue</Title>
          <SplashContent>
            <p>Your visual travel journal. Explore our map to keep track of places you want to go, and places you’ve been. Create a free account to save your pins.</p>
            <Button><StyledLink to="/register">Register</StyledLink></Button>
            <Button><StyledLink to="/login">Login</StyledLink></Button>
          </SplashContent>
      </SplashWrapper>
    </React.Fragment>
  );
}

export default Splash;