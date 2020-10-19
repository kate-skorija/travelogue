import React, { useState } from "react";
import firebase from "firebase/app";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogoutWrapper = styled.section`
  background-color: black;
  color: white;
  width: 100vw;
  height: 100vh;
  margin: 0;
`;

const LogoutContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  text-align: center;
  font-family: 'Arimo', sans-serif;
`;

const Header = styled.h3`
  font-size: 40px;
  padding: 0;
  margin: 0;
`;

const Paragraph = styled.p`
  font-size: 25px; 
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #ffcc33;
  border: none;
  margin: 30px 10px 10px 10px;
  padding: 15px 40px;
  cursor: pointer;
  font-size: 20px;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: blue;
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

function Logout() {

  const [loggedIn, setLoggedIn] = useState(true);

  function doLogout() {
    firebase.auth().signOut().then(function() {
      console.log("Signed out!");
      setLoggedIn(false);
    }).catch(function(error) {
      alert(error.message);
    });
  }

  return (
      <React.Fragment>
        <LogoutWrapper>
          <LogoutContent>
            <Header>Thanks for using Travelogue.</Header>
            <Header> See you again soon.</Header>
            {loggedIn ? <Button onClick={doLogout}>Log Out</Button> : <Paragraph>You have successfully logged out!</Paragraph>}
            <Button><StyledLink to='/explore'>Back to Travelogue</StyledLink></Button>
          </LogoutContent>
        </LogoutWrapper>
      </React.Fragment>
  )
}

export default Logout;