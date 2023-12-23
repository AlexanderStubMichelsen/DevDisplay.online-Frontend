import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import '../css/NavBar.css';

function NavBar() {
  return (
    <>
    <div className="container">
    <Nav fill variant="tabs" defaultActiveKey="/home" className="sticky-top-navbar">
      <Nav.Item>
        <LinkContainer to="/">
          <Nav.Link><p>Home</p></Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/images">
          <Nav.Link><p>Images</p></Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
      <LinkContainer to="/savedImg">
          <Nav.Link><p>Saved Images</p></Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
    </div>
    </>
  );
}

export default NavBar;
