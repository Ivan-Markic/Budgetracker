package hr.markic.budgetracker.controller;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
@SpringBootTest
class AuthenticationControllerTest extends TemplateControllerTest {

    @Test
    void login() throws Exception {
        final Map<String, Object> body = new HashMap<>();
        body.put("username", "admin");
        body.put("password", "IamTheBest");

        mockMvc.perform(
                        post("/api/v1/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(body))
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(content().encoding(StandardCharsets.ISO_8859_1))
                .andExpect(jsonPath("$.token").isNotEmpty());
    }

    @Test
    void login_WrongCredentials_returnForbiddenCode() throws Exception {
        final Map<String, Object> body = new HashMap<>();
        body.put("username", "wrongUsername");
        body.put("password", "wrongPassword");

        mockMvc.perform(
                        post("/api/v1/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(body))
                )
                .andExpect(status().isForbidden());

    }

    @Test
    void register() throws Exception {
        final Map<String, Object> body = new HashMap<>();
        body.put("username", "new");
        body.put("firstName", "new");
        body.put("lastName", "new");
        body.put("language", "hr");
        body.put("role", "user");
        body.put("password", "newPassword");

        mockMvc.perform(
                        post("/api/v1/auth/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(body))
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(content().encoding(StandardCharsets.ISO_8859_1))
                .andExpect(jsonPath("$.token").isNotEmpty());
    }
}
