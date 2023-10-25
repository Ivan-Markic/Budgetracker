package hr.markic.budgetracker.service;

import hr.markic.budgetracker.domain.LogEntry;
import hr.markic.budgetracker.repository.LogEntryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LogEntryServiceImpl implements LogEntryService {

    private final LogEntryRepository logEntryRepository;


    @Override
    public LogEntry saveLog(LogEntry logEntry) {
        return logEntryRepository.save(logEntry);
    }
}
