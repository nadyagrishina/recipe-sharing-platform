package com.nadyagrishina.cookbook.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.awt.*;
import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Value("${app.upload.path}")
    private String uploadPath;

    @GetMapping("/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) throws MalformedURLException {
        System.out.println("File exists: " + uploadPath + "/" + imageName);
        File file = new File(uploadPath + "/" + imageName).getAbsoluteFile();



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
