package com.smarthireai.backend.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequestDTO {
    @NotBlank(message = "{user.email.absent}")
    private String email;
    @NotBlank(message = "{user.password.absent}")
    public String password;
}
