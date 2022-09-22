package com.app.pojos;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import ch.qos.logback.core.subst.Token.Type;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
//salary , joinDate , lastName (Treat earlier name as first name : unique),password,email

@Getter
@Setter
@ToString(exclude="addressid")
@Entity
@NoArgsConstructor
@Table(name="users")

public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;
	@Column(length = 40)
	private String firstName;	
	@Column(length = 40)
	private String lastName;
	@Column(length = 30)
	private String gender;
	@Column(length = 50)
	private String email;
	@Column(length = 50)
	private String mobileNo;
	@Column(length = 500)
	private String password;
	@Column(length = 20)
	@Enumerated(EnumType.STRING)
	private Role role;
	@OneToOne
	@JoinColumn(name="address_id")
	@Cascade(CascadeType.ALL)
	private Address addressid;
	
}
