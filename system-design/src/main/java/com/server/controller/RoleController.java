package com.server.controller;

import com.server.pojo.Role;
import com.server.service.RolePermissionService;
import com.server.service.RoleService;
import com.server.utils.JwtUtils;
import com.server.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/role")
public class RoleController {

    @Autowired
    private RoleService roleService;
    @Autowired
    private RolePermissionService rolePermissionService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/list")
    public Result<List<Role>> getRoles() {
        List<Role> roles =  roleService.getRoles();
        return Result.success(roles);
    }

    public Integer getUid(Map<String, String> header) {
        String authorization = header.get("authorization");
        String jwt = authorization.substring(7);
        System.out.println(jwt);
        Integer uid = jwtUtils.getUidFromToken(jwt);
        return uid;
    }

    @PostMapping("/create")
    public Result<Boolean> createRole(@RequestHeader Map<String, String> header, @RequestBody Role body) {
        Integer uid = getUid(header);
        System.out.println("create output");
        System.out.println(body);
        body.setUserId(uid);
        roleService.createRole(body);
//        rolePermissionService.createRolePermission();
        return Result.success(true);
    }

    @PostMapping("/update")
    public Result<Boolean> updateRole(@RequestHeader Map<String, String> header, @RequestBody Role body) {
        Integer uid = getUid(header);
        body.setUserId(uid);
        roleService.updateRole(body);
        return Result.success(true);
    }

    @PostMapping("/delete")
    public Result<Boolean> deleteRole(@RequestBody Role role) {
        roleService.removeRole(role.getId());
        return Result.success(true);
    }
}
