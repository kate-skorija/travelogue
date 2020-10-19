import React from "react";
import firebase from "firebase/app";
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const RegisterWrapper = styled.section`
  background-color: black;
  color: white;
  width: 100vw;
  height: 100vh;
  margin: 0;
`;

const RegisterContent = styled.div`
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
  width: 470px;
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

const Register = ({history}) => {  

  function doRegister(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
      history.push('/explore');
    }).catch(function(error) {
      alert(error.message);
    });
  }

  return (
    <React.Fragment>
      <RegisterWrapper>
        <RegisterContent>
          <Header>Travelogue</Header>
          <Paragraph>For endless exploration, create a free account.</Paragraph>
          <form onSubmit={doRegister}>
            <Input
              type='text'
              name='email'
              placeholder='email' />
            <Input
              type='password'
              name='password'
              placeholder='Password' />
            <Button type='submit'>Register</Button>
          </form>
        </RegisterContent>
      </RegisterWrapper>
    </React.Fragment>
  );
}

export default withRouter(Register);