package com.app.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.CategoryDTO;
import com.app.pojos.Category;



public interface ICatService {

	//get all details
	  List<Category> getAllCategoryDetails();
	//save new Category details
	  CategoryDTO saveCategoryDetails(CategoryDTO cat); 
	//delete Category details
	  String deleteCategoryDetails(int catId);
	//get Category details by specified id
	  Category getCategoryDetails(int catId);
	//update existing Category details
	  Category updateCategoryDetails(Category updatedCategory);
	  
	  CategoryDTO storeImage(int catId, MultipartFile imageFile) throws IOException;

		byte[] restoreImage(int catId) throws IOException;
	 
}
