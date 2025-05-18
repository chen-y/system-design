package com.server.mapper;

import com.server.pojo.Role;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RoleMapper {
    List<Role> getRoles();

    List<Role> getRolesByIds(List<Integer> roleIds);

    Boolean createRole(Role role);
    Boolean updateRole(Role role);

    Boolean removeRole(Integer id);
}
