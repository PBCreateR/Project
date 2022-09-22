
package com.app.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_excpetions.ResourceNotFoundException;
import com.app.dao.UserRepository;
import com.app.dto.UserDTO;
import com.app.pojos.User;

@Service
@Transactional
public class UserServiceImpl implements IUserService {
	// dep : emp repo.

	@Autowired
	private UserRepository userRepo;
	/*
	 * @Autowired private AddressRepository addRepo;
	 */
	@Autowired
	private ModelMapper mapper;

	@Override
	public List<User> getAllUserDetails() {
		return userRepo.findAll();
	}

	@Override
	public UserDTO saveUserDetails(UserDTO userDto) {
		User user = mapper.map(userDto, User.class);//EmployeeDto to Employee received from frontEnd
		User persistentUser = userRepo.save(user);// method rets PERSISTENT emp ref
		return mapper.map(persistentUser, UserDTO.class);
	}

	@Override
	public User getUserDetails(int userId) {

		return userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("Invalid User id !!!!!! Id is : " + userId));
		
	}

	@Override
	public User updateUserDetails(User updatedUser) {
		//addRepo.save(updatedUser.getAddressid());
		
		  User u = getUserDetails(updatedUser.getUserId());
		  updatedUser.setAddressid(u.getAddressid());
		 
		return userRepo.save(updatedUser);
	}

	@Override
	public String deleteUserDetails(int userId) {
		String mesg = "Deletion of User details failed Invalid Id!!!!!!!!!!!";

		if (userRepo.existsById(userId)) {
			userRepo.deleteById(userId);
			mesg = "User details deleted successfully , for user id :" + userId;
		}

		return mesg;
	}

	@Override
    public Optional<User> signIn(User user) {

        return userRepo.findByEmailAndPassword(user.getEmail(),user.getPassword());
    }



	  @Override
	    public User forgetPassword(User user) {
	        // TODO Auto-generated method stub
	    	//return userRepo.findByMobileNo(user.getMobileNo());
	    	
	    	return userRepo.findByEmail(user.getEmail());
	    }
	
}