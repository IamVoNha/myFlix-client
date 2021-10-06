import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Link className="movie-card h-100" to={`movies/${movie._id}`}>
        <Card className="movie-card_card">
          <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
              <div className="movie-title">
                <Card.Title>{movie.Title}</Card.Title>
              </div>
              <div className="movie-info">
                <b>DISCRIPTION</b>
              <Card.Text>{movie.Description}</Card.Text>
              </div>
            </Card.Body>
        </Card>
      </Link>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};