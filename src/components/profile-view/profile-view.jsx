import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Card, CardDeck, Form, Row } from 'react-bootstrap';
import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Name: null,
      Username: null,
      Password: null,
      Email: null,
      Birthdate: null,
      FavoriteMovies: [],
      validated: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }


  // get user method
  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://nhas-flixdb-2021.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          Name: response.data.Name,
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthdate: response.data.Birthdate,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  handleRemoveFavorite(e, movie) {
    e.preventDefault();

    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .delete(`https://nhas-flixdb-2021.herokuapp.com/users/${username}/Movies/${movie}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Movie removed from favorites');
        this.componentDidMount();
        // window.open('_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  handleUpdate(e, newName, newUsername, newPassword, newEmail, newBirthdate) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.put(`https://nhas-flixdb-2021.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Name: newName ? newName : this.state.Name,
        Username: newUsername ? newUsername : this.state.Username,
        Password: newPassword ? newPassword : this.state.Password,
        Email: newEmail ? newEmail : this.state.Email,
        Birthdate: newBirthdate ? newBirthdate : this.state.Birthdate,
      },
    })
      .then((response) => {
        alert('Saved Changes');
        this.setState({
          Name: response.data.Name,
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthdate: response.data.Birthdate,
        });
        localStorage.setItem('user', this.state.Username);
        window.open(`/users/${username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  setName(input) {
    this.Name = input;
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthdate(input) {
    this.Birthdate = input;
  }

  handleDeleteUser(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.delete(`https://nhas-flixdb-2021.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been deleted.');
        window.open(`/`, '_self');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { FavoriteMovies, validated,} = this.state;
    const { movies } = this.props;
    
    return (
      <Row className="profile-view">
        <Card className="profile-card">
          <h1 className="text-center">Your Account</h1>
          <h3 className="section">Update Profile</h3>
          <Card.Body>
            <Form noValidate validated={validated} className="update-form" onSubmit={(e) => this.handleUpdate(e, this.Name, this.Username, this.Password, this.Email, this.Birthdate)}>

                  <Form.Group controlId="formName">
                      <Form.Label className="form-label">Name</Form.Label>
                      <Form.Control type="text" placeholder="Change Name" onChange={(e) => this.setName(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="formBasicUsername">
                      <Form.Label className="form-label">
                        Username<span className="required">*</span>
                      </Form.Label>
                      <Form.Control type="text" placeholder="Change Username" onChange={(e) => this.setUsername(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                      <Form.Label className="form-label">
                        Password<span className="required">*</span>
                      </Form.Label>
                      <Form.Control type="password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                      <Form.Label className="form-label">
                        Email<span className="required">*</span>
                      </Form.Label>
                      <Form.Control type="email" placeholder="Change Email" onChange={(e) => this.setEmail(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="formBasicBirthday">
                      <Form.Label className="form-label">Birthdate</Form.Label>
                      <Form.Control type="date" placeholder="Change Birthdate" onChange={(e) => this.setBirthdate(e.target.value)} />
                  </Form.Group>

                  <Button variant='outline-danger' type="submit">
                      Update
                  </Button>

              <h3>Delete your Account</h3>
             
                  <Button variant='outline-danger' onClick={(e) => this.handleDeleteUser(e)}>
                    Delete Account
                  </Button>
             
             <h2>Your Favorites Movies</h2>
          
            {FavoriteMovies.length === 0 && <div className="text-center">Empty.</div>}

                  <div className="favorites-movies ">
                    {FavoriteMovies.length > 0 &&
                      movies.map((movies) => {
                        if (movies._id === FavoriteMovies.find((favMovie) => favMovie === movies._id)) {
                          return (
                            <div className="movie-card-deck">
                              <div className="favorites-item card-content" style={{ width: '18rem', float: 'left' }} key={movies._id}>
                                <Card.Body>
                                <Card.Img style={{ width: '18rem' }} className="movieCard" variant="top" src={movies.ImagePath} />
                                  <Card.Title className="movie-card-title">{movies.Title}</Card.Title>
                                  <Button variant='outline-danger' size="sm" block className="profile-button remove-favorite" onClick={(e) => this.handleRemoveFavorite(e, movies._id)}>
                                    Remove
                                  </Button>
                                </Card.Body>
                              </div>
                            </div>
                          );
                        }
                      })}
                  </div>
            </Form>

          </Card.Body>
        </Card>
      </Row >
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      })
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string,
  }),
};