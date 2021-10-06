import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';

import "./login-view.scss";

export function LoginView (props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://nhas-flixdb-2021.herokuapp.com/login', null, {
      params: {
      Username: username,
      Password: password
    }})
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user');
    });
  };

  return (
      <Col className='login-view'>
        <Form>
          <br></br>
            <h3>Login to MyFlix</h3>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
              type="text"
              value={username}
              placeholder="Enter username"
              onChange={e => setUsername(e.target.value)}
              autoComplete="username" 
              required minLength="5" />
              </Form.Group>
              <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                value={password}
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                autoComplete="password" 
                required />
            </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSubmit}>Submit </Button>
              <hr />
              <Link to="/register">
                <Button variant="info" type="button"> Register</Button>
              </Link>
        </Form>
        </Col>  
  );
}
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};