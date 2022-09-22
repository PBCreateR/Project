
package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.hibernate.validator.constraints.Range;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.OrderRepository;
import com.app.dao.UserRepository;
import com.app.dto.AddressDTO;
import com.app.dto.OrderDTO;
import com.app.dto.UserDTO;
import com.app.pojos.Address;
import com.app.pojos.Order;

import com.app.pojos.User;
import com.app.service.IAddressService;
import com.app.service.IOrderService;
import com.app.service.IUserService;

@RestController
@RequestMapping("/api/order")
@CrossOrigin
@Validated
public class OrderController {
	@Autowired
	private IOrderService orderService;
	@Autowired
	private IUserService userService;
	@Autowired
	private IAddressService addrService;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private OrderRepository orderRepo;
	@Autowired
	private UserRepository userRepo;
	
	public OrderController() {
		System.out.println("in ctor of " + getClass());
	}


	@GetMapping
	public ResponseEntity<?> listAllOrders() {
		System.out.println("in list Orders");
		List<Order> list = orderService.getAllOrderDetails();
		if (list.isEmpty())
			return new ResponseEntity<>("Empty Order List !!!!", HttpStatus.OK);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	  @PostMapping
	    public ResponseEntity<?> placeOrder(@RequestBody OrderDTO order) 
	    {
		  System.out.println("in post order"+order);
	    	try {
	    		Order[] orderItems= order.getOrderItems();
	    		  
	    		Address shippingAddress=order.getShippingAddress();
	    		int userId=order.getUserId();
	    		double totalPrize=order.getTotalPrize();
	    		
	    		User user=userService.getUserDetails(userId);
	    		
	    		//UserDTO userDto = mapper.map(user, UserDTO.class);
	    		Address persistAddress=addrService.saveAddressDetails(userId, shippingAddress);
	    		user.setAddressid(persistAddress);
	    		userRepo.save(user);
	    		for(Order o:orderItems) {
	    			o.setUserId(user);
	    			o.setTotalPrize(totalPrize);
	    			orderRepo.save(o);
	    		}
	    		  		
	    	}catch(Exception e) {
	    		
	    	}
				
	    	return null;
	    }
//	@PostMapping("/{userId}")
//	public ResponseEntity<OrderDTO> saveOrderDetails(@PathVariable int userId, @RequestBody @Valid OrderDTO order)
//	{
//		System.out.println(userId+" in save Order " + order);// id : null...
//		return new ResponseEntity<>(orderService.saveOrderDetails(userId,order), HttpStatus.CREATED);
//	}

	

	@DeleteMapping("/{orderId}")
	public String deleteUserDetails(@PathVariable @Range(min = 1, message = "Invalid user id!!!") int orderId) {
		System.out.println("in del Order " + orderId);
		return orderService.deleteOrderDetails(orderId);
	}


	@GetMapping("/{id}")
	public ResponseEntity<?> getUserDetails(@PathVariable int id) {
		System.out.println("in get Order " + id);
		Order order = orderService.getOrderDetails(id);
		System.out.println("Order class " + order.getClass());
		return ResponseEntity.ok(order);

	}


	/*
	 * @PutMapping public Order updateOrderDetails(@RequestBody @Valid Order order)
	 * { System.out.println("in update Order " + order);// id not null return
	 * orderService.updateOrderDetails(order); }
	 */


}