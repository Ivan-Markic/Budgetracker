package hr.markic.budgetracker.utils;

import hr.markic.budgetracker.domain.User;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class ImageUtil {

    public static byte[] getDefaultPictureBytes() {
        File file = new File("src/main/resources/static/AdminDefaultProfilePicture.png");
        byte[] pictureBytes;
        try (FileInputStream fileInputStream = new FileInputStream(file)) {
            pictureBytes = new byte[(int) file.length()];
            int bytesRead = fileInputStream.read(pictureBytes);
            if (bytesRead != pictureBytes.length) {
                throw new IOException("Failed to read the entire file");
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return pictureBytes;
    }
}
