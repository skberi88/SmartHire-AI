package com.smarthireai.backend.service.auth;

import com.smarthireai.backend.dto.auth.AuthResponseDTO;
import com.smarthireai.backend.dto.auth.LoginRequestDTO;
import com.smarthireai.backend.dto.auth.RegisterRequestDTO;
import com.smarthireai.backend.dto.auth.UserDTO;

public interface UserService {
    UserDTO registerUser(RegisterRequestDTO requestDTO);
    AuthResponseDTO loginUser(LoginRequestDTO requestDTO);
}
