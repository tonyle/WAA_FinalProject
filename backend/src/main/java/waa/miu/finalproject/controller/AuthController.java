package waa.miu.finalproject.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import waa.miu.finalproject.entity.dto.input.InputUserDto;
import waa.miu.finalproject.entity.request.LoginRequest;
import waa.miu.finalproject.entity.request.RefreshTokenRequest;
import waa.miu.finalproject.entity.request.ResetPasswordRequest;
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
    @PostMapping("/resetpassword")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        try {

            var resetRespone = authService.resetPassword(resetPasswordRequest);
            return new ResponseEntity<>(resetRespone, HttpStatus.OK);
        } catch (BadCredentialsException e) {
            Map<String, String> errorResponse = Map.of("error", "Invalid email or password");
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
    }
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody InputUserDto inputUserDto) {
        try {
            var loginResponse = authService.signup(inputUserDto);
            return new ResponseEntity<>(loginResponse, HttpStatus.CREATED);
        } catch (Exception e) {
            Map<String, String> errorResponse = Map.of("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/refreshToken")
    public LoginResponse refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return authService.refreshToken(refreshTokenRequest);
    }
}
