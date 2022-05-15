import React, { useRef, useState } from 'react'
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import ProductService from '../../services/product.Service';

const AddProduct = () => {

  const form = useRef();
  const checkBtn = useRef();

  const [productId, setProductId] = useState("");
  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [specification, setSpecification] = useState("");

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const addProduct = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      let data = {
        productId,
        productType,
        productName,
        category,
        rating,
        review,
        image,
        price,
        description,
        specification,
        
      };
      console.log(data);
      ProductService.addProduct(data).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);

          alert("Product added successfuly");
          window.location.reload(false);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };
  const updateProduct = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      let data = {
        productId,
        productType,
        productName,
        category,
        rating,
        review,
        image,
        price,
        description,
        specification,
        
      };
      console.log(data);
      ProductService.updateProduct(productId,data).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);

          alert("Product updated successfuly");
          window.location.reload(false);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="mt-5 mb-5" style={{ alignSelf: "center" }}>
      <div className="container">
      <h3>ADD OR UPDATE  PRODUCT </h3>

        <Form class="form-horizontal" ref={form}>
            {!successful && (
              <div>
                <div class="form-group">
                  <label class="col-md-4 control-label" htmlFor="productId">
                    PRODUCT ID
                  </label>
                  <div class="col-md-4">
                    <input
                      id="product_id"
                      name="productId"
                      placeholder="PRODUCT ID"
                      class="form-control input-md"
                      value={productId}
                      required=""
                      type="text"
                      onChange= {(e)=>{setProductId(e.target.value)}}
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-md-4 control-label" htmlFor="productName">
                    PRODUCT NAME
                  </label>
                  <div class="col-md-4">
                    <input
                      id="product_name"
                      name="productName"
                      placeholder="PRODUCT NAME"
                      value={productName}
                      class="form-control input-md"
                      required=""
                      type="text"
                      onChange= {(e)=>{setProductName(e.target.value)}}
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-md-4 control-label" htmlFor="productType">
                    PRODUCT TYPE
                  </label>
                  <div class="col-md-4">
                    <input
                      id="product_name_fr"
                      name="productType"
                      placeholder="PRODUCT TYPE"
                      value={productType}
                      class="form-control input-md"
                      required=""
                      type="text"
                      onChange= {(e)=>{setProductType(e.target.value)}}
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-md-4 control-label" htmlFor="category">
                    PRODUCT CATEGORY
                  </label>
                  <div class="col-md-4">
                    <input
                      id="product_categorie"
                      name="category"
                      value={category}
                      class="form-control"
                      onChange= {(e)=>{setCategory(e.target.value)}}
                    ></input>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-md-4 control-label" htmlFor="review">
                    Product REVIEW
                  </label>
                  <div class="col-md-4">
                    <input
                      id="available_quantity"
                      name="review"
                      placeholder="Product review "
                      value={review}
                      class="form-control input-md"
                      required=""
                      type="text"
                      onChange= {(e)=>{setReview(e.target.value)}}
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-md-4 control-label" htmlFor="rating">
                    PRODUCT RATING
                  </label>
                  <div class="col-md-4">
                    <input
                      id="product_weight"
                      name="rating"
                      placeholder="Product rating out of 5"
                      value={rating}
                      class="form-control input-md"
                      required=""
                      type="text"
                      onChange= {(e)=>{setRating(e.target.value)}}
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-md-4 control-label" htmlFor="description">
                    PRODUCT DESCRIPTION
                  </label>
                  <div class="col-md-4">
                    <textarea
                      class="form-control"
                      id="product_description"
                      name="description"
                      value={description}
                      placeholder="product description"
                      onChange= {(e)=>{setDescription(e.target.value)}}
                    ></textarea>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-md-4 control-label" htmlFor="specification">
                    PRODUCT SPECIFICATION{" "}
                  </label>
                  <div class="col-md-4">
                    <textarea
                      class="form-control"
                      id="product_name_fr"
                      name="specification"
                      value={specification}
                      placeholder="product specification"
                      onChange= {(e)=>{setSpecification(e.target.value)}}
                    ></textarea>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-md-4 control-label" htmlFor="price">
                    PRODUCT PRICE
                  </label>
                  <div class="col-md-4">
                    <input
                      class="form-control"
                      id="product_name_fr"
                      name="price"
                      value={price}
                      placeholder="product price"
                      onChange= {(e)=>{setPrice(e.target.value)}}
                    ></input>
                  </div>
                </div>

                <div class="form-group mb-2">
                  <label class="col-md-4 control-label" htmlFor="image">
                    Product Image
                  </label>
                  <div class="col-md-4">
                    <input
                      id="filebutton"
                      name="image"
                      class="input-file"
                      type="text"
                      value={image}
                      onChange= {(e)=>{setImage(e.target.value)}}
                    />
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-md-4 " style={{ display:"inline" ,marginRight:4 }}>
                    <button
                      onClick={addProduct}
                      type="button"
                      class="btn btn-primary"
                    >
                      Add Product
                    </button>
                    <div class="col-md-4" style={{ display:"inline" ,marginLeft:4}}>
                    <button
                      onClick={updateProduct}
                      type="button"
                      class="btn btn-success"
                    >
                      Update Product
                    </button>
                  </div>
                </div>
                <div class="form-group">
                  
                  </div>
                </div>
              </div>
            )}

            { message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} /> 
            
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
