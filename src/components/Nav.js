import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavWrapper = styled.section`
  display: grid;
  grid-template-columns: 91% 100px;
  grid-template-rows: 12vh;
  align-items: center;
  padding: 0 55px;
`;

const Header = styled.h1`
  font-family: 'Arial', sans-serif;
  color: white;
  text-shadow: -4px 4px 0px #04047c,
  -6px 6px 0px blue;
  margin-left: 16px;
  font-size: 37px;
`;

const Button = styled.button`
  background-color: #ffcc33;
  padding: 12px 0;
  font-size: 16px;
  cursor: pointer;
  border: none;
  text-decoration: none;

  &:hover {
    background-color: red;
  }
`;

const StyledLink = styled(Link)`
  font-family: 'Arimo', sans-serif;


  &:link {
    text-decoration: none;
    color: black
  }
  &:visited {
    text-decoration: none;
    color: black
  }
  &:hover {
    text-decoration: none;
  }
  &:active {
    text-decoration: none;
  }
`;

function Nav() {

  return (
    <React.Fragment>
      <NavWrapper>
        <Header><em>TRAVELOGUE</em></Header>
        <Button><StyledLink to="/logout">Logout</StyledLink></Button>
      </NavWrapper>
    </React.Fragment>
  );
}

export default Nav;