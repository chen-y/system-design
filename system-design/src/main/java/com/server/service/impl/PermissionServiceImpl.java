package com.server.service.impl;

import com.server.mapper.PermissionMapper;
import com.server.pojo.Permission;
import com.server.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PermissionServiceImpl implements PermissionService {

    @Autowired
    private PermissionMapper permissionMapper;

    @Override
    public List<Permission> getPermissions() {

        return permissionMapper.getPermissions();
    }

    @Override
    public Permission createPermission(Object params) {
        return permissionMapper.createPermission(params);
    }
}
