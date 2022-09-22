
package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_excpetions.ResourceNotFoundException;
import com.app.dao.CategoryRepository;
import com.app.dao.FoodRepository;
import com.app.dto.FoodDTO;
import com.app.pojos.Category;
import com.app.pojos.Food;

@Service

@Transactional
public class FoodServiceImpl implements IFoodService {
	// dep : emp repo.

	@Autowired
	private FoodRepository foodRepo;
	
	@Autowired
	private CategoryRepository catRepo;

	@Value("${file.upload.location}")
	private String baseFolder;

	@Autowired
	private ModelMapper mapper;

	
	@Override
	public List<Food> getAllFoodDetails() {
		//List<Food> f=
	   //FoodDTO fk=mapper.map(f, FoodDTO.class);
		//foodRepo.
		return foodRepo.findAll();
	}

	
	
	@Override
	public FoodDTO saveFoodDetails(int catId, FoodDTO foodDto) {

		//Category cat = catRepo.findById(catId).orElseThrow(()->new ResourceNotFoundException("Invalid Category id !!!!!! Id is : " + catId));
		Category cat=catRepo.findById(catId).get();
		//foodDto.getCategoryId().add(cat);
		//foodDto.setCategoryId(cat);
		//(int)
		
		Food food = mapper.map(foodDto, Food.class);
             food.setCategoryId(cat);
             
		Food persistentFood = foodRepo.save(food);

		return mapper.map(persistentFood, FoodDTO.class);
	}

	
	
	@Override
	public String deleteFoodDetails(int foodId) {
		String mesg = "Deletion of Food details failed Invalid Id!!!!!!!!!!!";

		if (foodRepo.existsById(foodId)) {
			foodRepo.deleteById(foodId);
			mesg = "Food details deleted successfully , for Food id :" + foodId;
		}

		return mesg;
	}

	
	
	@Override
	public Food getFoodDetails(int foodId) {
		
		return foodRepo.findById(foodId).orElseThrow(() -> new ResourceNotFoundException("Invalid Food id !!!!!! Id is : " + foodId));
	}

	
	
	@Override
	public Food updateFoodDetails(FoodDTO updatedFood) {
		
		Food c=foodRepo.findById(updatedFood.getFoodId()).get();
		//Food food = mapper.map(c, Food.class);
		c.setFoodName(updatedFood.getFoodName());
		c.setFoodDescription(updatedFood.getFoodDescription());
		c.setFoodPrize(updatedFood.getFoodPrize());
		return c;
	}

	
	
	@Override
	public FoodDTO storeImage(int foodId, MultipartFile imageFile) throws IOException {
		Food food = foodRepo.findById(foodId).orElseThrow(() -> new ResourceNotFoundException("Err in service of Image adding!!!!"));

		String completePath = baseFolder + File.separator + imageFile.getOriginalFilename();

		System.out.println("Complete Path : " + completePath);

		System.out.println("Copying no of bytes : "
				+ Files.copy(imageFile.getInputStream(), Paths.get(completePath), StandardCopyOption.REPLACE_EXISTING));

		// save complete path to the image in db
		food.setFoodImage(completePath);// save complete path to the file in db

		return mapper.map(food, FoodDTO.class);
	}

	
	
	@Override
	public byte[] restoreImage(int foodId) throws IOException {
		Food food = foodRepo.findById(foodId).orElseThrow(() -> new ResourceNotFoundException("Err in service of Image Downloading!!!!"));
		String path = food.getFoodImage();
		System.out.println("Image Path : " + path);
		return Files.readAllBytes(Paths.get(path));
	}



	@Override
	public List<Food> getAllFoodsByCat(int categoryId) {
		//List<Food> list=foodRepo.findById(categoryId);
		//List<Food> foods=
		
		
				
		return foodRepo.getAllFoodsByCategory(categoryId);
	}


}
