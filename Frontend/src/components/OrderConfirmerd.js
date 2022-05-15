import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/confirmOrder.css'
import AuthService from '../services/auth.service';
import orderService from '../services/order.service';
import ReactPaginate from "react-paginate";
const OrderConfirmerd = () => {
    const currentUser = AuthService.getCurrentUser();
    const [orderData ,setOrderData]=  useState([]);
	
	const [pageNumber, setPageNumber] = useState(0);
    const navigate = useNavigate();
	const usersPerPage = 5;
	const pagesVisited = pageNumber * usersPerPage;

    let fullName=currentUser.username;

	

    useEffect(() => {
        getAllOrders()
    },[])
    
    const getAllOrders = () => {
        orderService.get_Orders(fullName).then((response) => {
            setOrderData( response.data);
            console.log(response.data);
        });
      };

	  const pageCount = Math.ceil(orderData.length / usersPerPage);

	  const changePage = ({ selected }) => {
		setPageNumber(selected);
	  };


  return (
    <div className='mt-5 '>
     <div class="container">
<div class="row ">
	<div class="col-lg-12">
		<div class="main-box clearfix mb-5">
			<h2 className='main-heading mb-3'>Your Orders</h2>
			<div class="table-responsive">
				<table class="table user-list">
					<thead>
						<tr>
                        <th><span>Sno.</span></th>
							<th><span>OrderId</span></th>
							<th><span>CustomerId</span></th>
							<th class="text-center"><span>OrderDate</span></th>
							<th><span>PaymentMode</span></th>
							<th><span>OrderStatus</span></th>
                            <th><span>Quantity</span></th>
                            <th><span>AmmountPaid</span></th>
                            <th><span>Address </span></th>
						</tr>
					</thead>
					<tbody>
                        {orderData
						 .slice(pagesVisited, pagesVisited + usersPerPage)
						.map((order,index)=>
						<tr key={index}>
                            <td>
								
								<span class="user-subhead">{index +1}</span>
							</td>
							<td>
								
								<span class="user-subhead">{order.orderId}</span>
							</td>
							<td>
                            <span class="user-subhead">{order.customerId}</span>
							</td>
							<td class="text-center">
								<span class="label label-default">{order.orderDate}</span>
							</td>
							<td>
                            <span class="label label-default">{order.modeOfPayment}</span>
							</td>
							<td >
                            <span class="label label-default">{order.orderStatus}</span>
							</td>
                            <td >
                            <span class="label label-default">{order.quantity}</span>
							</td>
                            <td >
                            <span class="label label-default">{order.ammountPaid}</span>
							</td>
                            <td >
                            <span class="label label-default">mobileNumber: {order.address.mobileNumber}, flatNumber: {order.address.flatNumber},<br/>city: {order.address.city}, state: {order.address.state}, <br/>pincode: {order.address.pincode}</span>
							</td>
						</tr>
						)}
					</tbody>
				</table>
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
</div>
</div>
    </div>
  )
}

export default OrderConfirmerd
