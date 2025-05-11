package com.server.mapper;

import com.server.pojo.UserRole;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserRoleMapper {
    UserRole getUserRoles(Integer userId);
    Boolean addUserRoles(UserRole uRole);
    Boolean updateUserRoles(UserRole uRole);
}
