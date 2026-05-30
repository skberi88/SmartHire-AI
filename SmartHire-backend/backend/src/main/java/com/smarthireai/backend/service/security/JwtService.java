package com.smarthireai.backend.service.security;

import com.smarthireai.backend.model.auth.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String secretKey;

    public String generateToken(User user){
        return Jwts.builder()
                .subject(user.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) //24 hours
                .signWith(getKey())
                .compact();
    }

    private SecretKey getKey() {
        byte[] keyBytes =
                Decoders.BASE64.decode(
                        getBase64Secret()
                );

        return Keys.hmacShaKeyFor(keyBytes);
    }

    private String getBase64Secret() {
        return Base64.getEncoder()
                .encodeToString(secretKey.getBytes());
    }


    //Validation
    public String extractEmail(String token){
        return Jwts.parser()
                .verifyWith((SecretKey) getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token, UserDetails userDetails) {

        final String email = extractEmail(token);

        return (email.equals(userDetails.getUsername()) && !isExpiredToken(token));
    }

    private boolean isExpiredToken(String token) {
        return extractExpirationToken(token).before(new Date());
    }

    private Date extractExpirationToken(String token) {
        return extractAllClaims(token).getExpiration();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey)(getKey()))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
