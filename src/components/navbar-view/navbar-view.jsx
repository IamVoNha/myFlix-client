import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar, Nav } from 'react-bootstrap';

export class NavBar extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  render() {
    const { user } = this.props;
    const movies = `/`;
    const profile = `/users/${user}`;

    if (!user) return null;

    return (
      <nav className="navbar">
          <Navbar className ='color-nav' collapseOnSelect fixed='top' expand="lg" variant="dark" >
          <h1 className="logo">
              <span>my</span>
              Flix
                </h1>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">

                            <Nav.Link as={Link} to={movies} className="link-text">
                              Movies
                            </Nav.Link>

                            <Nav.Link as={Link} to={profile} className="link-text">
                              Profile
                            </Nav.Link>

                            <Nav.Link to={'/'} onClick={this.onLoggedOut} className="link-text">
                              Log Out
                            </Nav.Link>

                        </Nav>

                    </Navbar.Collapse>
                </Navbar>
      </nav>
    );
  }
}
export default NavBar;