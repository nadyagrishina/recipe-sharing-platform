package com.nadyagrishina.cookbook.service;

import com.nadyagrishina.cookbook.dto.RecipeDTO;
import com.nadyagrishina.cookbook.model.User;

import java.util.List;

public interface RecipeService {
    List<RecipeDTO> getAllRecipes();
    RecipeDTO getRecipeById(Long id);
    RecipeDTO createRecipe(RecipeDTO recipe);
    RecipeDTO updateRecipe(Long id, RecipeDTO recipe);
    void deleteRecipe(Long id);
    List<RecipeDTO> getRecipesByCreator(String username);

}
