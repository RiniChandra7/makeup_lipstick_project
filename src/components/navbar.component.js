import React, {useContext, useEffect, useState} from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Navbar as Nb, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductContext } from '../contexts/product-data.context';

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const { dupeFinder } = useContext(ProductContext);
  const [dupeFinderEnabled, setDupeFinderEnabled] = useState(dupeFinder.current);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleLinkClick = () => {
    if (expanded) {
      setExpanded(false);
    }
  };

  /*useEffect(() => {
    setDupeFinderEnabled(false);
  }
  , [productsList.current]);*/

  return (
    <>
    {console.log("rendered navbar")}
      <Nb style={{ backgroundColor: '#b07082' }} variant="dark" expand="lg" expanded={expanded} onToggle={handleToggle}>
        <Nb.Brand as={Link} to="/" className="ml-4">Lipcolor Engine</Nb.Brand>
        <Nb.Toggle aria-controls="navbar-nav" />
        <Nb.Collapse id="navbar-nav">
          <Nav className="ml-auto" onSelect={handleLinkClick}>
            {console.log(dupeFinderEnabled)}
              <Nav.Link as={Link} to="/dupe-finder" className="mr-3" onClick={handleLinkClick} disabled={dupeFinderEnabled.current}>Dupe Finder</Nav.Link>
              <Nav.Link as={Link} to="/recommendations" className="mr-3" onClick={handleLinkClick}>Recommendations by Skin Tone</Nav.Link>
              <Nav.Link as={Link} to="/suggest-dupes" className="mr-3" onClick={handleLinkClick}>Suggest Dupes</Nav.Link>
          </Nav>
        </Nb.Collapse>
      </Nb>
      <Outlet />
    </>
  );
};

export default Navbar;
