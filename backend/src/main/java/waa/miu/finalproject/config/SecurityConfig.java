package waa.miu.finalproject.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import waa.miu.finalproject.filter.JwtFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final UserDetailsService userDetailsService;
    private final JwtFilter jwtFilter;

    String[] roles1 =  {"CUSTOMER"};
    String[] roles2 =  {"ADMIN"};
    String[] roles3 =  {"OWNER"};
    String[] roles4 =  {"CUSTOMER", "ADMIN"};
    String[] roles5 =  {"ADMIN", "OWNER"};

    @Bean
    public UserDetailsService userDetailsSvc() {
        return userDetailsService;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .cors(cors -> cors.disable())
                .authorizeHttpRequests(authorize -> authorize
                                .anyRequest().permitAll()
//                                .requestMatchers("/api/v1/auth/**").permitAll()
//                                .requestMatchers(HttpMethod.POST,"/api/v1/properties/**").hasAnyRole(roles1)
//                                .requestMatchers(HttpMethod.PUT,"/api/v1/properties/**").hasAnyRole(roles4)
//                                .requestMatchers(HttpMethod.POST,"/api/v1/offers/**").hasAnyRole(roles1)
//                                .requestMatchers(HttpMethod.PUT,"/api/v1/offers/**").hasAnyRole(roles5)
//                                .requestMatchers("/api/v1/properties/**").permitAll()
//                                .requestMatchers("/api/v1/favourites").hasAnyAuthority(roles1)
//                                .anyRequest().authenticated()
                ).sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/images/**", "/js/**", "/webjars/**");
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }
}
