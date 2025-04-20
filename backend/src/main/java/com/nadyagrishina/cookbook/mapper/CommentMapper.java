package com.nadyagrishina.cookbook.mapper;

import com.nadyagrishina.cookbook.dto.CommentDTO;
import com.nadyagrishina.cookbook.model.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    @Mapping(source = "user.username", target = "username")
    CommentDTO toDTO(Comment comment);
}
