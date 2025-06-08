package com.server.controller;

import com.server.pojo.IFile;
import com.server.service.FileService;
import com.server.utils.JwtUtils;
import com.server.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
public class UploadController {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private FileService fileService;

    @PostMapping("/upload/memory")
    public Result upload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return Result.error(800001, "file cannot be empty");
        }

        System.out.println(file);
        try {
            byte[] bytes = file.getBytes();
            file.transferTo(new File("/Users/bytedance/system-design/upload/" + file.getOriginalFilename()));

            return Result.success(true);
        } catch (IOException e) {
            e.printStackTrace();
            return Result.error(800002, e.getMessage());
        }
    };

    @PostMapping("/upload/db")
    public Result uploadToDB(@RequestParam("file") MultipartFile file, @RequestHeader() Map<String, String> header) {
        if (file.isEmpty()) {
            return Result.error(800001, "file cannot be empty");
        }
//        System.out.println("测试文件");
//        System.out.println(header);
//        System.out.println(file.getContentType());
//        System.out.println(jwtUtils.getUidFromHeader(header));
//        return Result.error(100000, "ceshi");
        try {
            Integer id = fileService.insertByFile(file, jwtUtils.getUidFromHeader(header));
            System.out.println("id: =" + id);
            IFile iFile = fileService.findById(id);
            return Result.success(iFile);
        } catch (Exception e) {
            e.printStackTrace();
            return Result.error(800002, e.getMessage());
        }
    };

    @PostMapping("/files")
    public Result<List<IFile>> getFiles() {
        List<IFile> files = fileService.getFiles();
        return Result.success(files);
    }
}
