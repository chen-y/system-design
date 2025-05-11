package com.server.mapper;

import com.server.pojo.Permission;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PermissionMapper {
    @Select("select * from permissions")
    List<Permission> getPermissions();

    @Select("select * from permissions where parent_id is null")
    List<Permission> getPermissionsWithNoParent();

    @Select("select * from permissions where parent_id=#{parentId}")
    List<Permission> getPermissionsWithParentId(Integer parentId);

    List<Permission> getPermissionByIds(@Param("ids") List<Integer> ids);

    boolean createPermission(Object p);

    boolean removePermission(Integer id);

    boolean updatePermission(Object p);
}
