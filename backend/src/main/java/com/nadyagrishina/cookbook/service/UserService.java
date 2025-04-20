package com.nadyagrishina.cookbook.service;

import com.nadyagrishina.cookbook.dto.UserDTO;
import com.nadyagrishina.cookbook.model.User;

import java.util.Optional;

public interface UserService {
    UserDTO getUserById(Long id);
    UserDTO createUser(UserDTO user);
    UserDTO updateUser(Long id, UserDTO user);
    void deleteUser(Long id);
    void registerUser(UserDTO user);
    Optional<User> findByUsername(String username);
    Optional<UserDTO> loginUser(String username, String password);
}
