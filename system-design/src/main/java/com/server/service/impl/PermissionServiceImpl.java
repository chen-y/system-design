package com.server.service.impl;

import com.server.mapper.PermissionMapper;
import com.server.pojo.Permission;
import com.server.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionServiceImpl implements PermissionService {

    @Autowired
    private PermissionMapper permissionMapper;

    @Override
    public List<Permission> getPermissions() {

        return permissionMapper.getPermissions();
    }

    public void getPermissionsTreeByParents(List<Permission> permissions) {
        for (Permission p: permissions) {
            List<Permission> children = permissionMapper.getPermissionsWithParentId(p.getId());
            if (children != null) {
                p.setSubs(children);
                getPermissionsTreeByParents(children);
            }
        }
    };

    @Override
    public List<Permission> getPermissionTree() {
        List<Permission> topPermissions = permissionMapper.getPermissionsWithNoParent();
        getPermissionsTreeByParents(topPermissions);
        return topPermissions;
    }

    @Override
    public boolean createPermission(Object params) {
        return permissionMapper.createPermission(params);
    }

    @Override
    public boolean removePermission(Integer id) {
        return permissionMapper.removePermission(id);
    }

    @Override
    public boolean updatePermission(Permission params) {
        return permissionMapper.updatePermission(params);
    }
}
