package waa.miu.finalproject.service;

import waa.miu.finalproject.entity.dto.input.InputUserDto;
import waa.miu.finalproject.entity.dto.output.UserDetailDto;
import waa.miu.finalproject.entity.request.LoginRequest;
import waa.miu.finalproject.entity.request.RefreshTokenRequest;
import waa.miu.finalproject.entity.request.ResetPasswordRequest;
import waa.miu.finalproject.entity.response.LoginResponse;

public interface AuthService {
    LoginResponse authenticate(LoginRequest loginRequest);
    LoginResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
    UserDetailDto signup(InputUserDto userDto);

    String resetPassword(ResetPasswordRequest resetPasswordRequest);
}
