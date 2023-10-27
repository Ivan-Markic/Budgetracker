package hr.markic.budgetracker.controller;

import hr.markic.budgetracker.config.JwtService;
import hr.markic.budgetracker.domain.Account;
import hr.markic.budgetracker.domain.User;
import hr.markic.budgetracker.service.AccountService;
import hr.markic.budgetracker.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/account")
@AllArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final JwtService jwtService;
    private final UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Account> createAccount(@RequestBody Account account,
    @RequestHeader("Authorization") String userToken) {
        userToken = userToken.substring(7);
        String username = jwtService.extractUsername(userToken);
        Optional<User> optionalUser = userService.findUserByUsername(username);
        optionalUser.ifPresent(account::setUser);
        Account createdAccount = accountService.createAccount(account);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAccount);
    }

    @PutMapping("/update")
    public ResponseEntity<Account> updateAccount(@RequestBody Account account) {
        Account updatedAccount = accountService.updateAccount(account);
        if (updatedAccount == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedAccount);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteAccount(@RequestParam Long accountId) {
        if (accountService.deleteAccount(accountId)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/get")
    public ResponseEntity<Account> getAccount(@RequestParam Long accountId) {
        Account account = accountService.getAccountById(accountId);
        if (account != null) {
            return ResponseEntity.ok(account);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<Account>> getAllAccounts() {
        List<Account> accounts = accountService.getAllAccounts();
        return ResponseEntity.ok(accounts);
    }
}

