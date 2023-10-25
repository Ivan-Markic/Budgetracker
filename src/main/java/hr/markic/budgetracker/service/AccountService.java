package hr.markic.budgetracker.service;

import hr.markic.budgetracker.domain.Account;

import java.util.List;

public interface AccountService {

    long getCount();

    List<Account> getAllAccounts();

    Account getAccountById(Long accountId);

    boolean deleteAccount(Long accountId);

    Account updateAccount(Account account);

    Account createAccount(Account account);

}
