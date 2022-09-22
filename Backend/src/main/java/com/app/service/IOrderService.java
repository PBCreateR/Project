package com.app.service;

import java.util.List;

import com.app.dto.OrderDTO;
import com.app.pojos.Order;



public interface IOrderService {

	//get all details
	  List<Order> getAllOrderDetails();
	//save new user details
	  OrderDTO saveOrderDetails(int userId,OrderDTO order); 
	//delete user details
	  String deleteOrderDetails(int orderId);
	//get user details by specified id
	  Order getOrderDetails(int orderId);
	
	 // Order updateOrderDetails(Order updatedOrder);
	 
}
