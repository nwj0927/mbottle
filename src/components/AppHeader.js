import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import "./AppHeader.css"
import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"
import PersonIcon from "@mui/icons-material/Person"
import { Link } from "react-router-dom"

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
            <NavDropdown title="ABOUT" className="Nav-Dropdown">
              <NavDropdown.Item as={Link} to="/company#profile">
                회사개요
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/company#history">
                회사연혁
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/company#philosophy">
                경영이념
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="PRODUCTS" className="Nav-Dropdown">
              <NavDropdown.Item as={Link} to="/product">
                시리즈
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/series">
                섹션
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/action5">
                새로 추가할 메뉴
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/qna" className="Nav-Menu">
              SUPPORT
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="Nav-Menu">
              CONTACT
            </Nav.Link>
          </Nav>

          {/* 로그인 영역 */}
          <div className="Login-Area">
            {user ? (
              <>
                <PersonIcon sx={{ fontSize: "4vh" }} color="action" />
                <span className=".Nav-Menu">{user.displayName}</span>
                <Button variant="outline-white" onClick={onLogout}>
                  <LogoutIcon sx={{ fontSize: "4vh" }} color="action" />
                </Button>
              </>
            ) : (
              <Button
                variant="white"
                onClick={() => {
                  console.log("로그인 버튼 클릭됨")
                  onLogin()
                }}
              >
                <LoginIcon sx={{ fontSize: "4vh" }} color="action" />
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavScrollExample
