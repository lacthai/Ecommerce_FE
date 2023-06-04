import React from "react";
import { Container, Nav, Tab, Col, Row } from "react-bootstrap";
import ClientsAdminPage from "../../components/ClientsAdminPage/ClientsAdminPage";
import DashboardProducts from "../../components/DashboardProducts/DashboardProducts";
import OrdersAdminPage from "../../components/OrdersAdminPage/OrdersAdminPage";
import "./AdminDashboard.css";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaUserShield } from "react-icons/fa";

function AdminDashboard() {
    return (
        <Container>
            <Tab.Container defaultActiveKey="products">
                <Row>
                    <Col sm={3} className="navbar_dashboard">
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="products" className="btn_dashboard"><i class="fa-solid fa-shop"></i>Products</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="orders" className="btn_dashboard"><HiOutlineShoppingCart style={{marginRight: "10px", fontSize: "1.3rem"}}/>Orders</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="clients" className="btn_dashboard"><FaUserShield style={{marginRight: "10px", fontSize: "1.3rem"}}/>Users</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="products">
                                <DashboardProducts />
                            </Tab.Pane>
                            <Tab.Pane eventKey="orders">
                                <OrdersAdminPage />
                            </Tab.Pane>
                            <Tab.Pane eventKey="clients">
                                <ClientsAdminPage />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
}

export default AdminDashboard;