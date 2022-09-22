package com.app.dto;



import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@NoArgsConstructor
@Getter
@Setter
@ToString
public class CategoryDTO {
	
	@JsonProperty("id")
	private Integer categoryId;
	
	private String catName;
	
	
	private String catImage;
	
	
}
