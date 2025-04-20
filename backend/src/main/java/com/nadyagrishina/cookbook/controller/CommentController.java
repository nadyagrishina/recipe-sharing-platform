package com.nadyagrishina.cookbook.controller;

import com.nadyagrishina.cookbook.dto.CommentDTO;
import com.nadyagrishina.cookbook.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{recipeId}")
    public List<CommentDTO> getComments(@PathVariable Long recipeId) {
        return commentService.getCommentsForRecipe(recipeId);
    }

    @PostMapping
    public ResponseEntity<CommentDTO> addComment(@RequestBody CommentDTO dto) {
        return ResponseEntity.ok(commentService.addComment(dto));
    }
}
