import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import ProductPreview from "../../components/ProductPreview/ProductPreview";
import "./CategoryPage.css";
import Pagination from "../../components/Pagination/Pagination";

const CategoryPage = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products/category/${category}`)
      .then(({ data }) => {
        setLoading(false);
        setProducts(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  }, [category]);

  if (loading) {
    <Loading />;
  }

  const productsSearch = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function ProductSearch({ _id, category, name, pictures, price }) {
    return (
      <ProductPreview
        _id={_id}
        category={category}
        name={name}
        pictures={pictures}
        price={price}
      />
    );
  }

  return (
    <div className="category-page-container">
      <div
        className={`pt-3 ${category}-banner-container category-banner-container`}
      >
        <h1 className="text-center">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
      </div>
      <Container>
        <Row>
          <Col sm={3}></Col>
          <Col sm={9}>
            <div className="filters-container search-product">
              <input
                type="search"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </Col>
        </Row>
      </Container>
      {productsSearch.length === 0 ? (
        <div className="not_product">
          <h1>Don't have any products</h1>
        </div>
      ) : (
        <Container>
          <Row>
            <Col sm={3} className="navbar_dashboard">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Link
                    to="/category/all"
                    className="btn_dashboard btn_hover"
                  >
                    All products
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    to="/category/phones"
                    className="btn_dashboard btn_hover"
                  >
                    Phones
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    to="/category/laptops"
                    className="btn_dashboard btn_hover"
                  >
                    Laptops
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    to="/category/technology"
                    className="btn_dashboard btn_hover"
                  >
                    Others Technology
                  </Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Pagination
                data={productsSearch}
                RenderComponent={ProductSearch}
                pageLimit={2}
                dataLimit={6}
                tablePagination={false}
              />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default CategoryPage;
