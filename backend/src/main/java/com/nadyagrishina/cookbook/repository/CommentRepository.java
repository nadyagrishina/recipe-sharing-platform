package com.nadyagrishina.cookbook.repository;

import com.nadyagrishina.cookbook.model.Comment;
import com.nadyagrishina.cookbook.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByRecipe(Recipe recipe);
}
