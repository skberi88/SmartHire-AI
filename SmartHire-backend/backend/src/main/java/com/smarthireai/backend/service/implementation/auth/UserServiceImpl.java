package com.smarthireai.backend.service.implementation.auth;

import com.smarthireai.backend.dto.auth.AuthResponseDTO;
import com.smarthireai.backend.dto.auth.LoginRequestDTO;
import com.smarthireai.backend.dto.auth.RegisterRequestDTO;
import com.smarthireai.backend.dto.auth.UserDTO;
import com.smarthireai.backend.exception.EmailAlreadyExistsException;
import com.smarthireai.backend.exception.InvalidPasswordException;
import com.smarthireai.backend.exception.UserNotFoundException;
import com.smarthireai.backend.model.auth.User;
import com.smarthireai.backend.repository.auth.UserRepo;
import com.smarthireai.backend.service.auth.UserService;
import com.smarthireai.backend.service.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Override
    public UserDTO registerUser(RegisterRequestDTO registerDTO) {
        if(repo.existsByEmail(registerDTO.getEmail())){
            throw new EmailAlreadyExistsException("Email Already Registered");
        }
        User user = User.builder()
                .name(registerDTO.getName())
                .email(registerDTO.getEmail())
                .password(passwordEncoder.encode(registerDTO.getPassword()))
                .accountType(registerDTO.getAccountType())
                .build();

        User savedUser = repo.save(user);
        // user bnaya, user ko repo me save kiya, fir us se userDto bnake return krdiya
        UserDTO dto = new UserDTO();
        dto.setId(savedUser.getId());
        dto.setName(savedUser.getName());
        dto.setEmail(savedUser.getEmail());
        dto.setAccountType(savedUser.getAccountType());
        return dto;
    }

    @Override
    public AuthResponseDTO loginUser(LoginRequestDTO loginDTO) {
        // find user and return authResponseDTO
        User user = repo.findUserByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User Not Registered"));

        // password check kro
        if(!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())){
            throw new InvalidPasswordException("Invalid Password");
        }

        return AuthResponseDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .accountType(user.getAccountType())
                .token(jwtService.generateToken(user))
                .build();
    }
}
