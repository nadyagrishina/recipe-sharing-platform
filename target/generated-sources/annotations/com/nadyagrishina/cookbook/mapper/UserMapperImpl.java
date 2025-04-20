package com.nadyagrishina.cookbook.mapper;

import com.nadyagrishina.cookbook.dto.UserDTO;
import com.nadyagrishina.cookbook.model.Recipe;
import com.nadyagrishina.cookbook.model.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-19T17:43:53+0200",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDTO toDTO(User user) {
        if ( user == null ) {
            return null;
        }

        UserDTO userDTO = new UserDTO();

        userDTO.setId( user.getId() );
        userDTO.setUsername( user.getUsername() );
        userDTO.setEmail( user.getEmail() );
        userDTO.setPassword( user.getPassword() );
        userDTO.setImagePath( user.getImagePath() );
        userDTO.setRole( user.getRole() );
        userDTO.setRegistrationDate( user.getRegistrationDate() );
        List<Recipe> list = user.getRecipeList();
        if ( list != null ) {
            userDTO.setRecipeList( new ArrayList<Recipe>( list ) );
        }

        return userDTO;
    }

    @Override
    public User toEntity(UserDTO userDTO) {
        if ( userDTO == null ) {
            return null;
        }

        User user = new User();

        user.setId( userDTO.getId() );
        user.setUsername( userDTO.getUsername() );
        user.setEmail( userDTO.getEmail() );
        user.setPassword( userDTO.getPassword() );
        user.setRole( userDTO.getRole() );
        user.setImagePath( userDTO.getImagePath() );
        user.setRegistrationDate( userDTO.getRegistrationDate() );
        List<Recipe> list = userDTO.getRecipeList();
        if ( list != null ) {
            user.setRecipeList( new ArrayList<Recipe>( list ) );
        }

        return user;
    }
}
