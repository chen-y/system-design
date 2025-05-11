package com.server.service.impl;

import com.server.mapper.UserMapper;
import com.server.pojo.User;
import com.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;
    @Override
    public List<User> findAll() {
        var userList = userMapper.findAll();
        return userList;
    }

    @Override
    public List<User> getUsers() {
        return userMapper.getUsers();
    }

    public Boolean createUser(User user) {
        return userMapper.createUser(user);
    }

    @Override
    public Boolean updateUser(User user) {
        return userMapper.updateUser(user);
    }
}
