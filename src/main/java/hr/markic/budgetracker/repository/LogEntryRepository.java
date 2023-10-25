package hr.markic.budgetracker.repository;

import hr.markic.budgetracker.domain.LogEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogEntryRepository extends JpaRepository<LogEntry, Long> {
}
