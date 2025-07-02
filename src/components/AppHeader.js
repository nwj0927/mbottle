import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
// import Form from "react-bootstrap/Form"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import "./AppHeader.css"
import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"
import PersonIcon from "@mui/icons-material/Person"
function NavScrollExample({ user, onLogin, onLogout }) {
  return (
    <Navbar expand="lg" className="Nav" sticky="top">
      <Container fluid>
        <Navbar.Brand href="/" className="Nav-Brand">
          M·BOTTLE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: "80vh" }}
            navbarScroll={false}
          >
            <NavDropdown title="COMPANY" className="Nav-Dropdown">
              <NavDropdown.Item href="Company">회사개요</NavDropdown.Item>
              <NavDropdown.Item href="Philosophy">경영이념</NavDropdown.Item>
              <NavDropdown.Item href="Company">특허 및 인증</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="PRODUCT" className="Nav-Dropdown">
              <NavDropdown.Item href="action3">Series</NavDropdown.Item>
              <NavDropdown.Item href="action4">Section</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="action5">
                새로 추가할 메뉴
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link className="Nav-Menu" href="#action2">
              PRODUCT
            </Nav.Link>
            <Nav.Link className="Nav-Menu" href="#action2">
              Q&A
            </Nav.Link>
            <Nav.Link className="Nav-Menu" href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          {/* 검색 영역 */}
          {/* <Form className="d-flex me-3">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}

          {/* 로그인 영역 */}
          {user ? (
            <div className="d-flex align-items-center">
              <PersonIcon sx={{ fontSize: "30px" }} color="action" />
              <span className=" fs-4">{user.displayName}</span>
              <Button variant="outline-white" onClick={onLogout}>
                <LogoutIcon sx={{ fontSize: "30px" }} color="action" />
              </Button>
            </div>
          ) : (
            <Button
              variant="white"
              onClick={() => {
                console.log("로그인 버튼 클릭됨")
                onLogin()
              }}
            >
              <LoginIcon sx={{ fontSize: "30px" }} color="action" />
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavScrollExample
