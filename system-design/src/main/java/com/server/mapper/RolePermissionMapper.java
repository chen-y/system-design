package com.server.mapper;

import com.server.pojo.RolePermission;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RolePermissionMapper {
    RolePermission getRolePermission(Integer roleId);

    Boolean createRolePermission(RolePermission rolePerm);

    Boolean updateRolePermission(RolePermission rolePerm);
}
