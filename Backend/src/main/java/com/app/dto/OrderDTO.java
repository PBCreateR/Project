package com.app.dto;

import com.app.pojos.Address;
import com.app.pojos.Order;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@NoArgsConstructor
@ToString
public class OrderDTO {
	
	//@JsonProperty("id")
	private Integer orderId;
	private Order[] orderItems;
	private Address shippingAddress;
	//private int user;
	private int userId;
    private int quantity;
	private double totalPrize;
	
}
