package com.nadyagrishina.cookbook.service.impl;

import com.nadyagrishina.cookbook.dto.CommentDTO;
import com.nadyagrishina.cookbook.exception.ResourceNotFoundException;
import com.nadyagrishina.cookbook.mapper.CommentMapper;
import com.nadyagrishina.cookbook.model.Comment;
import com.nadyagrishina.cookbook.model.Recipe;
import com.nadyagrishina.cookbook.model.User;
import com.nadyagrishina.cookbook.repository.CommentRepository;
import com.nadyagrishina.cookbook.repository.RecipeRepository;
import com.nadyagrishina.cookbook.repository.UserRepository;
import com.nadyagrishina.cookbook.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;
    private final CommentMapper commentMapper;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository,
                              RecipeRepository recipeRepository,
                              UserRepository userRepository,
                              CommentMapper commentMapper) {
        this.commentRepository = commentRepository;
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
        this.commentMapper = commentMapper;
    }

    @Override
    public List<CommentDTO> getCommentsForRecipe(Long recipeId) {
        Recipe recipe = findRecipeById(recipeId);
        return commentRepository.findByRecipe(recipe)
                .stream()
                .map(commentMapper::toDTO)
                .toList();
    }

    @Override
    public CommentDTO addComment(CommentDTO dto) {
        User user = findUserByUsername(dto.getUsername());
        Recipe recipe = findRecipeById(dto.getRecipeId());

        Comment comment = new Comment();
        comment.setUser(user);
        comment.setRecipe(recipe);
        comment.setText(dto.getText());
        comment.setUsername(user.getUsername());

        return commentMapper.toDTO(commentRepository.save(comment));
    }

    private User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Uživatel nenalezen"));
    }

    private Recipe findRecipeById(Long id) {
        return recipeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recept nenalezen"));
    }
}
