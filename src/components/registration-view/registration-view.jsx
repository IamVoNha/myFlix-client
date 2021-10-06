import React, {useState} from 'react';
import axios from 'axios';

import {Link} from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';

export function RegistrationView (_props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');


  const handleRegister = (e) => {

    // prevent page refresh
    e.preventDefault();

    axios
      .post(
        'https://nhas-flixdb-2021.herokuapp.com/users',
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        }
      )
      .then(
        (response) => {
          const data = response.data;
          console.log(data);
          window.open(
            '/',
            '_self'
          );
        }
      )
      .catch(
        (_err) => {
          console.log('Error, cannot register user.')
        }
      );

  }

  return(

    <Form className='register-view'>
      <Form.Group controlId="formUsername">
      <h1 className="h1">
        Join Now!
      </h1>
        <Form.Label className="text-base">
          Username:
        </Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={
            (e)=>{
              setUsername(e.target.value)
            }
          }
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
          <Form.Label className="text-base">
            Password:
          </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={
              (e) => {
                setPassword(e.target.value)
              }
            }
          />
      </Form.Group>

      <Form.Group controlId="formEmail">
          <Form.Label className="text-base">
            Email:
          </Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={
              (e) => {
                setEmail(e.target.value)
              }
            }
          />
      </Form.Group>

      <Form.Group controlId="formBirthday">

        <Form.Label className="text-base">
          Birthday:
        </Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={
            (e) => {
              setBirthday(e.target.value)
            }
          }
        />
      </Form.Group>
     
        <Button
          variant="primary"
          type="submit"
          onClick={handleRegister}
          >
          Register
        </Button>

      <Form.Group className="text-xs text-center mt-4">
        <span>
          Already have an account?
        </span>
        <Link
          to={'/'}
        >
          <Button
            variant="link"
            >
            Login
          </Button>
        </Link>
      </Form.Group>
    
    </Form>
  )
}