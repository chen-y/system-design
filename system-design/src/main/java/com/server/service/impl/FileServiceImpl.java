package com.server.service.impl;

import com.server.mapper.FileMapper;
import com.server.pojo.IFile;
import com.server.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private FileMapper fileMapper;
    @Override
    public Integer insertByFile(MultipartFile file, Integer uid) throws IOException {
        IFile iFile = new IFile();
        iFile.setUserId(uid);
        System.out.println(file.getContentType());
        iFile.setType(file.getContentType());
        iFile.setFile(file.getBytes());
        iFile.setFileName(file.getOriginalFilename());
        iFile.setFileFor("avatar");
        fileMapper.insertByFile(iFile);
        return iFile.getId();
    }

    @Override
    public Integer insertByUrl() {
        IFile iFile = new IFile();
        return fileMapper.insertByUrl(iFile);
    }

    @Override
    public IFile findById(Integer id) {
        return fileMapper.findById(id);
    }

    @Override
    public List<IFile> getFiles() {
        return fileMapper.getFiles();
    }
}
