package com.smarthireai.backend.repository.auth;

import com.smarthireai.backend.model.auth.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    Optional<User> findUserByEmail(String email);
    boolean existsByEmail(String email);
}
