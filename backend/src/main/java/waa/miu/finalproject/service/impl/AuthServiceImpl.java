package waa.miu.finalproject.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import waa.miu.finalproject.entity.Role;
import waa.miu.finalproject.entity.User;
import waa.miu.finalproject.entity.dto.input.InputUserDto;
import waa.miu.finalproject.entity.dto.output.PropertyDetailDto;
import waa.miu.finalproject.entity.dto.output.PropertyDto;
import waa.miu.finalproject.entity.dto.output.UserDetailDto;
import waa.miu.finalproject.entity.request.LoginRequest;
import waa.miu.finalproject.entity.request.RefreshTokenRequest;
import waa.miu.finalproject.entity.response.LoginResponse;
import waa.miu.finalproject.enums.OwnerStatusEnum;
import waa.miu.finalproject.enums.RoleEnum;
import waa.miu.finalproject.repository.RoleRepo;
import waa.miu.finalproject.repository.UserRepo;
import waa.miu.finalproject.service.AuthService;
import waa.miu.finalproject.helper.JwtUtil;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private RoleRepo roleRepo;

    @Override
    public LoginResponse authenticate(LoginRequest loginRequest) {
        Authentication result = null;
        try {
            result = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(e.getMessage());
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(result.getName());
        Long userId = ((CustomUserDetails) userDetails).getUserId();
        final String accessToken = jwtUtil.generateToken(userDetails, userId);
        final String refreshToken = jwtUtil.generateRefreshToken(loginRequest.getEmail());
        return new LoginResponse(accessToken, refreshToken);
    }

    @Override
    public LoginResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        if (jwtUtil.validateToken(refreshTokenRequest.getRefreshToken())
                && jwtUtil.isRefreshToken(refreshTokenRequest.getRefreshToken())) {
            if (jwtUtil.isTokenExpired(refreshTokenRequest.getAccessToken())) {
                final String accessToken = jwtUtil
                        .doGenerateToken(jwtUtil.getSubject(refreshTokenRequest.getRefreshToken()));
                return new LoginResponse(accessToken, refreshTokenRequest.getRefreshToken());
            } else {
                log.info("Refresh token expired");
                return new LoginResponse(refreshTokenRequest.getAccessToken(), refreshTokenRequest.getRefreshToken());
            }
        } else {
            log.warn("Refresh token expired");
            return new LoginResponse();
        }
    }

    @Override
    public UserDetailDto signup(InputUserDto userDto) {
        User user = new User();
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPhone(userDto.getPhone());
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(userDto.getPassword());
        user.setPassword(hashedPassword);
        Role role = roleRepo.findByRole(userDto.getRole());
        user.setRoles(List.of(role));
        if (userDto.getRole().equals(RoleEnum.OWNER)) {
            user.setStatus(OwnerStatusEnum.DEACTIVATED);
        } else {
            user.setStatus(OwnerStatusEnum.ACTIVE);
        }
        user = userRepo.save(user);
        return modelMapper.map(user, UserDetailDto.class);
    }
}
