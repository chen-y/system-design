package com.server.controller;

import com.server.pojo.Permission;
import com.server.service.PermissionService;
import com.server.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/permission")
public class PermissionController {

    @Autowired
    private PermissionService permissionService;

    @PostMapping("/list")
    public Result<List<Permission>> getPermissionList() {

        List<Permission> permissions = permissionService.getPermissions();
        return Result.success(permissions);
    }

    @PostMapping("/tree")
    public Result<List<Permission>> getPermissionTree() {
        List<Permission> permissionTree = permissionService.getPermissionTree();
        return Result.success(permissionTree);
    }

    @PostMapping("/create")
    public Result<Boolean> createPermission(@RequestBody Object body) {
        System.out.println(body);
        permissionService.createPermission(body);
        return Result.success(true);
    }

    @PostMapping("/delete")
    public Result<Boolean> removePermission(@RequestBody Map<String, Object> body) {
        permissionService.removePermission((Integer) body.get("id"));
        return Result.success(true);
    }

    @PostMapping("/update")
    public Result<Boolean> updatePermission(@RequestBody Permission body) {
        permissionService.updatePermission(body);
        return Result.success(true);
    };
}
