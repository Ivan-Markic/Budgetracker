package hr.markic.budgetracker.controller;

import hr.markic.budgetracker.config.AuthenticationService;
import hr.markic.budgetracker.domain.LoginRequest;
import hr.markic.budgetracker.domain.AuthenticationResponse;
import hr.markic.budgetracker.domain.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request
    ) {
        System.out.println(request);
        if (authenticationService.isUserAlreadyExist(request)) {
            return ResponseEntity.badRequest().body("User Already exists");
        }
        if (!authenticationService.isUserHaveAllFields(request)) {
            return ResponseEntity.badRequest().body("Missing one of the fields");
        }

        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody LoginRequest request
    ) {
        return ResponseEntity.ok(authenticationService.login(request));
    }
}
