package com.nadyagrishina.cookbook.dto;

import com.nadyagrishina.cookbook.model.Recipe;
import com.nadyagrishina.cookbook.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class UserDTO {

    private Long id;

    @NotBlank(message = "Username is required.")
    private String username;

    @NotBlank(message = "Email is required.")
    @Email(message = "Please provide a valid email address.")
    private String email;

    @NotBlank(message = "Password is required.")
    @Size(min = 6, message = "Password must be at least 6 characters long.")
    private String password;

    private String imagePath;

    private Role role;

    private LocalDateTime registrationDate;

    private List<Recipe> recipeList = new ArrayList<>();

    // Constructors
    public UserDTO() {}

    public UserDTO(Long id, String username, String email, String password,
                   String imagePath, Role role, LocalDateTime registrationDate,
                   List<Recipe> recipeList) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.imagePath = imagePath;
        this.role = role;
        this.registrationDate = registrationDate;
        this.recipeList = recipeList != null ? recipeList : new ArrayList<>();
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDateTime registrationDate) {
        this.registrationDate = registrationDate;
    }

    public List<Recipe> getRecipeList() {
        return recipeList;
    }

    public void setRecipeList(List<Recipe> recipeList) {
        this.recipeList = recipeList != null ? recipeList : new ArrayList<>();
    }
}
