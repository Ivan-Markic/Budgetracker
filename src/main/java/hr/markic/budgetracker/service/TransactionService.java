package hr.markic.budgetracker.service;

import hr.markic.budgetracker.domain.Transaction;

import java.util.List;

public interface TransactionService {

    long getCount();

    List<Transaction> getAllTransactions();

    Transaction getTransactionById(Long transactionId);

    boolean deleteTransaction(Long transactionId);

    Transaction updateTransaction(Transaction transaction);

    Transaction createTransaction(Transaction transaction);
}
