package com.nadyagrishina.cookbook.mapper;

import com.nadyagrishina.cookbook.dto.UserDTO;
import com.nadyagrishina.cookbook.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toDTO(User user);
    User toEntity(UserDTO userDTO);
}
