package com.smarthireai.backend.dto.auth;

import com.smarthireai.backend.enums.AccountType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder

public class AuthResponseDTO {

    private String token;

    private Long id;

    private String name;

    private String email;

    private AccountType accountType;
}