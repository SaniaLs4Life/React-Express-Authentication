import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Dropdown, Nav, Icon } from 'rsuite';
import { Link, useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { logoutAction } from '../store/actions';

export default function Navigation() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user
  }));

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logoutAction());
    history.push('/signin');
  };

  const decodeToken = token => {
    return jwtDecode(token);
  };

  return (
    <Navbar>
      <Navbar.Body>
        <Nav>
          <Link to="/">
            <Nav.Item componentClass="span" icon={<Icon icon="home" />}>
              Home
            </Nav.Item>
          </Link>
          <Dropdown title="About">
            <Dropdown.Item>Company</Dropdown.Item>
            <Dropdown.Item>Team</Dropdown.Item>
            <Dropdown.Item>Contact</Dropdown.Item>
          </Dropdown>
        </Nav>
        <Nav pullRight>
          {isAuthenticated ? (
            <div onClick={handleLogout}>
              <Nav.Item componentClass="span" icon={<Icon icon="sign-in" />}>
                {user && decodeToken(user.token).fullname} - Logout
              </Nav.Item>
            </div>
          ) : (
            <Link to="/signup">
              <Nav.Item componentClass="span" icon={<Icon icon="sign-in" />}>
                Sign in
              </Nav.Item>
            </Link>
          )}
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
}
