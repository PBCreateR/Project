
package com.app.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_excpetions.ResourceNotFoundException;
import com.app.dao.AddressRepository;
import com.app.dao.UserRepository;
import com.app.dto.AddressDTO;
import com.app.pojos.Address;
import com.app.pojos.User;

@Service

@Transactional
public class AddressServiceImpl implements IAddressService {
	// dep : emp repo.

	@Autowired
	private AddressRepository addRepo;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private ModelMapper mapper;
	@Override
	public List<Address> getAllUserAddresses() {
		
		return addRepo.findAll();
	}
	@Override
	public Address saveAddressDetails(int userId, Address address) {
		User user = userRepo.getById(userId);
		
		//Address addr = mapper.map(address, Address.class);
		
		Address persistentAddr = addRepo.save(address);
		
		user.setAddressid(persistentAddr);
		System.out.println("address : "+persistentAddr);
		
		//return mapper.map(persistentAddr, AddressDTO.class);
		return persistentAddr;
	}
	@Override
	public Address getAddressDetails(int addressId) {
		
		return addRepo.findById(addressId).orElseThrow(()->new ResourceNotFoundException("Invalid Address id !!!!!! Id is : " + addressId));
	}
	@Override
	public Address updateAddressDetails(Address updatedAddress) {
		
		return addRepo.save(updatedAddress);
	}

	

}
