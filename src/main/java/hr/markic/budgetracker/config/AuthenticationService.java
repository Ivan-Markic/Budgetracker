package hr.markic.budgetracker.config;

import hr.markic.budgetracker.domain.*;
import hr.markic.budgetracker.repository.UserRepository;
import hr.markic.budgetracker.utils.ImageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

        public AuthenticationResponse register(RegisterRequest request) {
            User.builder().build();
            if (request.getProfilePicture() == null) {
                request.setProfilePicture(ImageUtil.getDefaultPictureBytes());
            }
        var user = User.builder()
                .username(request.getUsername())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .password(passwordEncoder.encode(request.getPassword()))
                .profilePicture(request.getProfilePicture())
                .language(request.getLanguage())
                .role(Role.USER)
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken).build();
    }

    public AuthenticationResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken).build();
    }

    public boolean isUserAlreadyExist(RegisterRequest request) {
            return userRepository.findByUsername(request.getUsername()).isPresent();
    }

    public boolean isUserHaveAllFields(RegisterRequest request) {
       return request.getUsername() != null && !request.getUsername().isEmpty()
                && request.getFirstName() != null && !request.getFirstName().isEmpty()
                && request.getLastName() != null && !request.getLastName().isEmpty()
                && request.getPassword() != null && !request.getPassword().isEmpty()
                && request.getLanguage() != null && !request.getLanguage().isEmpty();
    }


}
