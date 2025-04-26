package com.server.mapper;

import com.server.pojo.Permission;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface PermissionMapper {
    @Select("select * from permissions")
    List<Permission> getPermissions();

    @Insert("insert into permissions (name, value, type, description, parent_id) values(#{name}, #{value}, #{type}, #{description}, #{parentId})")
    Permission createPermission(Object p);
}
