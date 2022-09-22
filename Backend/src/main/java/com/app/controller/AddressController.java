
package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AddressDTO;
import com.app.pojos.Address;
import com.app.service.IAddressService;

@RestController // MANDATORY : composed of @Controller at the cls level + @ResponseBody(for
// marshalling : java ---> json) addedd implicitly on ret types of all req
// handling methods , annotated by @ReqMapping / @GetMapping .......
@RequestMapping("/api/address")
@CrossOrigin
@Validated
public class AddressController {
	@Autowired
	private IAddressService addrService;


	public AddressController() {
		System.out.println("in ctor of " + getClass());
	}

// add req handling method (REST API call) to send all users
	@GetMapping
	public ResponseEntity<?> listAlladdresses() {
		System.out.println("in list Addresses");
		List<Address> list = addrService.getAllUserAddresses();
// o.s.ResponseEntity(T body,HttpStatus sts)
		if (list.isEmpty())
			return new ResponseEntity<>("Empty Address List !!!!", HttpStatus.OK);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

// add req handling method to create new user
	@PostMapping("/{userId}")
	public ResponseEntity<Address> saveAddressDetails(@PathVariable int userId,@RequestBody Address addr)
// To inform SC , to un marshall(de-serialization , json/xml --> Java obj) the
// method arg.
	{
		System.out.println("in save Address " + addr);// id : null...

		//return  ResponseEntity.ok(userService.saveUserDetails(user))
		return new ResponseEntity<>(addrService.saveAddressDetails(userId,addr), HttpStatus.CREATED);
	}


// add a method to get specific User dtls
	@GetMapping("/{id}")
// @PathVariable => a binding between a path var to method arg.
	public ResponseEntity<?> getAddressDetails(@PathVariable int id) {
		System.out.println("in get Address " + id);
		Address addr = addrService.getAddressDetails(id);
		System.out.println("Address class " + addr.getClass());
		return ResponseEntity.ok(addr);

	}

// add a method to update existing resource
	@PutMapping
	public Address updateAddressDetails(@RequestBody Address addr) {
		System.out.println("in update Address " + addr);// id not null
		return addrService.updateAddressDetails(addr);
	}


}
