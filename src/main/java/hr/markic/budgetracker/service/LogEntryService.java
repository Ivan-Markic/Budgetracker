package hr.markic.budgetracker.service;

import hr.markic.budgetracker.domain.LogEntry;

public interface LogEntryService {

    public LogEntry saveLog(LogEntry logEntry);
}
