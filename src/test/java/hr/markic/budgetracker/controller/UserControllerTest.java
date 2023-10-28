package hr.markic.budgetracker.controller;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.nio.charset.StandardCharsets;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
@SpringBootTest
public class UserControllerTest extends TemplateControllerTest {

    @Test
    void getAll() throws Exception {
        mockMvc.perform(
                        get("/api/v1/user/all")
                                .header(HttpHeaders.AUTHORIZATION, getAuthorizationHeader())
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(content().encoding(StandardCharsets.ISO_8859_1))
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    void getUserById_returnUser() throws Exception {
        mockMvc.perform(
                        get("/api/v1/user/get")
                                .header(HttpHeaders.AUTHORIZATION, getAuthorizationHeader())
                                .param("username", "admin")  // Add userId as a query parameter
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(content().encoding(StandardCharsets.ISO_8859_1))
                .andExpect(jsonPath("$").exists());
    }

}
