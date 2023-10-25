package hr.markic.budgetracker.repository;

import hr.markic.budgetracker.domain.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
