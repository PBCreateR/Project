package com.app.service;

import java.util.List;

import com.app.dto.AddressDTO;
import com.app.pojos.Address;



public interface IAddressService {

	//get all details
	  List<Address> getAllUserAddresses();
	//save new user details
	  Address saveAddressDetails(int userId,Address address); 
	//get user details by specified id
	  Address getAddressDetails(int addressId);
	//update existing user details
	  Address updateAddressDetails(Address updatedAddress);
	 
}
