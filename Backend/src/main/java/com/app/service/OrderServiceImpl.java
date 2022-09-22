
package com.app.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_excpetions.ResourceNotFoundException;
import com.app.dao.OrderRepository;
import com.app.dao.UserRepository;
import com.app.dto.OrderDTO;
import com.app.pojos.Order;
import com.app.pojos.User;

@Service
@Transactional
public class OrderServiceImpl implements IOrderService {
	// dep : emp repo.

	@Autowired
	private OrderRepository orderRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private ModelMapper mapper;

	@Override
	public List<Order> getAllOrderDetails() {
		
		return orderRepo.findAll();
	}

	@Override
	public OrderDTO saveOrderDetails(int userId,OrderDTO orderDto) {
		User user = userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("Invalid User id !!!!!! Id is : " + userId));
		//orderDto.setUserId(user);
		Order order = mapper.map(orderDto, Order.class);
		Order persistentOrder = orderRepo.save(order);
		return mapper.map(persistentOrder, OrderDTO.class);
	}

	@Override
	public String deleteOrderDetails(int orderId) {
		
		String mesg = "Deletion of Order details failed Invalid Id!!!!!!!!!!!";

		if (orderRepo.existsById(orderId)) {
			orderRepo.deleteById(orderId);
			mesg = "order details deleted successfully , for order id :" + orderId;
		}

		return mesg;
	}

	@Override
	public Order getOrderDetails(int orderId) {
		
		return orderRepo.findById(orderId).orElseThrow(()->new ResourceNotFoundException("Invalid Order id !!!!!! Id is : " + orderId));
	}

	/*
	 * @Override public Order updateOrderDetails(Order updatedOrder) {
	 * 
	 * return orderRepo.save(updatedOrder); }
	 */

	

}