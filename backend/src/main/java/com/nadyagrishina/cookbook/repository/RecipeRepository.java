package com.nadyagrishina.cookbook.repository;

import com.nadyagrishina.cookbook.model.Recipe;
import com.nadyagrishina.cookbook.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findAllByCreator(User creator);
}
