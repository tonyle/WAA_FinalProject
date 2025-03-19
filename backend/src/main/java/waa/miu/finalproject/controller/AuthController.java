package waa.miu.finalproject.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;
import waa.miu.finalproject.entity.request.LoginRequest;
import waa.miu.finalproject.entity.request.RefreshTokenRequest;
import waa.miu.finalproject.entity.response.LoginResponse;
import waa.miu.finalproject.service.AuthService;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            var loginResponse = authService.authenticate(loginRequest);
            return new ResponseEntity<>(loginResponse, HttpStatus.OK);
        } catch (BadCredentialsException e) {
            Map<String, String> errorResponse = Map.of("error", "Invalid email or password");
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/refreshToken")
    public LoginResponse refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return authService.refreshToken(refreshTokenRequest);
    }
}
