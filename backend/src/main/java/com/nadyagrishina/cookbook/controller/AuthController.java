package com.nadyagrishina.cookbook.controller;

import com.nadyagrishina.cookbook.dto.AuthResponse;
import com.nadyagrishina.cookbook.dto.LoginRequest;
import com.nadyagrishina.cookbook.dto.UserDTO;
import com.nadyagrishina.cookbook.security.JwtUtil;
import com.nadyagrishina.cookbook.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private AuthenticationManager authManager;
    private JwtUtil jwtUtil;
    private final UserService userService;

    public AuthController(AuthenticationManager authManager, JwtUtil jwtUtil, UserService userService) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
            String token = jwtUtil.generateToken(request.getUsername());
            return new AuthResponse(token);
        } catch (AuthenticationException e) {
            throw new RuntimeException("Neplatné přihlašovací údaje");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
        userService.registerUser(userDTO);
        return ResponseEntity.ok().build();
    }

}
