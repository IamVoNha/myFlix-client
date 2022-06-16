import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import "./movie-view.scss";

 export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  addFavorite() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https://nhas-flixdb-2021.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(_response => {
        alert(`Added to Favorites List`)
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  render(){
    const {movie, onBackClick} = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick = {()=>{onBackClick(null);}} variant="outline-secondary">Back</Button>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="outline-warning">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="outline-warning">Genre</Button>
          </Link>
          <Button variant='outline-danger' className="fav-button" value={movie._id} onClick={(e) => this.addFavorite(e, movie)}>
            Add to Favorites
          </Button>
        </Card.Body>
      </Card>
    );

  }
}

MovieView.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImgPath: PropTypes.string.isRequired,
  }),
};
