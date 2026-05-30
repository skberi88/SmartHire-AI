package com.smarthireai.backend.service.security;

import com.smarthireai.backend.enums.AccountType;
import com.smarthireai.backend.model.auth.User;
import com.smarthireai.backend.repository.auth.UserRepo;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepo repo;




    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        // google user info
        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        //check user exists
        Optional<User> existingUser = repo.findUserByEmail(email);
        User user;


        //if new user then register
//        String role = request.getParameter("role");
        if(existingUser.isEmpty()){
            user = User.builder()
                    .name(name)
                    .email(email)
                    .password("OAUTH_USER") // these users don't need password
                    .accountType(AccountType.APPLICANT) //default
                    .build();
            repo.save(user);
        }
        else {
            user = existingUser.get();
        }

        // generate jwt
        String token = jwtService.generateToken(user);

        //redirect frontend
        response.sendRedirect("http://localhost:5173/oauth-success"
                + "?token=" + token
                + "&name=" + user.getName()
                + "&email=" + user.getEmail()
                + "&role=" + user.getAccountType());
    }
}
