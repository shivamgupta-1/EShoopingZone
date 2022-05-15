import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaHeart, FaShare, FaShoppingCart } from 'react-icons/fa';
import ProductService from '../../services/product.Service';
import './Product.css'
import ReactPaginate from "react-paginate";
import ProductCard from './ProductCard';


function Product  () {
    const [products ,setProductData]=useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [productInfo, setProInfo] = useState("");
    const [searchOn,setSearchOn] = useState(true);
    const [category,setCategory]=useState("");
    const [type,setType]=useState("");
    const [searchTerm,setSearchTerm]=useState([]);
    const [pageNumber, setPageNumber] = useState(0);
	const usersPerPage = 5;
	const pagesVisited = pageNumber * usersPerPage;

    const pageCount = Math.ceil(products.length / usersPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

    useEffect(()=>{
        getProductData()
    },[])
    const getProductData =()=>{
      ProductService.allProducts()
        .then((response) =>{
            setProductData(response.data);
            console.log(response.data);
        });
    };
    const addToCart=(res)=>{

        setModalOpen(true);
        setProInfo(res);

    }

    const searchByType = ()=>{
        setSearchOn(true);
        ProductService.getProductByType(type).then((response) =>{
            setProductData(response.data);
            console.log(response.data);
        });
    }
    const searchByCategory = ()=>{
        setSearchOn(true);
        ProductService.getProductByCategory(category).then((response) =>{
            setProductData(response.data);
            console.log(response.data);
        });
    }

    const allProducts =()=>{
        setSearchOn(false);
        getProductData();
    }

    return (
      <>
       
      <nav class="navbar navbar-expand-lg navbar-dark mt-5" >
      <ul class="navbar-nav mr-auto">

      <li className='nav-item'>
            <button style={{ display: "flex", marginRight: 10 }}
                  class="btn btn-outline-dark my-2 my-sm-0 "
                  type="submit"
                  onClick={allProducts}> All Product</button>
        </li>
          <li className="nav-item ">
      <label  style={{ fontSize:20, color:"slategrey" , fontWeight:500 ,marginRight:20 ,paddingBottom:10}} class="form-label " htmlFor="category">Search By Type :</label>
      </li>


        
       <li className="nav-item">
                <input
                  style={{ display: "flex" }}
                  class="form-control mr-sm-2 "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={type}
                  onChange={(e)=>{
                      setSearchTerm(e.target.value);
                      setType(e.target.value)
                        setSearchOn(true);
                    
                    }}
                      
                
                />
              </li>
              <li className="nav-item">
                {" "}
                
                <button
                  style={{ display: "flex", marginRight: 10 }}
                  class="btn btn-outline-dark my-2 my-sm-0 "
                  type="submit"
                  onClick={searchByType}
                 
                >
                  Search
                </button>
                
              </li>
              
      </ul>
        <ul class="navbar-nav mr-auto" style={{ marginLeft: "auto" }}>
        <li className="nav-item ">
      <label  style={{ fontSize:20, color:"slategrey" , fontWeight:500 ,marginRight:20 ,paddingBottom:10}} class="form-label" htmlFor="category">Search By Category : </label>
      </li>
     <li className="nav-item ">
      <select class="form-select" aria-label="Default select example" id="category" value={category} 
              onChange={(e) => setCategory(e.target.value)}>
  <option selected>Select from this options</option>
  <option value="Electronics">Electronics</option>
  <option value="Fashion">Fashion</option>
        
</select>
</li>
       
              <li className="nav-item">
                {" "}
                
                <button
                  style={{ display: "flex", marginRight: 10 }}
                  class="btn btn-outline-dark my-2 my-sm-0"
                  type="submit"
                  onClick={searchByCategory}
                 
                >
                  Search
                </button>
                
              </li>
              </ul>
              
              </nav>
              {searchOn ? (
              <div>  <h2 style={{ color:"#B048B5" }}>Search Result :</h2>
              
              <div class="container product-main">
    <div class="shop-default shop-cards shop-tech">
        <div class="row">
        {products
        .filter((val)=>{
            if(searchTerm==""){
                return val
            }else if(val.productType.toLowerCase().includes(searchTerm.toLowerCase())){
                return val;
            }
        })
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((product,index) =>
            <div  class="col-md-4 product-div" key={index} >
                <div class="block product no-border z-depth-2-top z-depth-2--hover" style={{ backgroundColor:"lavenderblush" }}>
                    <div class="block-image">
                        
                            <a href="#">
                            <img  className='product-img rounded mx-auto d-block'  alt={product.productName} src={product.image} />
                        </a>
                        
                        <span class="product-ribbon product-ribbon-right product-ribbon--style-1 bg-white text-uppercase">5% off</span>
                    </div>
                    <div class="block-body text-center">
                        <h3 class="heading heading-5 strong-600 text-capitalize">
                            <a href="#" style={{ textDecoration:"none" ,color:"darkcyan" }} >
                                {product.productName}
                            </a>
                        </h3>
                        <p class="product-description">
                            {product.productType}
                        </p>
                        <p class="product-description">
                            Rs. {product.price}
                        </p>
                        <div class="product-colors mt-2">
                            <div class="color-switch float-wrapper">
                                <a href="#" class="bg-purple"></a>
                                <a href="#" class="bg-pink"></a>
                                <a href="#" class="bg-blue"></a>
                            </div>
                        </div>
                        <div class="product-buttons mt-4">
                            <div class="row align-items-center">
                                <div class="col-2">
                                    <button type="button" class="btn-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Favorite">
                                        <FaHeart style={{ color:"red" }}/>
                                    </button>
                                </div>
                                <div class="col-2">
                                    <button type="button" class="btn-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Compare">
                                         <FaShare style={{ color:"blue" }}/>
                                    </button>
                                </div>
                                <div class="col-8">
                                    <button type="button" class="btn btn-block btn-dark btn-circle btn-icon-left" onClick={()=> addToCart(product)}>
                                        <FaShoppingCart/> Add to cart
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
            </div>
        )}

{modalOpen && productInfo && <ProductCard setOpenModal={setModalOpen} data={productInfo} />}
            </div>
            <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
            </div>
            </div>
              
              </div>):(

   
      <div class="container product-main">
    <div class="shop-default shop-cards shop-tech">
        <div class="row">
        {products
         .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((product,index) =>
            <div  class="col-md-4 product-div" key={index} >
                <div class="block product no-border z-depth-2-top z-depth-2--hover" style={{ backgroundColor:"lavenderblush" }}>
                    <div class="block-image">
                        
                            <a href="#">
                            <img  className='product-img rounded mx-auto d-block'  alt={product.productName} src={product.image} />
                        </a>
                        
                        <span class="product-ribbon product-ribbon-right product-ribbon--style-1 bg-white text-uppercase">5% off</span>
                    </div>
                    <div class="block-body text-center">
                        <h3 class="heading heading-5 strong-600 text-capitalize">
                            <a href="#" style={{ textDecoration:"none" ,color:"darkcyan" }} >
                                {product.productName}
                            </a>
                        </h3>
                        <p class="product-description">
                            {product.productType}
                        </p>
                        <p class="product-description">
                            Rs. {product.price}
                        </p>
                        <div class="product-colors mt-2">
                            <div class="color-switch float-wrapper">
                                <a href="#" class="bg-purple"></a>
                                <a href="#" class="bg-pink"></a>
                                <a href="#" class="bg-blue"></a>
                            </div>
                        </div>
                        <div class="product-buttons mt-4">
                            <div class="row align-items-center">
                                <div class="col-2">
                                    <button type="button" class="btn-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Favorite">
                                        <FaHeart style={{ color:"red" }}/>
                                    </button>
                                </div>
                                <div class="col-2">
                                    <button type="button" class="btn-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Compare">
                                         <FaShare style={{ color:"blue" }}/>
                                    </button>
                                </div>
                                <div class="col-8">
                                    <button title='add' type="button" class="btn btn-block btn-dark btn-circle btn-icon-left" onClick={()=> addToCart(product)}>
                                        <FaShoppingCart/> Add to cart
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
            </div>
            
        )}

{modalOpen && productInfo && <ProductCard setOpenModal={setModalOpen} data={productInfo} />}
<ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
            </div>
            </div>
            </div>

              )}
            
      </>
        
      );
}

export default Product
