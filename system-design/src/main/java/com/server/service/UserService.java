package com.server.service;

import com.server.pojo.User;

import java.util.List;

public interface UserService {
    List<User> findAll();
    List<User> getUsers();

    Boolean createUser(User user);
    Boolean updateUser(User user);
}
