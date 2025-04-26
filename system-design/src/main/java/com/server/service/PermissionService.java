package com.server.service;

import com.server.pojo.Permission;

import java.util.List;
import java.util.Map;

public interface PermissionService {
    List<Permission> getPermissions();

    Permission createPermission(Object params);
}
