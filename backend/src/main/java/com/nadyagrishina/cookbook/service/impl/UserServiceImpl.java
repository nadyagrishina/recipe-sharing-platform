package com.nadyagrishina.cookbook.service.impl;

import com.nadyagrishina.cookbook.dto.UserDTO;
import com.nadyagrishina.cookbook.exception.ResourceNotFoundException;
import com.nadyagrishina.cookbook.mapper.UserMapper;
import com.nadyagrishina.cookbook.model.Role;
import com.nadyagrishina.cookbook.model.User;
import com.nadyagrishina.cookbook.repository.CommentRepository;
import com.nadyagrishina.cookbook.repository.UserRepository;
import com.nadyagrishina.cookbook.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final CommentRepository commentRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, CommentRepository commentRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.commentRepository = commentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return userMapper.toDTO(user);
    }

    @Override
    @Transactional
    public UserDTO createUser(UserDTO userDTO) {
        User user = userMapper.toEntity(userDTO);
        userRepository.save(user);
        return userMapper.toDTO(user);
    }

    @Override
    @Transactional
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        existingUser.setUsername(userDTO.getUsername());
        existingUser.setEmail(userDTO.getEmail());
        existingUser.setImagePath(userDTO.getImagePath());

        userRepository.save(existingUser);
        return userMapper.toDTO(existingUser);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        userRepository.delete(user);
    }


    @Override
    public void registerUser(UserDTO userDTO) {
        User user = buildNewUser(userDTO);
        userRepository.save(user);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    private User buildNewUser(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setImagePath(userDTO.getImagePath());
        user.setRole(Role.ROLE_USER);
        user.setRegistrationDate(LocalDateTime.now());
        return user;
    }

    @Override
    public Optional<UserDTO> getUserDTOByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(userMapper::toDTO);
    }
}
