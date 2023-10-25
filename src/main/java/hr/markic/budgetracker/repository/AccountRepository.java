package hr.markic.budgetracker.repository;

import hr.markic.budgetracker.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long>  {
}
