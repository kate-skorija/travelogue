import React from "react";
import firebase from "firebase/app";
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const LoginWrapper = styled.section`
  background-color: black;
  color: white;
  width: 100vw;
  height: 100vh;
  margin: 0;
`;

const LoginContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  text-align: center;
  font-family: 'Arimo', sans-serif;
`;

const Header = styled.h1`
  font-family: 'Arial', 'sans-serif';
  font-size: 70px;
  padding-bottom: 0;
  margin-bottom: 0;
`;

const Paragraph = styled.p`
  font-size: 23px;
`;

const Input = styled.input`
  display: block;
  width: 375px;
  border: none;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 20px;
`;

const Button = styled.button`
  background-color: #ffcc33;
  border: none;
  margin: 10px;
  padding: 15px 40px;
  cursor: pointer;
  font-size: 20px;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: blue;
  }
`;

const Login = ({history}) => {  

  function doLogin(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      history.push('/explore');
    }).catch(function(error) {
      alert(error.message); 
    });
  }

  return (
    <React.Fragment>
      <LoginWrapper>
        <LoginContent>
          <Header>Travelogue</Header>
          <Paragraph>Log in to your account.</Paragraph>
          <form onSubmit={doLogin}>
            <Input
              type='text'
              name='signinEmail'
              placeholder='email' />
            <Input
              type='password'
              name='signinPassword'
              placeholder='password' />
            <Button type='submit'>Log In</Button>
          </form>
        </LoginContent>
      </LoginWrapper>
    </React.Fragment>
  );
}

export default withRouter(Login);