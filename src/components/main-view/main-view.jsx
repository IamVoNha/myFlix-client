import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import GenreView from '../genre-view/genre-view';
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from '../profile-view/profile-view';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export class MainView extends React.Component {

     constructor() {
         super();
         this.state = {
             movies: [],
             selectedMovie: null,
             user: null,
         } 
     }

    componentDidMount(){
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
      }
    }

    /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
    setSelectedMovie(movie) {
      this.setState({
        selectedMovie: movie
      });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
    onLoggedIn(authData) {
      console.log(authData);
      this.setState({
        user: authData.user.Username
      });
    
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      this.getMovies(authData.token);
    }
    
    /* When a user successfully logs out */
    onLoggedOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.setState({
        user: null
      });
    }

    getUsers(token) {
      axios.post('https://nhas-flixdb-2021.herokuapp.com/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          // Assign the result to the state
          this.setState({
            users: response.data
          });
          console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    onRegister(register) {
      this.setState({
        register
      });
    }

    getMovies(token) {
      axios.get('https://nhas-flixdb-2021.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }

     render() {
            const { movies, user, userData, token } = this.state;
      
      return (
        
        <Router>

        <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="/">Movies</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Movies</Nav.Link>
            <Nav.Link href="/user">User account</Nav.Link>
            {!user && <Nav.Link href="/register">Register</Nav.Link>}   
            {user == null ?
            <Nav.Link href="/login" >Log In</Nav.Link>: 
            <Nav.Link href="#logout" onClick={() => this.onLoggedOut(null)}>Log Out</Nav.Link>}               
          </Nav>
          </Container>
        </Navbar>


        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {

            if (!user) return 
            <Col md={8}>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
            
            <Col md={3} key={m._id}>
                <MovieCard movie={m}  token={token} userData={userData}/>
              </Col>
            ))
          }} 
          />

            <Route path="/login" render={({history}) => {
              if(user) return <Redirect to="/" />
              return <Col md={8}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} onBackClick={() => history.goBack()}/>
              </Col>
            }} />
      
            <Route path="/register" render={({history}) => {
              if(user) return <Redirect to="/" />
              return <Col md={8}>
                <RegistrationView onBackClick={() => history.goBack()}/>
              </Col>
            }} />


            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/directors/:name" render={({ match, history }) =>{
              if(movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/genres/:name" render={({ match, history }) =>{
              if(movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }} />


          <Route path="/user" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return (
            <Col md={8}>
              <ProfileView user={userData} token={token} onBackClick={() => history.goBack()} />
            </Col>
            )}} />
        
        
        </Row>
      </Router>
         );
     }
 }
