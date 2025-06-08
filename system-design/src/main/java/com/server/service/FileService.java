package com.server.service;

import com.server.mapper.FileMapper;
import com.server.pojo.IFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FileService {
    public Integer insertByFile(MultipartFile file, Integer uid) throws IOException;

    Integer insertByUrl();

    public IFile findById(Integer id);

    List<IFile> getFiles();
}
