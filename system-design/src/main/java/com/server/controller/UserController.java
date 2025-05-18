package com.server.controller;


import com.server.pojo.User;
import com.server.service.UserService;
import com.server.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/list")
    public Result<List<User>> getUserList() {
        List<User> userList = userService.getUsers();
        return Result.success(userList);
    }

    @PostMapping("/create")
    public Result<Boolean> createUser(@RequestBody User user) {
        Boolean isSuccess = userService.createUser(user);
        return Result.success(isSuccess);
    }

    @PostMapping("/update")
    public Result<Boolean> updateUser(@RequestBody User user) {
        Boolean isSuccess = userService.updateUser(user);
        return Result.success(isSuccess);
    }

    @PostMapping("/delete")
    public Result<Boolean> deleteUser(@RequestBody User user) {
        boolean isSuccess = userService.deleteUser(user.getId());
        return Result.success(isSuccess);
    }

    @PostMapping("/test")
    public String userTest() {
        return "pass";
    }
}
