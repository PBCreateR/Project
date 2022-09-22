package com.app.dto;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

import com.app.pojos.Address;
import com.app.pojos.Role;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = "addressid")
public class UserDTO {
	@JsonProperty("id")
	private Integer userId;
	@NotEmpty(message = "First name must be supplied")
	@Length(min = 4, max = 30, message = "Invalid First name length")
	private String firstName;	
	@NotBlank
	private String lastName;
	@NotBlank
	private String gender;
	@NotBlank
	@Email(message = "Invalid Email")
	private String email;
	@NotBlank
	private String mobileNo;
	@NotBlank
	private String password;
	@Enumerated(EnumType.STRING)
	private Role role = Role.USER;
	
	private AddressDTO addressid;
	

}