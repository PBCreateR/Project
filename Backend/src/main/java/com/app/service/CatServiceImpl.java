
package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_excpetions.ResourceNotFoundException;
import com.app.dao.CategoryRepository;
import com.app.dto.CategoryDTO;

import com.app.pojos.Category;


@Service

@Transactional
public class CatServiceImpl implements ICatService {
	// dep : emp repo.

	@Autowired
	private CategoryRepository catRepo;

	@Value("${file.upload.location}")
	private String baseFolder;

	@Autowired
	private ModelMapper mapper;

	@Override
	public List<Category> getAllCategoryDetails() {
        System.out.println("in list cat");
		return catRepo.findAll();
	}

	@Override
	public CategoryDTO saveCategoryDetails(CategoryDTO catDto) {
		System.out.println("1 : "+ catDto);
		Category category = mapper.map(catDto, Category.class);//EmployeeDto to Employee received from frontEnd\
		System.out.println("2");
		Category persistentCat = catRepo.save(category);// method rets PERSISTENT emp ref
		System.out.println("4");
		return mapper.map(persistentCat, CategoryDTO.class);
	}

	@Override
	public String deleteCategoryDetails(int catId) {
		String mesg = "Deletion of Category details failed Invalid Id!!!!!!!!!!!";

		if (catRepo.existsById(catId)) {
			catRepo.deleteById(catId);
			mesg = "Category details deleted successfully , for Category id :" + catId;
		}

		return mesg;
	}

	@Override
	public Category getCategoryDetails(int catId) {

		return catRepo.findById(catId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Category id !!!!!! Id is : " + catId));
	}

	@Override
	public Category updateCategoryDetails(Category updatedCategory) {
		Category c=catRepo.findById(updatedCategory.getCategoryId()).get();
		c.setCatName(updatedCategory.getCatName());
		/*
		 * Category cat=catRepo.findById(id).orElseThrow(() -> new
		 * ResourceNotFoundException("Invalid Category id !!!!!! Id is : " + id));
		 * System.out.println(cat); cat.setCatName(updatedCategory.getCatName());
		 * System.out.println(cat.getCatName());
		 */
		return catRepo.save(c);
	}

	@Override
	public CategoryDTO storeImage(int catId, MultipartFile imageFile) throws IOException {
		System.out.println("1 : "+catId);
		Category cat = catRepo.findById(catId)
				.orElseThrow(() -> new ResourceNotFoundException("Err in service of Image adding!!!!"));
		System.out.println("2 : "+catId);
		String completePath = baseFolder + File.separator + imageFile.getOriginalFilename();
		System.out.println("3 : "+catId);
		System.out.println("Complete Path : " + completePath);
		System.out.println("4 : "+catId);
		System.out.println("Copying no of bytes : "
				+ Files.copy(imageFile.getInputStream(), Paths.get(completePath), StandardCopyOption.REPLACE_EXISTING));
		System.out.println("5 : "+catId);
		// save complete path to the image in db
		cat.setCatImage(completePath);// save complete path to the file in db
		System.out.println("6 : "+catId);
		return mapper.map(cat, CategoryDTO.class);
	}

	@Override
	public byte[] restoreImage(int catId) throws IOException {
		
		Category cat = catRepo.findById(catId)
				.orElseThrow(() -> new ResourceNotFoundException("Err in service of Image Downloading!!!!"));

		
		String path = cat.getCatImage();
		System.out.println("Image Path : " + path);
		// API java.nio.file.Files class : Files.readAllBytes(Paths.get(path))
		return Files.readAllBytes(Paths.get(path));
	}

}
