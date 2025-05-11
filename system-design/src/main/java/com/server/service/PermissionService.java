package com.server.service;

import com.server.pojo.Permission;

import java.util.List;
import java.util.Map;

public interface PermissionService {
    List<Permission> getPermissions();

    List<Permission> getPermissionTree();

    boolean createPermission(Object params);

    boolean removePermission(Integer id);

    boolean updatePermission(Permission params);
}
