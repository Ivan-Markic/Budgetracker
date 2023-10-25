package hr.markic.budgetracker.service;

import hr.markic.budgetracker.domain.Transaction;
import hr.markic.budgetracker.repository.TransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TransactionServiceImpl implements TransactionService{

    private final TransactionRepository transactionRepository;

    @Override
    public long getCount() {
        return transactionRepository.count();
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Override
    public Transaction getTransactionById(Long transactionId) {
        return transactionRepository.getReferenceById(transactionId);
    }

    @Override
    public boolean deleteTransaction(Long transactionId) {
        try {
            transactionRepository.deleteById(transactionId);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    @Override
    public Transaction updateTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }
}
