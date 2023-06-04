import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import categories from "../../categories";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateProducts } from "../../features/productSlice";
import ProductPreview from "../../components/ProductPreview/ProductPreview";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { dataBannerHome } from "./dataImageHome";
import salebanner from "./ImgDateHome/Summer_Sale_Background_4.jpg"
import { AiOutlineArrowsAlt } from "react-icons/ai";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 8);


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    Speed: 2000,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, [dispatch]);

  return (
    <>
      <Slider {...settings}>
        {dataBannerHome.map((item) => (
          <div className="layout_banner">
            <div className="banner_desc">
              <h1 style={{color: `${item.color}`}}>
              {item.title}
              </h1>
              <p>{item.description}</p>
            </div>
            <div className="banner_img">
              <img src={item.linkImg} alt="images banner" />
            </div>
          </div>
        ))}
      </Slider>
      <div className="featured-products-container container mt-4">
        <h2>Last products</h2>
        <div className="d-flex justify-content-center flex-wrap">
          {lastProducts.map((product) => (
            <ProductPreview {...product} />
          ))}
        </div>
        <div className="Home_last-product_seemore">
          <Link
            to="/category/all"
            className="btn--seemore"
          >
            See more <AiOutlineArrowsAlt style={{marginLeft: "6px"}}/>
          </Link>
        </div>
      </div>
      {/* sale banner */}
      <div className="sale__banner--container mt-2">
        <img
          src={salebanner}
          alt="banner_sale"
        />
      </div>
      <div className="recent-products-container container mt-4 mb-5">
        <h2>Categories</h2>
        <Row>
          {categories.map((category) => (
            <LinkContainer
              to={`/category/${category.name.toLocaleLowerCase()}`}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                    gap: "10px",
                  }}
                  className="category-tile"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Home;
