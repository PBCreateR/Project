package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.Food;

public interface FoodRepository extends JpaRepository<Food,Integer> {

	@Query("select f from Food f where f.categoryId.categoryId =:categoryId ")
	List<Food> getAllFoodsByCategory(@Param("categoryId") int categoryId);
	//
	
}
