package com.nadyagrishina.cookbook.mapper;

import com.nadyagrishina.cookbook.dto.RecipeDTO;
import com.nadyagrishina.cookbook.model.Recipe;
import com.nadyagrishina.cookbook.model.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-21T12:24:23+0200",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class RecipeMapperImpl implements RecipeMapper {

    @Override
    public RecipeDTO toDTO(Recipe recipe) {
        if ( recipe == null ) {
            return null;
        }

        RecipeDTO recipeDTO = new RecipeDTO();

        recipeDTO.setCreator( recipeCreatorUsername( recipe ) );
        recipeDTO.setCategories( map( recipe.getCategories() ) );
        recipeDTO.setId( recipe.getId() );
        recipeDTO.setName( recipe.getName() );
        recipeDTO.setDescription( recipe.getDescription() );
        recipeDTO.setIngredients( recipe.getIngredients() );
        recipeDTO.setInstructions( recipe.getInstructions() );
        recipeDTO.setImagePath( recipe.getImagePath() );

        return recipeDTO;
    }

    private String recipeCreatorUsername(Recipe recipe) {
        if ( recipe == null ) {
            return null;
        }
        User creator = recipe.getCreator();
        if ( creator == null ) {
            return null;
        }
        String username = creator.getUsername();
        if ( username == null ) {
            return null;
        }
        return username;
    }
}
