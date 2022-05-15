package com.eshoppingzone.order.orders;

import java.time.LocalDate;
import java.util.List;



import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Orders")
//order model to store orders
public class Orders {
	
	//sequence genrator for orderId
	@Transient
	public  static final String SEQUENCE_NAME="OrderSequence";
	
	@Id
	private int orderId;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate orderDate;
	
	private Integer customerId;
	private double ammountPaid;
	private String modeOfPayment;
	private String orderStatus;
	private int quantity;
	private String fullName;
	private Address address;



	

}