package com.smarthireai.backend.model.auth;

import com.smarthireai.backend.enums.AccountType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Column(nullable = false, length = 50)
    private String name;

    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    @Column(unique = true, nullable = false, length = 50)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private AccountType accountType;

//    public UserDTO toDTO(){
//        return new UserDTO(this.id, this.name, this.email, this.password, this.accountType);
//    }


    @Override
    public Collection<? extends GrantedAuthority>
    getAuthorities() {

        return List.of(
                new SimpleGrantedAuthority(
                        "ROLE_" + accountType.name()
                )
        );
    }

    @Override
    public String getUsername() {

        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
