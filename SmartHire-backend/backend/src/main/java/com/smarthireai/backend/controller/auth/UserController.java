package com.smarthireai.backend.controller.auth;

import com.smarthireai.backend.dto.auth.AuthResponseDTO;
import com.smarthireai.backend.dto.auth.LoginRequestDTO;
import com.smarthireai.backend.dto.auth.RegisterRequestDTO;
import com.smarthireai.backend.dto.auth.UserDTO;
import com.smarthireai.backend.service.auth.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService service;


    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@Valid @RequestBody
                                                RegisterRequestDTO registerDTO){
        UserDTO userDTO = service.registerUser(registerDTO);
        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> loginUser(@Valid @RequestBody
                                                         LoginRequestDTO loginDTO) {
        return ResponseEntity.ok(service.loginUser(loginDTO));
    }

}
