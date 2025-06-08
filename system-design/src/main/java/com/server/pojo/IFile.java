package com.server.pojo;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class IFile {
    private Integer id;
    private byte[] file;
    private String url;
    private Integer userId;
    private String fileName;
    private String type;
    private String fileFor;
    private String createdAt;
    private String updatedAt;
}
