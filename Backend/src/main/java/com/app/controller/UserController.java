
package com.app.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import javax.validation.Valid;

import org.hibernate.validator.constraints.Range;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ErrorResponse;
import com.app.dto.UserDTO;
import com.app.pojos.User;
import com.app.service.IUserService;

@RestController // MANDATORY : composed of @Controller at the cls level + @ResponseBody(for
// marshalling : java ---> json) addedd implicitly on ret types of all req
// handling methods , annotated by @ReqMapping / @GetMapping .......
@RequestMapping("/api/users")
@CrossOrigin
@Validated
public class UserController {
	@Autowired
	private IUserService userService;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private JavaMailSender sender;
	
	public UserController() {
		System.out.println("in ctor of " + getClass());
	}

// add req handling method (REST API call) to send all users
	@GetMapping
	public ResponseEntity<?> listAllusers() {
		System.out.println("in list Users");
		List<User> list = userService.getAllUserDetails();
// o.s.ResponseEntity(T body,HttpStatus sts)
		if (list.isEmpty())
			return new ResponseEntity<>("Empty User List !!!!", HttpStatus.OK);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}


	@PostMapping
	public ResponseEntity<UserDTO> saveUserDetails(@RequestBody @Valid UserDTO user)
	{
		System.out.println("in save User " + user);// id : null...
		String destEmail = user.getEmail();
		String password=user.getPassword();
		String username=user.getFirstName();
		System.out.println("-----------sending mail-----------");
		System.out.println(" Email "+destEmail);
		SimpleMailMessage mesg = new SimpleMailMessage();
		mesg.setTo(destEmail);
		mesg.setSubject("FoodApp Account Created");
		mesg.setText("Hi "+username +" you have been successfully Registered on Food Order Portal !!!!! \n Your password is "+" :"+password+"\nDiscover the best food & drinks on our portal\nHave a Good Day!!!!!");
		sender.send(mesg);
		return new ResponseEntity<>(userService.saveUserDetails(user), HttpStatus.CREATED);
	}

	@PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody @Valid User user) 
    {

            Optional<User> validateuser=userService.signIn(user);
            if(validateuser.isEmpty())
            {
                ErrorResponse resp=new ErrorResponse("Enter Valid Email or Password", LocalDateTime.now());
                return new ResponseEntity<>(resp, HttpStatus.CONFLICT);
            }
            return new ResponseEntity<>(validateuser.get(),HttpStatus.OK);
    }
	

	@DeleteMapping("/{userId}")
	public String deleteUserDetails(@PathVariable @Range(min = 1, message = "Invalid user id!!!") int userId) {
		System.out.println("in del User " + userId);
		return userService.deleteUserDetails(userId);
	}

// add a method to get specific User dtls
	@GetMapping("/{userId}")
// @PathVariable => a binding between a path var to method arg.
	public ResponseEntity<?> getUserDetails(@PathVariable int userId) {
		System.out.println("in get User " + userId);
		User user = userService.getUserDetails(userId);
		System.out.println("User class " + user.getClass());
		return ResponseEntity.ok(user);

	}
	
//	 @PostMapping("/forgetPassword")
//	    public ResponseEntity<?> forgetUserPassword(@RequestBody User user) 
//	    {
//				
//				try {
//					User validateuser=userService.forgetPassword(user);
//					validateuser.setPassword(user.getPassword());
//					UserDTO userDto = mapper.map(validateuser, UserDTO.class);
//					userService.saveUserDetails(userDto);
//					return new ResponseEntity<>(validateuser,HttpStatus.OK);
//				} catch (Exception e) {
//					ErrorResponse resp=new ErrorResponse("Enter Valid Mobile Number", LocalDateTime.now());
//					return new ResponseEntity<>(resp, HttpStatus.CONFLICT);
//				}
//	    }
//	 
	 @PostMapping("/forgetPassword")
	    public ResponseEntity<?> forgetUserPassword(@RequestBody User user) 
	    {
		       
				
				try {
					 System.out.println(user);
					User validateuser=userService.forgetPassword(user);
					 System.out.println(validateuser);
					 
					String destEmail = validateuser.getEmail();
					String password=validateuser.getPassword();
					String username=validateuser.getFirstName();
					System.out.println("-----------sending mail-----------");
					System.out.println(" Email "+destEmail);
					SimpleMailMessage mesg = new SimpleMailMessage();
					mesg.setTo(destEmail);
					mesg.setSubject("FoodApp Forget password");
					mesg.setText("Hi "+username +" Your password is "+": "+password+"\nPlease Try again For Login!!!!!!!!!!" );
					sender.send(mesg);
				
					return new ResponseEntity<>(validateuser,HttpStatus.OK);
				} catch (Exception e) {
					ErrorResponse resp=new ErrorResponse("Enter Valid Email id", LocalDateTime.now());
					return new ResponseEntity<>(resp, HttpStatus.CONFLICT);
				}
	    }


//	@PostMapping("/forgetPassword")
//	public ResponseEntity<?> SendOTP(@RequestBody OTPVerifyUpdatePassword update ) 
//	{
//		String destEmail = update.getDestEmail();
//		System.out.println("-----------sending otp-----------");
//		System.out.println(" Email "+destEmail);
//		SimpleMailMessage mesg = new SimpleMailMessage();
//		mesg.setTo(destEmail);
//		mesg.setSubject("OTP for verification");
//		Random ramdom = new Random();
//		int otp =   ramdom.nextInt(999999);
//		
//		mesg.setText("Enter this OTP for verification : "+otp+"            Do not share it with anyone !!!!!");
//		sender.send(mesg);
//		return ResponseEntity.status(HttpStatus.OK).body("OTP sent successfully to Your email");
//	}
	
	
// add a method to update existing resource
	@PutMapping
	public User updateUserDetails(@RequestBody @Valid User user) {
		System.out.println("in update User " + user);// id not null
		return userService.updateUserDetails(user);
	}


}