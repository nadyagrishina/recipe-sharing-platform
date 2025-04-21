package com.nadyagrishina.cookbook.mapper;

import com.nadyagrishina.cookbook.dto.UserDTO;
import com.nadyagrishina.cookbook.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "registrationDate", target = "registrationDate")
    UserDTO toDTO(User user);

    @Mapping(source = "registrationDate", target = "registrationDate")
    User toEntity(UserDTO dto);
}
