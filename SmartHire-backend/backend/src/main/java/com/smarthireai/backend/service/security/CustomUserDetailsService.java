package com.smarthireai.backend.service.security;

import com.smarthireai.backend.exception.UserNotFoundException;
import com.smarthireai.backend.repository.auth.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo repo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return repo.findUserByEmail(email).orElseThrow(()->
                new UserNotFoundException("User Not Found"));
    }
}
