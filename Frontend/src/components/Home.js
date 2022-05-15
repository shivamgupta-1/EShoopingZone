import React, { useEffect, useState } from "react";
import ProductService from "../services/product.Service";
import Carousel from "react-bootstrap/Carousel";
import {categories} from '../data'
import "../css/Home.css";
import home_img from '../images/home_img.jpg'
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [products, setProductData] = useState([]);
  const navigate= useNavigate();

  useEffect(() => {
    getProductData();
  }, []);
  const getProductData = () => {
    ProductService.allProducts().then((response) => {
      setProductData(response.data);
      console.log(response.data);
    });
  };
  const navigateTo = ()=>{
    navigate("/products");
  }

  return (
    <div className="home-main">
      <div className="home__container">
       
        <img
          className="home__image"
          src={home_img}
          alt=""
        />
         <button onClick={navigateTo} className="home_btn">Shop Now</button>
        <div className="home__row">
          <h3 className="home-head">Welcome to Eshopping Zone</h3>
          <h5 className="home-head">Start Shopping...</h5>
          <div>
        <  section class="section-products">
        <div class="container-xl">
	<div class="row">
		<div class="col-md-12">
			<h2 className="h2">Featured <b>Products</b></h2>
			<div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="0">
	
			<ol class="carousel-indicators">
				<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
				<li data-target="#myCarousel" data-slide-to="1"></li>
				<li data-target="#myCarousel" data-slide-to="2"></li>
			</ol>   
		
			<div class="carousel-inner">
				<div class="item carousel-item active">
					<div class="row pb-2">
            {categories.map((c,index)=>
						<div class="col-sm-3" key={index}>
							<div class="thumb-wrapper mb-2">
								
								<div class="img-box">
									<img src={c.img} class="img-fluid" alt=""/>									
								</div>
								<div class="thumb-content">
									<h4>{c.title}</h4>									
									
									<p class="item-price"> <b>{c.offer} off</b></p>
									<button onClick={navigateTo} class="btn btn-primary">Explore</button>
								</div>						
							</div>
						</div>
            )}
						
							
					
					</div>
				</div>
			</div>
	

		</div>
		</div>
	</div>
</div>
</section>
          </div>
          <Carousel showArrows={true}  fade variant="dark" itemsToShow={2} className="home_carousel">
            {products.map((product, index) => (
              
              <Carousel.Item interval={5000} key={index}>
                <a href="/products">
                  <img
                    className="d-block w-100 home-img"
                    src={product.image}
                    alt="First slide"
                  />
                </a>
                <Carousel.Caption>
                  <h3 style={{ color: "black" }}>{product.productName}</h3>
                  <p style={{ color: "#324685", fontSize: 25 }}>
                    {product.price}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            
              
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Home;
