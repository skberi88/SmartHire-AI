package com.smarthireai.backend.dto.auth;

import com.smarthireai.backend.enums.AccountType;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    @NotBlank(message = "{user.name.absent}")
    private String name;
    @NotBlank(message = "{user.email.absent}")
    private String email;
    private AccountType accountType;
}
