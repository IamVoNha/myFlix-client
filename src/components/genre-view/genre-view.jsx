import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'

export default class GenreView extends React.Component {
  render(){
    const {genre, onBackClick} = this.props;

    return (
      <Card>
        <Card.Body>
          <Card.Title>{genre.Name}</Card.Title>
          <Card.Text>{genre.Description}</Card.Text>
          <Button onClick = {()=>{onBackClick();}} variant="outline-secondary">Back</Button>
        </Card.Body>
      </Card>
    );

  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};