package com.app.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.FoodDTO;
import com.app.pojos.Category;
import com.app.pojos.Food;



public interface IFoodService {

	//get all details
	  List<Food> getAllFoodDetails();
	  
	//save new user details
	  FoodDTO saveFoodDetails(int catId, FoodDTO food);
	  
	//delete user details
	  String deleteFoodDetails(int foodId);
	  
	//get user details by specified id
	  Food getFoodDetails(int foodId);
	  
	//update existing user details
	  Food updateFoodDetails(FoodDTO updatedFood);
	  
	//Upload Image
	  FoodDTO storeImage(int foodId, MultipartFile imageFile) throws IOException;
	  
	//Download Image
	  byte[] restoreImage(int foodId) throws IOException;

	List<Food> getAllFoodsByCat(int categoryId);
}
