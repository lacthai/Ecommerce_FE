import React from "react";
import { Badge, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./ProductPreview.css";
import { BiDollarCircle } from "react-icons/bi";

function ProductPreview({ _id, category, name, pictures, price}) {
    return (
        <LinkContainer to={`/product/${_id}`} style={{ cursor: "pointer", width: "13rem", margin: "10px" }}>
            <Card style={{ width: "20rem", margin: "10px" }} className="card_product-preview">
                <Card.Img variant="top" className="product-preview-img" src={pictures[0].url} style={{ height: "150px", objectFit: "cover" }} />
                <Card.Body>
                    <Card.Title className="home_product--name">{name}</Card.Title>
                    <Badge bg="warning" text="dark" style={{marginLeft: "35%"}}>
                        {category}
                    </Badge>
                    <Card.Footer className="home_product--price"><BiDollarCircle style={{marginRight: "4px", fontSize: "1.3rem", color: "#eee600"}}/>{price}</Card.Footer>
                </Card.Body>
            </Card>
        </LinkContainer>
    );
}

export default ProductPreview;