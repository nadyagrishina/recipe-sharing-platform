package com.nadyagrishina.cookbook.service.impl;

import com.nadyagrishina.cookbook.dto.RecipeDTO;
import com.nadyagrishina.cookbook.exception.ResourceNotFoundException;
import com.nadyagrishina.cookbook.mapper.RecipeMapper;
import com.nadyagrishina.cookbook.model.Category;
import com.nadyagrishina.cookbook.model.Comment;
import com.nadyagrishina.cookbook.model.Recipe;
import com.nadyagrishina.cookbook.model.User;
import com.nadyagrishina.cookbook.repository.CategoryRepository;
import com.nadyagrishina.cookbook.repository.CommentRepository;
import com.nadyagrishina.cookbook.repository.RecipeRepository;
import com.nadyagrishina.cookbook.service.RecipeService;
import com.nadyagrishina.cookbook.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    private final RecipeMapper recipeMapper;
    private final UserService userService;
    private final CategoryRepository categoryRepository;
    private final CommentRepository commentRepository;

    @Autowired
    public RecipeServiceImpl(RecipeRepository recipeRepository,
                             RecipeMapper recipeMapper,
                             UserService userService,
                             CategoryRepository categoryRepository, CommentRepository commentRepository) {
        this.recipeRepository = recipeRepository;
        this.recipeMapper = recipeMapper;
        this.userService = userService;
        this.categoryRepository = categoryRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public List<RecipeDTO> getAllRecipes() {
        return recipeRepository.findAll().stream()
                .map(recipeMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public RecipeDTO getRecipeById(Long id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found"));
        return recipeMapper.toDTO(recipe);
    }

    @Override
    @Transactional
    public RecipeDTO createRecipe(RecipeDTO recipeDTO) {
        User creator = userService.findByUsername(recipeDTO.getCreator())
                .orElseThrow(() -> new ResourceNotFoundException("Uživatel '" + recipeDTO.getCreator() + "' nebyl nalezen."));

        String imagePath = saveImage(recipeDTO.getImage());

        Set<Category> categories = recipeDTO.getCategories().stream()
                .map(name -> categoryRepository.findByName(name)
                        .orElseGet(() -> categoryRepository.save(new Category(name))))
                .collect(Collectors.toSet());

        Recipe recipe = new Recipe();
        recipe.setName(recipeDTO.getName());
        recipe.setDescription(recipeDTO.getDescription());
        recipe.setIngredients(recipeDTO.getIngredients());
        recipe.setInstructions(recipeDTO.getInstructions());
        recipe.setImagePath(imagePath);
        recipe.setCreator(creator);
        recipe.setCategories(categories);

        Recipe saved = recipeRepository.save(recipe);
        RecipeDTO dto = recipeMapper.toDTO(saved);
        dto.setCreator(saved.getCreator().getUsername());
        dto.setImagePath(saved.getImagePath());

        return dto;
    }

    @Override
    @Transactional
    public RecipeDTO updateRecipe(Long id, RecipeDTO recipeDTO) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe with id " + id + " does not exist"));

        recipe.setName(recipeDTO.getName());
        recipe.setDescription(recipeDTO.getDescription());
        recipe.setIngredients(recipeDTO.getIngredients());
        recipe.setInstructions(recipeDTO.getInstructions());

        if (recipeDTO.getImagePath() != null) {
            recipe.setImagePath(recipeDTO.getImagePath());
        }

        recipeRepository.save(recipe);
        return recipeMapper.toDTO(recipe);
    }

    @Override
    @Transactional
    public void deleteRecipe(Long id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found"));

        List<Comment> comments = commentRepository.findByRecipe(recipe);
        commentRepository.deleteAll(comments);

        if (recipe.getImagePath() != null) {
            String imagePath = recipe.getImagePath().replace("/api/images/", "");
            Path path = Paths.get("uploads/images").resolve(imagePath);
            try {
                Files.deleteIfExists(path);
            } catch (IOException e) {
                System.err.println("Nepodařilo se smazat obrázek: " + e.getMessage());
            }
        }

        recipeRepository.delete(recipe);
    }


    @Override
    public List<RecipeDTO> getRecipesByCreator(String username) {
        User creator = userService.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Uživatel '" + username + "' nebyl nalezen."));

        return recipeRepository.findAllByCreator(creator).stream()
                .map(recipeMapper::toDTO)
                .collect(Collectors.toList());
    }

    private String saveImage(MultipartFile imageFile) {
        if (imageFile == null || imageFile.isEmpty()) return null;

        try {
            String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
            Path uploadPath = Paths.get("uploads/images");
            Files.createDirectories(uploadPath);

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return "/api/images/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Nepodařilo se uložit obrázek", e);
        }
    }
}
