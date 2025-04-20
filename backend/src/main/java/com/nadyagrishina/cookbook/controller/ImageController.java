package com.nadyagrishina.cookbook.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;

import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Path;
@RestController
@RequestMapping("/api/images")
public class ImageController {

    @GetMapping("/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) throws MalformedURLException {
        String IMAGE_DIR = "uploads/images";
        File file = new File(IMAGE_DIR + "/" + imageName);

        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        Path path = file.toPath();
        Resource resource = new UrlResource(path.toUri());

        String contentType;
        if (imageName.endsWith(".png")) {
            contentType = MediaType.IMAGE_PNG_VALUE;
        } else if (imageName.endsWith(".jpg") || imageName.endsWith(".jpeg")) {
            contentType = MediaType.IMAGE_JPEG_VALUE;
        } else if (imageName.endsWith(".gif")) {
            contentType = MediaType.IMAGE_GIF_VALUE;
        } else {
            contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }
}
