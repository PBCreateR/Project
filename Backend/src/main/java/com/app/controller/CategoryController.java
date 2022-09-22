
package com.app.controller;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.hibernate.validator.constraints.Range;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.CategoryDTO;
import com.app.pojos.Category;
import com.app.service.ICatService;

@RestController 
@RequestMapping("/api/category")
@CrossOrigin
@Validated
public class CategoryController {
	@Autowired
	private ICatService catService;
	@Autowired
	private ModelMapper mapper;

	public CategoryController() {
		System.out.println("in ctor of " + getClass());
	}

	@GetMapping
	public ResponseEntity<?> listAllCategories() {
		System.out.println("in list categories");
		List<Category> list = catService.getAllCategoryDetails();

		if (list.isEmpty())
			return new ResponseEntity<>("Empty Category List !!!!", HttpStatus.OK);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}


	@PostMapping
	public ResponseEntity<CategoryDTO> saveCategoryDetails(@RequestBody @Valid CategoryDTO cat)

	{
		System.out.println("in save Category " + cat);// id : null...

		return new ResponseEntity<>(catService.saveCategoryDetails(cat), HttpStatus.CREATED);
	}

	

	@DeleteMapping("/{categoryId}") // can use ANY name for a path var.

	public String deleteCategoryDetails(@PathVariable @Range(min = 1, message = "Invalid Category id!!!") int categoryId) {
		System.out.println("in del Category " + categoryId);
		return catService.deleteCategoryDetails(categoryId);
	}


	@GetMapping("/{id}")
	public ResponseEntity<?> getCategoryDetails(@PathVariable int id) {
		System.out.println("in get Category " + id);
		Category cat = catService.getCategoryDetails(id);
		System.out.println("category class " + cat.getClass());
		return ResponseEntity.ok(cat);

	}


	/*
	 * @PutMapping public Category updateCategoryDetails(@RequestBody Category cat)
	 * { System.out.println("in update Category " + cat);// id not null return
	 * catService.updateCategoryDetails(cat); }
	 */
	@PutMapping
	public Category updateCategoryDetails(@RequestBody Category cat) {
		//Category cat=mapper.map(caty, Category.class);
		System.out.println("in update Category " + cat);// id not null
		
		return catService.updateCategoryDetails(cat);
	}
	
	
	
		@PostMapping("/{catId}/image")
		public ResponseEntity<?> uploadImage(@PathVariable int catId, @RequestParam MultipartFile file)
				throws IOException {
			System.out.println("in upload image " + catId);
			System.out.println("uploaded img file name " + file.getOriginalFilename() + " content type "
					+ file.getContentType() + " size " + file.getSize());
			// invoke service layer method to save uploaded file in the server side folder
			// --ImageHandligService
			CategoryDTO catDTO = catService.storeImage(catId, file);
			return ResponseEntity.ok(catDTO);
		}

		// add req handling method to download image for specific emp
		@GetMapping(value = "/{catId}/image", produces = { MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE,
				MediaType.IMAGE_PNG_VALUE })
		public ResponseEntity<?> downloadImage(@PathVariable int catId) throws IOException{
			System.out.println("in img download " + catId);
			//invoke service layer method , to get image data from the server side folder
			byte[] imageContents=catService.restoreImage(catId);
			return ResponseEntity.ok(imageContents);
		}
	
	
	
	
	
	
	
	
	
}
