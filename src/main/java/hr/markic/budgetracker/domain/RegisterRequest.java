package hr.markic.budgetracker.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String username;
    private String firstName;
    private String lastName;
    private String password;
    private String language;
    private byte[] profilePicture;
}
