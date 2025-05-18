package com.server.service.impl;

import com.google.gson.Gson;
import com.server.mapper.RoleMapper;
import com.server.mapper.UserMapper;
import com.server.mapper.UserRoleMapper;
import com.server.pojo.Role;
import com.server.pojo.User;
import com.server.pojo.UserRole;
import com.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    private UserRoleMapper userRoleMapper;
    @Autowired
    private RoleMapper roleMapper;
    @Override
    public List<User> findAll() {
        var userList = userMapper.findAll();
        return userList;
    }

    @Override
    public List<User> getUsers() {
        List<User> users = userMapper.getUsers();
        users.stream().forEach((user) -> {
            // 1.查询账号关联角色表，查看是否存在账号关联的权限
            UserRole uRole = userRoleMapper.getUserRoles(user.getId());
            if (uRole != null) {
                Gson gson = new Gson();
                List<Integer> ids = gson.fromJson(uRole.getStrRoleIds(), ArrayList.class);
                List<Role> roles = roleMapper.getRolesByIds(ids);
                user.setRoles(roles);
            }
        });
        return users;
    }

    public Boolean createUser(User user) {
        userMapper.createUser(user);
        Integer uId = user.getId();
        UserRole uRole = new UserRole();
        uRole.setUserId(uId);
        Gson gson = new Gson();
        uRole.setStrRoleIds(gson.toJson(user.getRoleIds()));
        userRoleMapper.addUserRoles(uRole);
        return true;
    }

    @Override
    public Boolean updateUser(User user) {
        UserRole uRole = new UserRole();
        uRole.setUserId(user.getId());
        Gson gson = new Gson();
        uRole.setStrRoleIds(gson.toJson(user.getRoleIds()));
        Boolean isUpdated = userRoleMapper.updateUserRoles(uRole);
        if (!isUpdated) {
            userRoleMapper.addUserRoles(uRole);
        }
        return userMapper.updateUser(user);
    }

    @Override
    public Boolean deleteUser(Integer userId) {
        return userMapper.deleteUser(userId);
    }
}
