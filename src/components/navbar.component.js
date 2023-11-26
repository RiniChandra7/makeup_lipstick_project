import React, {useContext, useEffect, useState} from 'react';
//import { useHistory } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';
import { Navbar as Nb, Nav, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductContext } from '../contexts/product-data.context';
import { UserContext } from '../contexts/user-data.context';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const { dupeFinder } = useContext(ProductContext);
  const [dupeFinderEnabled, setDupeFinderEnabled] = useState(dupeFinder.current);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const {userData, setUserData} = useContext(UserContext);
  const user = userData;
  //const history = useHistory();

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleLinkClick = () => {
    if (expanded) {
      setExpanded(false);
    }
  };

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
      console.log(error);
  };

  const handleSuggestDupesClick = () => {
    // Check if the user is logged in
    const userLoggedIn = userData;
    console.log(userLoggedIn);

    if (!userLoggedIn) {
      // If not logged in, show the login modal
      setShowLoginModal(true);
    } else {
      // If logged in, proceed with the original functionality
      // You may want to replace '/suggest-dupes' with the actual route
      //navigate('/suggest-dupes');
      window.location.href = window.location.origin + "/suggest-dupes";
    }
  };

  const handleCloseLoginModal = () => {
    // Close the login modal
    setShowLoginModal(false);
  };

  const handleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUserData(codeResponse);
      handleCloseLoginModal();
      //window.location.href = window.location.origin + "/suggest-dupes";
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  /*useEffect(
    () => {
      console.log(userData);
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setUserData(res.data);
                })
                .catch((err) => console.log(err));
        }
    },
    [ user ]
);*/

  const logOut = () => {
    googleLogout();
    setUserData(null);
    window.location.href = window.location.origin;
  };

  /*useEffect(() => {
    setDupeFinderEnabled(false);
  }
  , [productsList.current]);*/

  return (
    <>
    {console.log("rendered navbar")}
    {console.log(userData)}
      <Nb style={{ backgroundColor: '#b07082' }} variant="dark" expand="lg" expanded={expanded} onToggle={handleToggle}>
        <Nb.Brand as={Link} to="/" className="ml-4">Lipcolor Engine</Nb.Brand>
        <Nb.Toggle aria-controls="navbar-nav" />
        <Nb.Collapse id="navbar-nav">
          <Nav className="ml-auto" onSelect={handleLinkClick}>
            {console.log(dupeFinderEnabled)}
              <Nav.Link as={Link} to="/dupe-finder" className="mr-3" onClick={handleLinkClick} disabled={dupeFinderEnabled.current}>Dupe Finder</Nav.Link>
              <Nav.Link as={Link} to="/recommendations" className="mr-3" onClick={handleLinkClick}>Recommendations by Skin Tone</Nav.Link>
              <Nav.Link as={Link} to="/suggest-dupes" className="mr-3" onClick={handleSuggestDupesClick}>Suggest Dupes</Nav.Link>
              <Nav.Link as={Link} className="mr-3" onClick={logOut}>LogOut</Nav.Link>
          </Nav>
        </Nb.Collapse>
      </Nb>
      <Outlet />

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={handleCloseLoginModal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your Google Sign-In button or other login components here */}
          <Button variant="primary" onClick={handleLogin}>
            Sign in with Google
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navbar;
