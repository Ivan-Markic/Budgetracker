package hr.markic.budgetracker.service;

import hr.markic.budgetracker.domain.Account;
import hr.markic.budgetracker.repository.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    @Override
    public long getCount() {
        return accountRepository.count();
    }

    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public Account getAccountById(Long accountId) {
        return accountRepository.findById(accountId).orElse(null);
    }

    @Override
    public boolean deleteAccount(Long accountId) {
        try {
            accountRepository.deleteById(accountId);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    @Override
    public Account updateAccount(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }
}

