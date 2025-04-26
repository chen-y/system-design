package com.server.controller;


import com.server.pojo.User;
import com.server.service.UserService;
import com.server.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/list")
    public Result<List<User>> getUserList() {
        List<User> userList = userService.findAll();
        return Result.success(userList);
    }

    @GetMapping("/test")
    public String userTest() {
        return "pass";
    }
}
