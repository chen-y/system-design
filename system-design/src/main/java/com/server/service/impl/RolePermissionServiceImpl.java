package com.server.service.impl;

import com.server.mapper.RolePermissionMapper;
import com.server.pojo.RolePermission;
import com.server.service.RolePermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolePermissionServiceImpl implements RolePermissionService {
    @Autowired
    private RolePermissionMapper rolePermissionMapper;
    @Override
    public RolePermission getRolePermission(Integer roleId) {
        return rolePermissionMapper.getRolePermission(roleId);
    }

    @Override
    public Boolean createRolePermission(RolePermission rolePerm) {
        return rolePermissionMapper.createRolePermission(rolePerm);
    }
}
