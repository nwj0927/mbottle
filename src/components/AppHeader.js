import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import "./AppHeader.css"

function NavScrollExample() {
  /**
   *  Sticky top <Navbar sticky="top" />
   *  Fixed top <Navbar fixed="top" />
   *  Nav className = ms-auto... : 우측정렬 / me-auto : 좌측정렬
   *
   */
  return (
    <Navbar expand="lg" className="Nav">
      <Container fluid>
        <Navbar.Brand href="/" className="Nav-Brand">
          M·BOTTLE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" sticky="top" fixed="top" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: "80vh" }} // 세로 40% 유지
            navbarScroll={false}
          >
            <NavDropdown
              className="Nav-Dropdown"
              title="COMPANY"
              id="basic-nav-up"
            >
              <NavDropdown.Item href="Company">회사개요</NavDropdown.Item>
              <NavDropdown.Item href="Philosophy">경영이념</NavDropdown.Item>
              <NavDropdown.Item href="Company">특허 및 인증</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              className="Nav-Dropdown"
              title="PRODUCT"
              id="basic-nav-up"
            >
              <NavDropdown.Item href="action3">Series</NavDropdown.Item>
              <NavDropdown.Item href="action4">Section</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="action5">
                새로 추가할 메뉴
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link className="Nav-Menu" href="#action2">
              PROUDCT
            </Nav.Link>
            <Nav.Link className="Nav-Menu" href="#action2">
              Q&A
            </Nav.Link>
            <Nav.Link className="Nav-Menu" href="#" disabled>
              Link
            </Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavScrollExample
