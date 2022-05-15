import React, { useEffect, useRef, useState } from 'react'
import Form from "react-validation/build/form";
import ProductService from '../../services/product.Service';
import CheckButton from "react-validation/build/button";

const DeleteProduct = () => {
    const form = useRef();
  const checkBtn = useRef();

    const [productId ,setProductId] = useState("");
    const [products ,setProductData]=useState([]);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    
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

    const deleteProduct =() =>{



        setMessage("");
        setSuccessful(false);
    
        form.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {
        ProductService.deleteProduct(productId).then(
            (response) => {
              setMessage(response.data.message);
              setSuccessful(true);
    
              alert("Product deleted successfuly");
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
            });
    }
};
  return (
    <div className='mt-5 mb-5'>
        <Form ref={form}>
        {!successful && (
            <div className='container '>
                <h3>Delete Product By Id</h3>
            <div className='col-md-12'>
                <label className='col-md-4  mb-2 control-label' htmlFor='productId'>Product Id</label>
                <input type="text" name="productId" placeholder='product id' value={productId} required onChange={(e)=>setProductId(e.target.value)} />
            </div>
            <div>
                <button type='button' onClick={deleteProduct} className="btn btn-danger mt-2">Delete</button>
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
        <div>
        <div class="container py-5">

<div class="row text-center text-white mb-5">
  <div class="col-lg-7 mx-auto">
    <h1 class="display-4" style={{ fontWeight:500,color: "silver" }}>Product list</h1>
  </div>
</div>


<div class="row">
{products.map( (product ,index) =>
  <div class="col-md-3 mx-auto" key={index}>

    
   
    <ul class="list-group shadow">

      <li class="list-group-item">
        
        <div class="media align-items-lg-center flex-column flex-lg-row p-3">
          <div class="media-body order-2 order-lg-1">
            <h5 class="mt-0 font-weight-bold mb-2"><span style={{ fontSize:10 , color:"crimson" }}>Product Name :</span>  {product.productName}</h5>
            <h6 class="font-italic text-bold mb-0 small"> <span style={{ fontSize:10 , color:"crimson" }}>Product Id: </span>{product.productId}</h6>
            <div class="d-flex align-items-center justify-content-between mt-1">
              <h6 class="font-weight-bold my-2"> <span style={{ fontSize:10 , color:"crimson" }}>Product Price: </span> {product.price}</h6>
            
            </div>
          </div>
          <div > <img src={product.image} alt="Generic placeholder "  style={{ }} class="ml-lg-5 order-1 order-lg-2 profile-img-card"  /></div>
        </div>
  
      </li>
      </ul>
      
      
   
    
  </div>
  )}
</div>
</div>
        </div>
      
    </div>
  )
}

export default DeleteProduct
