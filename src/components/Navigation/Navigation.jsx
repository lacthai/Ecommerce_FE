import axios from "../../axios";
import React, { useRef, useState } from "react";
import { Navbar, Button, Nav, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout, resetNotifications } from "../../features/userSlice";
import "./Naviagtion.css";
import { GiPeanut } from "react-icons/gi";
import { BsCart4, BsTrashFill, BsMailbox } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { BiUserCircle, BiPowerOff } from "react-icons/bi";
import { MdSpaceDashboard, MdOutlineCreateNewFolder } from "react-icons/md";
import { Link } from "react-router-dom";

function Navigation() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const bellRef = useRef(null);
  const notificationRef = useRef(null);
  const [bellPos, setBellPos] = useState({});

  function handleLogout() {
    dispatch(logout());
  }
  const unreadNotifications = user?.notifications?.reduce((acc, current) => {
    if (current.status === "unread") return acc + 1;
    return acc;
  }, 0);

  function handleToggleNotifications() {
    const position = bellRef.current.getBoundingClientRect();
    setBellPos(position);
    notificationRef.current.style.display =
      notificationRef.current.style.display === "block" ? "none" : "block";
    dispatch(resetNotifications());
    if (unreadNotifications > 0)
      axios.post(`/users/${user._id}/updateNotifications`);
  }

  const setDeleteNotify = (e) => {};

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="header_logo">
            <GiPeanut style={{ marginRight: "10px", color: "#f9b42d" }} />
            <span>Pea</span>Shop
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="/"
              className="header_btn"
              style={{ fontSize: "1.1rem" }}
            >
              Home
            </Nav.Link>

            <NavDropdown
              title="Product"
              id="basic-nav-dropdown"
              className="header_btn"
              style={{ fontSize: "1.1rem" }}
            >
              <NavDropdown.Item>
                <Link to="/category/all" style={{textDecoration: "none", color: "black"}}>All Product</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/category/phones" style={{textDecoration: "none", color: "black"}}>Phone</Link>
              </NavDropdown.Item>
              <NavDropdown.Item to="/category/laptops">
                <Link to="/category/laptops" style={{textDecoration: "none", color: "black"}}>Laptop</Link>
              </NavDropdown.Item>
              <NavDropdown.Item to="/category/technology">
                <Link to="/category/technology" style={{textDecoration: "none", color: "black"}}>Other Technology</Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Services"
              id="basic-nav-dropdown"
              style={{ fontSize: "1.1rem" }}
            >
              <NavDropdown.Item to="/aboutus">About us</NavDropdown.Item>
              <NavDropdown.Item to="#action/3.2">Contact</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* if no user */}
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link className="btn-login">Login</Nav.Link>
              </LinkContainer>
            )}
            {user && !user.isAdmin && (
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>
                  {user?.cart.count > 0 && (
                    <span className="badge badge-warning" id="cartcount">
                      {user.cart.count}
                    </span>
                  )}
                </Nav.Link>
              </LinkContainer>
            )}

            {/* if user */}
            {user && (
              <>
                <Nav.Link
                  style={{ position: "relative" }}
                  onClick={handleToggleNotifications}
                >
                  <i
                    className="fas fa-bell"
                    ref={bellRef}
                    data-count={unreadNotifications || null}
                  ></i>
                </Nav.Link>
                <Nav.Link>
                  <img src={user.photoURL} alt="avatar" className="img_avatar"/>
                </Nav.Link>
                <NavDropdown
                  title={`${user.name} ${user.isAdmin ? "(admin)" : ""}`}
                  id="basic-nav-dropdown"
                >
                  {user.isAdmin && (
                    <>
                      <LinkContainer to="/admin" className="sidebar_box-icon">
                        <NavDropdown.Item>
                          <MdSpaceDashboard className="sidebar_icon" />{" "}
                          DashBoard
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer
                        to="/new-product"
                        className="sidebar_box-icon"
                      >
                        <NavDropdown.Item>
                          <MdOutlineCreateNewFolder className="sidebar_icon" />
                          Create Product
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer
                        to="/update-profile"
                        className="sidebar_box-icon"
                      >
                        <NavDropdown.Item>
                          <BiUserCircle className="sidebar_icon" /> Profile
                        </NavDropdown.Item>
                        </LinkContainer>
                    </>
                  )}
                  {!user.isAdmin && (
                    <div className="sidebar_detail-header">
                      <LinkContainer to="/cart" className="sidebar_box-icon">
                        <NavDropdown.Item>
                          <BsCart4 className="sidebar_icon" /> Cart
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orders" className="sidebar_box-icon">
                        <NavDropdown.Item>
                          <FaHistory className="sidebar_icon" /> Your Orders
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer
                        to="/update-profile"
                        className="sidebar_box-icon"
                      >
                        <NavDropdown.Item>
                          <BiUserCircle className="sidebar_icon" /> Profile
                        </NavDropdown.Item>
                      </LinkContainer>
                    </div>
                  )}

                  <NavDropdown.Divider />
                  <Button
                    variant="danger"
                    onClick={handleLogout}
                    className="logout-btn"
                  >
                    <BiPowerOff />
                  </Button>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      {/* notifications */}
      <div
        className="notifications-container"
        ref={notificationRef}
        style={{
          position: "absolute",
          top: bellPos.top + 30,
          left: bellPos.left - 270,
          display: "none",
        }}
      >
        <div className="notification-header">
          <h2>{user?.notifications.length} Notifications</h2>
          <p onClick={setDeleteNotify}>
            Clear All <BsTrashFill style={{ marginLeft: "3px" }} />
          </p>
        </div>
        {user?.notifications.length > 0 ? (
          user?.notifications.map((notification) => (
            <p className={`notification-${notification.status}`}>
              {notification.message}
              <br />
              <span>
                {notification.time.split("T")[0] +
                  " " +
                  notification.time.split("T")[1]}
              </span>
            </p>
          ))
        ) : (
          <div className="notification-body">
            <p className="no-notify">
              <BsMailbox style={{ fontSize: "2.5rem" }} />
              No notifcations yet
            </p>
          </div>
        )}
      </div>
    </Navbar>
  );
}

export default Navigation;
