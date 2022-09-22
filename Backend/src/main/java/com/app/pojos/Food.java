package com.app.pojos;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude="categoryId,orderId")
@Table(name="foods")
public class Food {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer foodId;
	@Column(length = 40)
	private String foodName;
	@Column(length = 300)
	private String foodDescription;
	@Column(length = 200)
	private String foodImage;
	
	private double foodPrize;
	
	@ManyToOne//(fetch = FetchType.LAZY)
	@JoinColumn(name="cat_id") //fk
	private Category categoryId;
	
	
	
	
}
