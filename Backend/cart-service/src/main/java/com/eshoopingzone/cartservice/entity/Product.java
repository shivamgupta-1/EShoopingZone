package com.eshoopingzone.cartservice.entity;


import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Product {

	public  static final String sequenceName="ProductSequence";
	
	@Id
	private int productId;
	

	private String productType;
	
	private String productName;
	private String category;
	

	private String rating;
	
	private String review;
	private String image;
	
	@NotNull
	private double price;
	private String description;
	
	private String specification;
	
	

	

}
