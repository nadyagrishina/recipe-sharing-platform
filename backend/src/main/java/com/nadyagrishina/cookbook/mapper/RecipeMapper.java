package com.nadyagrishina.cookbook.mapper;

import com.nadyagrishina.cookbook.dto.RecipeDTO;
import com.nadyagrishina.cookbook.model.Category;
import com.nadyagrishina.cookbook.model.Recipe;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface RecipeMapper {
    @Mapping(source = "creator.username", target = "creator")
    @Mapping(target = "image", ignore = true)
    @Mapping(target = "categories", source = "categories")
    RecipeDTO toDTO(Recipe recipe);

    default List<String> map(Set<Category> categories) {
        if (categories == null) return new ArrayList<>();
        return categories.stream()
                .map(Category::getName)
                .toList();
    }

}
