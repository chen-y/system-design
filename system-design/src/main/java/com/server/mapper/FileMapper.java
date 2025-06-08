package com.server.mapper;

import com.server.pojo.IFile;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FileMapper {
    Integer insertByFile(IFile file);

    Integer insertByUrl(IFile file);

    IFile findById(Integer id);

    List<IFile> getFiles();
}
