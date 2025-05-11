package com.server.service;

import com.server.pojo.RolePermission;

public interface RolePermissionService {
    RolePermission getRolePermission(Integer roleId);

    Boolean createRolePermission(RolePermission rolePerm);
}
