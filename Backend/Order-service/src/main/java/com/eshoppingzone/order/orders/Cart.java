package com.eshoppingzone.order.orders;

import java.util.List;
import java.util.Objects;

import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Cart")
public class Cart {
	
	@Transient
	public  static final String sequenceName="CartSequence";
	
	private int cartId;
	
	private double totalPrice;

	private List<Items> items;

	
}