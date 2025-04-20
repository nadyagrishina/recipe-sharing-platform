package com.nadyagrishina.cookbook.service;

import com.nadyagrishina.cookbook.dto.CommentDTO;

import java.util.List;

public interface CommentService {
    List<CommentDTO> getCommentsForRecipe(Long recipeId);
    CommentDTO addComment(CommentDTO commentDTO);
}

