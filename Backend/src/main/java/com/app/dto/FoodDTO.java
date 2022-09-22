package com.app.dto;



import java.util.ArrayList;
import java.util.List;

import com.app.pojos.Category;
import com.app.pojos.Order;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@NoArgsConstructor
@ToString
public class FoodDTO {
	
	//@JsonProperty("foodid")
	private Integer foodId;
	
	private String foodName;
	
	private String foodDescription;

	private String foodImage;

	private double foodPrize;
	
	
	        //fk
//	private Category categoryId;

	
	
}
