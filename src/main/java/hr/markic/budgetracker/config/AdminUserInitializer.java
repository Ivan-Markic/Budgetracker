package hr.markic.budgetracker.config;

import hr.markic.budgetracker.domain.LogEntry;
import hr.markic.budgetracker.domain.Role;
import hr.markic.budgetracker.domain.User;
import hr.markic.budgetracker.service.LogEntryService;
import hr.markic.budgetracker.service.TransactionService;
import hr.markic.budgetracker.service.UserService;
import hr.markic.budgetracker.utils.ImageUtil;
import lombok.AllArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Date;

@Component
@AllArgsConstructor
public class AdminUserInitializer implements ApplicationRunner {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final LogEntryService logEntryService;
    private final TransactionService transactionService;

    @Override
    public void run(ApplicationArguments args) {
        System.out.println( addAdminUser() ? "Admin user added successfully " : "Error while adding Admin user");
    }

    private boolean addAdminUser() {
        // Check if an admin user already exists
        if (userService.findUserByUsername("admin").isEmpty()) {
            //Convert picture file to byte array
            byte[]pictureBytes = ImageUtil.getDefaultPictureBytes();

            // Create admin user
            User adminUser = User.builder()
                    .username("admin")
                    .firstName("pero")
                    .lastName("peric")
                    .language("hr")
                    .profilePicture(pictureBytes)
                    .password(passwordEncoder.encode("IamTheBest"))  // Encode the password
                    .role(Role.ADMIN)  // Set the admin role (assuming you have a Role enum)
                    .build();

            // Save the admin user to the database
            userService.createUser(adminUser);
        }
        return true;
    }

    // It goes every minute and measure how much transactions happened since server started
    @Scheduled(fixedRate = 1000 * 60)
    public void loggerForNumberOfTransaction() {
        //TODO Check if this is working or not
        LogEntry logEntry = LogEntry.builder()
                        .message("Number of transaction since server started: " + transactionService.getCount())
                        .timestamp(new Date())
                        .build();
        System.out.println(
                logEntry.getTimestamp() + " -- Number of transaction since server started - " + transactionService.getCount());
        logEntryService.saveLog(logEntry);
    }
}
