package hr.markic.budgetracker.controller;

import hr.markic.budgetracker.config.JwtService;
import hr.markic.budgetracker.domain.Account;
import hr.markic.budgetracker.domain.User;
import hr.markic.budgetracker.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    @PostMapping(value = {"/create", ""})
    public ResponseEntity<String> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User successfully created with ID: " + createdUser.getId());
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping(value = "/delete")
    public ResponseEntity<String> deleteUser(@RequestParam Long userId) {
        if (userService.deleteUser(userId)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/get/jwt")
    public ResponseEntity<User> getUserByJwt(
            @RequestHeader("Authorization") String userToken
    ) {
        if (userToken.length() < 7) {
            return ResponseEntity.unprocessableEntity().build();
        }
        userToken = userToken.substring(7);
        String username = jwtService.extractUsername(userToken);
        Optional<User> optionalUser = userService.findUserByUsername(username);
        return optionalUser.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping(value = "/get")
    public ResponseEntity<User> getUser(@RequestParam String username) {
        Optional<User> optionalUser = userService.findUserByUsername(username);
        return optionalUser.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Secured("ROLE_ADMIN")
    @GetMapping(value = "/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}

